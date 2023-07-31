import { RuleError } from "../modules/rule-error";
import { ALPHA } from "../types/rules";

export default function alpha({ value = "" }) {
  return /^[\p{L}\p{M}]+$/u.test(value) || new RuleError(ALPHA);
}
