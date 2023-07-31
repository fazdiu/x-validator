import { NUMERIC, STRING, ARRAY, OPTIONAL, FILE } from "./types/rules";
import { CONFLICTING_DATA_TYPE } from "./types/error-dev";
import { getName, getValue, processRule, replace } from "./utils/helpers";
import { RuleError } from "./modules/rule-error";
import * as rules from "./rules";
import * as lang from "./lang";

class Validator {
  // errorsList = {};
  watchList = [];

  constructor({ el, options = {}, Alpine }) {
    const defaultOptions = {
      mode: "change",
      delay: 300,
      lang: "en",
      rules: {},
      messages: {},
    };

    this.options = Object.assign(defaultOptions, options);

    this.el = el;

    this.Alpine = Alpine;

    this.setLanguage("en");
    this.messages = Object.assign(this.messages, this.options.messages);

    this.rules = { ...this.options.rules, ...rules };

    if (this.options.mode === "change") {
      this.validateOnFieldChange();
    }

    // alpine validator data
    const error = this.Alpine.$data(el).validator?.error;
    const initialErrors =
      typeof error === "object" && error !== null ? initialErrors : {};

    this.Alpine.$data(el).validator = {
      error: initialErrors,
      errors: {},
      validate: (field) => {
        return this.validate(field);
      },
      init: (field) => {
        return this.validate(field, false);
      },
      setLanguage: (langCode) => {
        this.setLanguage(langCode);
      },
    };
  }

  setLanguage(langCode) {
    const support = Object.keys(lang).includes(langCode);
    if (support) {
      this.messages = lang[langCode];
    }
  }

  init(fields) {
    this.validate(fields, false);
  }

  validate(fields, validate = true) {
    let isSuccessful = true;
    let status = true;
    let errors = [];

    if (fields === undefined || fields === null) {
      fields = this.el.querySelectorAll("[x-rules],[data-rules]");
    }

    if (fields.length > 0) {
      this.validateFields(Array.from(fields), validate).then(errors);
    }

    isSuccessful = Object.values(errors).filter((x) => x).length === 0;
    status = isSuccessful ? "success" : "failed";

    if (fields === undefined || fields === null) {
      this.el.dispatchEvent(
        new CustomEvent(`validator.${status}`, {
          detail: {
            errors,
          },
        })
      );
    }

    return isSuccessful;
  }

 async validateFields(fields = [], validate = true) {
    let errorsList = {};

    for (const field of fields) {
      const fieldName = getName(field);
      const fieldRules = this.extractRules(field);

      let errorRules = {};

      if (validate) {
        if (fieldRules && fieldRules.length > 0) {
          let value = getValue(field);

          if (this.isArray(fieldRules)) {
            const groupFields = Array.from(
              this.el.querySelectorAll(`[name="${fieldName}"]`)
            );
            value = groupFields
              .map((f) => getValue(f))
              .flatMap((x) => x)
              .filter((x) => x);
          }

          for (const fieldRule of fieldRules) {
            const { name: ruleKey, args: ruleArgs } = fieldRule;

            if (
              this.isOptional(fieldRules) &&
              (value === "" || value.length === 0)
            ) {
              break;
            }

            if (ruleKey in this.rules) {
              try {
                const result = await this.rules[ruleKey]({
                  value,
                  args: ruleArgs,
                  fields,
                  type: this.getType(fieldRules, field),
                  input: field,
                });

                if (result instanceof RuleError) {
                  const msg = replace(
                    this.messages[result.name] || this.messages.DEFAULT,
                    result.args
                  );
                  errorRules[ruleKey] = msg;
                }

                if (result === false) {
                  const msg = replace(
                    this.messages[ruleKey] || this.messages.DEFAULT
                  );
                  errorRules[ruleKey] = msg;
                }
              } catch (error) {
                console.error(new Error(`${ruleKey}: ${error.message}`));
                return false;
              }
            }
          }
        }

        const errorRulesValues = Object.values(errorRules);
        const firstError = errorRulesValues[0] || "";
        errorsList[fieldName] = firstError;

        // alpine data
        this.Alpine.$data(this.el).validator.error[fieldName] = firstError;
        this.Alpine.$data(this.el).validator.errors[fieldName] = errorRules;

        //
        const status =
          errorRulesValues.filter((f) => f).length < 1 ? "valid" : "invalid";
        field.dispatchEvent(
          new CustomEvent(`field.${status}`, {
            detail: {
              errors: errorRules,
            },
          })
        );
      }
    }

    return errorsList;
  }

  validateOnFieldChange() {
    let timeout = null;
    this.el.addEventListener("input", (event) => {
      window.clearTimeout(timeout);

      const delay = this.options.delay;
      timeout = window.setTimeout(() => {
        const target = event.target;
        if (target.matches("[data-rules],[x-rules]")) {
          const result = this.validate([target]);

          if (result === false) {
            // trigger event field:error
          }
        }
      }, delay);
    });
  }

  isArray(givenRules) {
    return givenRules.some((v) => v.name === ARRAY);
  }

  isOptional(givenRules) {
    return givenRules.some((v) => v.name === OPTIONAL);
  }

  getType(givenRules, field) {
    const validType = [STRING, NUMERIC, ARRAY, FILE];
    const type = givenRules.filter((v) => validType.includes(v.name));

    if (type.length > 1) {
      const msg = `${CONFLICTING_DATA_TYPE} (${type
        .map((x) => x.name)
        .join(",")})`;
      console.error(new Error(msg), field);
    }

    return type.length == 1 ? type[0].name : STRING;
  }

  extractRules(element) {
    let rules = [].concat(element.getAttribute("data-rules")?.split("|") || []);

    let expression = element.getAttribute("x-rules") || null;

    if (expression) {
      let _x_rules = [];

      //
      _x_rules = this.Alpine.evaluate(element, expression);

      if (Array.isArray(_x_rules)) {
        rules = rules.concat(_x_rules);
      }

      if (typeof _x_rules === "string") {
        rules = rules.concat(_x_rules?.split("|") || []);
      }
    }

    return rules.filter((x) => x).map((rule) => processRule(rule));
  }
}

export default Validator