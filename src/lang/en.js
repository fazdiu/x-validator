import * as rules from "../types/rules";

export default {
  DEFAULT: "The field is invalid.",
  [rules.REQUIRED]: "The field is required.",
  [rules.MIN_STRING]: "The field must be at least :min characters.",
  [rules.MIN_NUMERIC]: "The field must be at least :min.",
  [rules.MIN_ARRAY]: "The field must have at least :min items selected.",
  [rules.MIN_FILE]: "The file must be at least :min kilobytes.",

  [rules.MAX_STRING]: "The field must not be greater than :max characters.",
  [rules.MAX_NUMERIC]: "The field must not be greater than :max.",
  [rules.MAX_ARRAY]: "The field must not have more than :max items selected.",
  [rules.MAX_FILE]: "The field must not be greater than :max kilobytes.",

  [rules.BETWEEN_STRING]: "The field must be between :min and :max characters.",
  [rules.BETWEEN_NUMERIC]: "The field must be between :min and :max.",
  [rules.BETWEEN_ARRAY]:
    "The field must have between :min and :max items selected.",
  [rules.BETWEEN_FILE]: "The field must be between :min and :max kilobytes.",

  [rules.STRING]: "The field must be a string.",
  [rules.NUMERIC]: "The field must be a number.",
  [rules.ARRAY]: "The field must be an array.",
  [rules.FILE]: "The field must be a file.",
  [rules.INTEGER]: "The field must be an integer.",
  [rules.ACCEPTED]: "The field must be accepted.",

  [rules.ALPHA]: "The field must only contain letters.",
  [rules.ALPHA_NUM]: "The field must only contain letters and numbers.",
  [rules.EQUAL_TO]: "The field must be a equal to :field.",
  [rules.IN]: "The selected item is invalid.",
  [rules.REGEX]: "The field format is invalid.",
  [rules.SIZE_STRING]: "The field must be :size characters.",
  [rules.SIZE_NUMERIC]: "The field must be :size.",
  [rules.STARTS_WITH]:
    "The field must start with one of the following: :values.",
  [rules.ENDS_WITH]: "The field must end with one of the following: :values.",

  [rules.DIGITS]: "The field must be :digits digits.",
  [rules.EMAIL]: "The field must be a valid email address.",
  [rules.DATE]: "The field is not a valid date.",
  [rules.URL]: "The field is not a valid URL.",
  [rules.SLUG]: "The field format is invalid.",

  [rules.CREDIT_CARD]: "The credit card number is invalid.",
  [rules.MOBILE_PHONE]: "The mobile phone number is invalid.",
  [rules.STRONG_PASSWORD]:
    "The entered value cannot be considered as a strong password.",
  [rules.TIME]: "The field is not a valid time.",
  [rules.HEX_COLOR]: "The value is not a hexadecimal color.",
};
