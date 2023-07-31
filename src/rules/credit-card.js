import isCreditCard from "validator/es/lib/isCreditCard";
import { RuleError } from "../modules/rule-error";
import { CREDIT_CARD } from "../types/rules";

export default function creditCard({value = ""}) {

  if (Array.isArray(value)) value = value.join("");

  return isCreditCard(String(value)) || new RuleError(CREDIT_CARD);
}
