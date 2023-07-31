import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { MIN_STRING, MIN_NUMERIC, MIN_ARRAY, MIN_FILE } from "../types/rules";
import { when } from "../utils/helpers";
import {
  ARGUMENT_MUST_BE_A_NUMBER,
  ARGUMENT_MUST_BE_PROVIDED,
} from "../types/error-dev";
import file from "./file";

function min({ value = "", args = [], type = "string", input = null }) {
  let [min] = args;

  when(!min).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!v8n().numeric().test(min)).throwError(ARGUMENT_MUST_BE_A_NUMBER);

  if (type === "numeric") {
    return minForNumber(value, min);
  }

  if (type === "string") {
    return minForString(value, min);
  }

  if (type === "array") {
    return minForArray(value, min);
  }

  if (type === "file") {
    return minForFile(value, min, input);
  }

  return true;
}

function minForNumber(value = "", min = 1) {
  return (
    v8n().greaterThanOrEqual(min).test(value) ||
    new RuleError(MIN_NUMERIC, { min })
  );
}

function minForString(value = "", min = 1) {
  return v8n().minLength(min).test(value) || new RuleError(MIN_STRING, { min });
}

function minForArray(value = "", min = 1) {
  return v8n().minLength(min).test(value) || new RuleError(MIN_ARRAY, { min });
}

function minForFile(value = "", min = 1, input) {
  if (file(input) instanceof RuleError) return new RuleError(MIN_FILE, { min });

  let files = input.files;
  for (let index = 0; index < files.length; index++) {
    if (!v8n().greaterThanOrEqual(min).test(files[index].size)) {
      return new RuleError(MIN_FILE, { min });
    }
  }

  return true;
}

export default min;
