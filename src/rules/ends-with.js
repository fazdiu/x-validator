import { RuleError } from "../modules/rule-error";
import { ENDS_WITH } from "../types/rules";
import { when } from "../utils/helpers";
import { ARGUMENT_MUST_BE_PROVIDED } from "../types/error-dev";

export default function endsWith({ value = "", args = [] }) {
  let values = args;

  when(values.length < 1).throwError(ARGUMENT_MUST_BE_PROVIDED);

  if (Array.isArray(value)) value = value.join("");

  return (
    values.some((v) => value.endsWith(v)) ||
    new RuleError(ENDS_WITH, { values: values.join(",") })
  );
}
