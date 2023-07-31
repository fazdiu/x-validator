import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { SIZE_NUMERIC, SIZE_STRING } from "../types/rules";
import { when } from "../utils/helpers";
import {
  ARGUMENT_MUST_BE_A_NUMBER,
  ARGUMENT_MUST_BE_POSITIVE,
  ARGUMENT_MUST_BE_PROVIDED,
} from "../types/error-dev";

function size({ value = "", args = [], type = "" }) {
  let [size] = args;

  when(!size).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!v8n().numeric().test(size)).throwError(ARGUMENT_MUST_BE_A_NUMBER);

  return type === "numeric"
    ? sizeForNumber(value, size)
    : sizeForString(value, size);
}

function sizeForNumber(value = "", size = 1) {
  const valueInNumber = Number(value);
  if (value !== "" && !Number.isNaN(valueInNumber) && valueInNumber === size) {
    return true;
  }

  return new RuleError(SIZE_NUMERIC, { size: String(size) });
}

function sizeForString(value = "", size = 1) {
  when(size < 0).throwError(ARGUMENT_MUST_BE_POSITIVE);

  if (value.length === size) {
    return true;
  }

  return new RuleError(SIZE_STRING, { size: String(size) });
}

export default size;
