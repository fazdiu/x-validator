import Validator from "./validator";
import { getXModel } from "./utils/helpers";

const Plugin = function (Alpine) {

  Alpine.directive("validator", (el, { expression }, { evaluate }) => {
    expression = expression.trim();
    let options = {};
    if (expression) {
      options = evaluate(expression);
    }
    new Validator({ el, options, Alpine });
  });

  Alpine.directive("rules", (el, { expression }, { evaluate }) => {
    const current = Alpine.$data(el);
    const xmodel = getXModel(el);
    const validator = current.validator;
    const exists = Alpine.$data(el)[expression];
    if (validator) {
      validator.init([el]);
    }

    if (typeof exists !== "undefined") {
      current.$watch(expression, (value) => {
        validator.validate([el]);
      });
    }

    if (xmodel) {
      current.$nextTick(() => {
        current.$watch(xmodel, (value) => {
          validator.validate([el]);
        });
      });
    }
  });
};

export default Plugin;
