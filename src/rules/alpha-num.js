import { RuleError } from "../modules/rule-error";
import { ALPHA_NUM } from "../types/rules";

export default function alphaNum({ value = "" }) {
  return /^[\p{L}\p{M}\p{N}]+$/u.test(value) || new RuleError(ALPHA_NUM);
}
