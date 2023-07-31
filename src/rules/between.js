import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import {
  BETWEEN_NUMERIC,
  BETWEEN_STRING,
  BETWEEN_ARRAY,
  BETWEEN_FILE,
} from "../types/rules";
import { when } from "../utils/helpers";
import {
  ARGUMENT_MUST_BE_A_NUMBER,
  ARGUMENT_MUST_BE_PROVIDED,
} from "../types/error-dev";
import file from "./file";

function between({ value = "", args = [], type = "string", input }) {
  let [min, max] = args;

  when(!min).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!v8n().numeric().test(min)).throwError(ARGUMENT_MUST_BE_A_NUMBER);
  when(!max).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!v8n().numeric().test(max)).throwError(ARGUMENT_MUST_BE_A_NUMBER);

  if (type === "numeric") {
    return betweenForNumber(value, min, max);
  }

  if (type === "string") {
    return betweenForString(value, min, max);
  }

  if (type === "array") {
    return betweenForArray(value, min, max);
  }

  if (type === "file") {
    return betweenForFile(value, min, max, input);
  }

  return true;
}

function betweenForNumber(value = "", min = 1, max = 1) {
  if (!v8n().numeric().test(value)) value = Number(value);

  return (
    v8n().between(min, max).test(value) ||
    new RuleError(BETWEEN_NUMERIC, { min, max })
  );
}

function betweenForString(value = "", min = 1, max = 1) {
  if (!(v8n().minLength(min).test(value) && v8n().maxLength(max).test(value))) {
    return new RuleError(BETWEEN_STRING, { min, max });
  }

  return true;
}

function betweenForArray(value = "", min = 1, max = 1) {
  if (!(v8n().minLength(min).test(value) && v8n().maxLength(max).test(value))) {
    return new RuleError(BETWEEN_ARRAY, { min, max });
  }

  return true;
}

function betweenForFile(value = "", min = 1, max = 1, input) {
  if (file(input) instanceof RuleError)
    return new RuleError(BETWEEN_FILE, { min, max });

  let files = input.files;
  for (let index = 0; index < files.length; index++) {
    if (!v8n().between(min, max).test(files[index].size)) {
      return new RuleError(BETWEEN_FILE, { min, max });
    }
  }

  return true;
}

export default between;
