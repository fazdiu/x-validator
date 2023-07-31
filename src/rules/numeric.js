import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { NUMERIC } from "../types/rules";

export default function numeric({ value = "" }) {
  return v8n().numeric().test(value) || new RuleError(NUMERIC);
}
