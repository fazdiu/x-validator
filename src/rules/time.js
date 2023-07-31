import isTime from "validator/es/lib/isTime";
import { RuleError } from "../modules/rule-error";
import { TIME } from "../types/rules";

export default function time({value = ""}) {

  if (Array.isArray(value)) value = value.join("");

  return isTime(String(value)) || new RuleError(TIME);
}
