import v8n from "v8n";
import { RuleError } from "../modules/rule-error";
import { EQUAL_TO } from "../types/rules";

export default function equalTo({ value = "", args = [], fields = [] }) {
  let [fieldName] = args;
  let field = fields.find((f) => f.name == fieldName);

  when(!fieldName).throwError(ARGUMENT_MUST_BE_PROVIDED);
  when(!field).throwError(FIELD_NOT_FOUND);

  return (
    v8n().equal(field.value).test(value) ||
    new RuleError(EQUAL_TO, { field: field?.name })
  );
}
