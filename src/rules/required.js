import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { REQUIRED } from "../types/rules";

export default function required({value = ""}) {
  if (v8n().empty().test(value)) return new RuleError(REQUIRED);

  return true;
}
