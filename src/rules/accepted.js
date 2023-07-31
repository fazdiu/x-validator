import { RuleError } from "../modules/rule-error";
import { ACCEPTED } from "../types/rules";

export default function accepted({ value = null }) {
  return value === "checked" || new RuleError(ACCEPTED);
}
