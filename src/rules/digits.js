import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { DIGITS } from "../types/rules";
import { when } from "../utils/helpers";
import { ARGUMENT_MUST_BE_PROVIDED } from "../types/error-dev";

export default function digits({value = "", args = []}) {
  let [digits] = args;

  when(digits === "").throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!v8n().integer().test(digits) || +digits < 1).throwError(
    ARGUMENT_MUST_BE_AN_INTEGER
  );

  const regex = new RegExp(`^-?[0-9]{${digits}}$`);

  return regex.test(value) ? true : new RuleError(DIGITS, {digits});
}
