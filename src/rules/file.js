import { RuleError } from "../modules/rule-error";
import { FILE } from "../types/rules";

export default function file({ input = null }) {
  if (typeof input?.files === "undefined") new RuleError(FILE);
  return true;
}
