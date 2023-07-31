import isMobilePhone from "validator/es/lib/isMobilePhone";
import { RuleError } from "../modules/rule-error";
import { MOBILE_PHONE } from "../types/rules";

export default function mobilePhone({ value = "", args = [] }) {
  let locales = args;

  if (Array.isArray(value)) value = value.join("");

  return isMobilePhone(String(value), locales) || new RuleError(MOBILE_PHONE);
}
