import isURL from "validator/es/lib/isURL";
import { RuleError } from "../modules/rule-error";
import { URL } from "../types/rules";

export default function url({ value = "" }) {
  if (Array.isArray(value)) value = value.join("");

  return isURL(String(value)) || new RuleError(URL);
}
