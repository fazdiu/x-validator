import * as rules from "../types/rules";

export default {
  DEFAULT: "El campo no es válido.",
  [rules.REQUIRED]: "El campo es obligatorio.",
  [rules.MIN_STRING]: "El campo debe tener al menos :min caracteres.",
  [rules.MIN_NUMERIC]: "El campo debe ser al menos :min.",
  [rules.MIN_ARRAY]:
    "El campo debe tener al menos :min elementos seleccionados.",
  [rules.MIN_FILE]: "El archivo debe tener al menos :min kilobytes.",

  [rules.MAX_STRING]: "El campo no debe tener más de :max caracteres.",
  [rules.MAX_NUMERIC]: "El campo no debe ser mayor que :max.",
  [rules.MAX_ARRAY]:
    "El campo no debe tener más de :max elementos seleccionados.",
  [rules.MAX_FILE]: "El campo no debe ser mayor que :max kilobytes.",

  [rules.BETWEEN_STRING]: "El campo debe tener entre :min y :max caracteres.",
  [rules.BETWEEN_NUMERIC]: "El campo debe estar entre :min y :max.",
  [rules.BETWEEN_ARRAY]:
    "El campo debe tener entre :min y :max elementos seleccionados.",
  [rules.BETWEEN_FILE]: "El campo debe estar entre :min y :max kilobytes.",

  [rules.STRING]: "El campo debe ser una cadena.",
  [rules.NUMERIC]: "El campo debe ser un número.",
  [rules.ARRAY]: "El campo debe ser una matriz.",
  [rules.FILE]: "El campo debe ser un archivo.",
  [rules.INTEGER]: "El campo debe ser un número entero.",
  [rules.ACCEPTED]: "El campo debe ser aceptado.",

  [rules.ALPHA]: "El campo solo debe contener letras.",
  [rules.ALPHA_NUM]: "El campo solo debe contener letras y números.",
  [rules.EQUAL_TO]: "El campo debe ser igual a :field.",
  [rules.IN]: "El elemento seleccionado no es válido.",
  [rules.REGEX]: "El formato del campo no es válido.",
  [rules.SIZE_STRING]: "El campo debe tener :size de caracteres.",
  [rules.SIZE_NUMERIC]: "El campo debe ser :size.",
  [rules.STARTS_WITH]:
    "El campo debe comenzar con uno de los siguientes: :values.",
  [rules.ENDS_WITH]: "El campo debe terminar con uno de los siguientes: :values.",

  [rules.DIGITS]: "El campo debe tener :digits dígitos",
  [rules.EMAIL]: "El campo debe ser una dirección de correo electrónico válida.",
  [rules.DATE]: "El campo no es una fecha válida.",
  [rules.URL]: "El campo no es una URL válida.",
  [rules.SLUG]: "El formato del campo no es válido.",

  [rules.CREDIT_CARD]: "El número de la tarjeta de crédito es inválido.",
  [rules.MOBILE_PHONE]: "El número de teléfono móvil no es válido.",
  [rules.STRONG_PASSWORD]:
    "El valor ingresado no se puede considerar como una contraseña segura.",
  [rules.TIME]: "El campo no es una hora válida.",
  [rules.HEX_COLOR]: "El valor no es un color hexadecimal.",
};
