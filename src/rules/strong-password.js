import isStrongPassword from "validator/es/lib/isStrongPassword";
import { RuleError } from "../modules/rule-error";
import { STRONG_PASSWORD } from "../types/rules";

export default function strongPassword({ value = "" }) {
  if (Array.isArray(value)) value = value.join("");

  return isStrongPassword(String(value)) || new RuleError(STRONG_PASSWORD);
}
