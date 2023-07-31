import isHexColor from "validator/es/lib/isHexColor";
import { RuleError } from "../modules/rule-error";
import { HEX_COLOR } from "../types/rules";

export default function hexColor({value = ""}) {
  if (Array.isArray(value)) value = value.join("");

  return isHexColor(String(value)) || new RuleError(HEX_COLOR);
}
