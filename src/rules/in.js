import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { IN } from "../types/rules";

export default function _in({value = "", args = []}) {
  let items = args;

  when(!items).throwError(ARGUMENT_MUST_BE_PROVIDED);
  
  if (Array.isArray(value))
    return items.some((r) => value.includes(r)) || new RuleError(IN);

  return v8n().includes(items).test(value) || new RuleError(IN);
}
