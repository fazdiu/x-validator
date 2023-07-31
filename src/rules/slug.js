import isSlug from "validator/es/lib/isSlug";
import { RuleError } from "../modules/rule-error";
import { SLUG } from "../types/rules";

export default function strongPassword({ value = "" }) {
  if (Array.isArray(value)) value = value.join("");

  return isSlug(String(value)) || new RuleError(SLUG);
}
