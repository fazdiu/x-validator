import { when } from "../utils/helpers";
import { RuleError } from "../modules/rule-error";
import { REGEX } from "../types/rules";
import { INVALID_PATTERN, ARGUMENT_MUST_BE_PROVIDED } from "../types/error-dev";

const isValidPattern = (pattern) => {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
};

const stringToRegex = (str) => {
  // Main regex
  const main = str.match(/\/(.+)\/.*/)?.[1] ?? "";

  // Regex options
  const options = str.match(/\/.+\/(.*)/)?.[1] ?? "";

  // Compiled regex
  return new RegExp(main, options);
};

function regex({ value = "", args = [] }) {
  let [pattern] = args;

  when(!pattern).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(isValidPattern(pattern) === false).throwError(INVALID_PATTERN);

  const regExp = stringToRegex(pattern);

  return regExp.test(value) || new RuleError(REGEX);
}

export default regex;
