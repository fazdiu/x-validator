import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { INTEGER } from "../types/rules";

export default function integer({ value = "" }) {
  if (v8n().numeric().test(value)) {
    value = Number(value);
  }

  return v8n().integer().test(value) || new RuleError(INTEGER);
}
