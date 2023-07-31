import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { STRING } from "../types/rules";

export default function string({ value = "" }) {
  return v8n().string().test(value) || new RuleError(STRING);
}
