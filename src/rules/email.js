import isEmail from "validator/es/lib/isEmail";
import { RuleError } from "../modules/rule-error";
import { EMAIL } from "../types/rules";

export default function email({ value = "" }) {
  if (Array.isArray(value)) value = value.join("");

  return isEmail(String(value)) || new RuleError(EMAIL);
}
