import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { MAX_NUMERIC, MAX_STRING, MAX_ARRAY, MAX_FILE } from "../types/rules";
import { when } from "../utils/helpers";
import {
  ARGUMENT_MUST_BE_A_NUMBER,
  ARGUMENT_MUST_BE_PROVIDED,
} from "../types/error-dev";
import file from "./file";

function max({ value = "", args = [], type = "string", input = null }) {
  let [max] = args;

  when(!max).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!v8n().numeric().test(max)).throwError(ARGUMENT_MUST_BE_A_NUMBER);

  if (type === "numeric") {
    return maxForNumber(value, max);
  }

  if (type === "string") {
    return maxForString(value, max);
  }

  if (type === "array") {
    return maxForArray(value, max);
  }

  if (type === "file") {
    return maxForFile(value, max.input, input);
  }

  return true;
}

function maxForNumber(value = "", max = 1) {
  return (
    v8n().lessThanOrEqual(max).test(value) ||
    new RuleError(MAX_NUMERIC, { max })
  );
}

function maxForString(value = "", max = 1) {
  return v8n().maxLength(max).test(value) || new RuleError(MAX_STRING, { max });
}

function maxForArray(value = "", max = 1) {
  return v8n().maxLength(max).test(value) || new RuleError(MAX_ARRAY, { max });
}

function maxForFile(value = "", max = 1, input) {
  if (file(input) instanceof RuleError) return new RuleError(MAX_FILE, { max });

  let files = input.files;
  for (let index = 0; index < files.length; index++) {
    if (!v8n().lessThanOrEqual(max).test(files[index].size)) {
      return new RuleError(MAX_FILE, { max });
    }
  }

  return true;
}

export default max;
