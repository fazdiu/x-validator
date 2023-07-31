import isDate from "validator/es/lib/isDate";
import { RuleError } from "../modules/rule-error";
import { DATE } from "../types/rules";

export default function email({ value = "" }) {
  if (Array.isArray(value)) value = value.join("");

  return isDate(String(isEmail)) || new RuleError(DATE);
}
