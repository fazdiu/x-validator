export function getName(el) {
  if (el._x_validator_name) {
    return el._x_validator_name;
  }

  let name = "";

  if (el.hasAttribute("name")) {
    name = el.getAttribute("name").replaceAll(" ", "_");
  } else {
    name = `_name_rand_${Math.floor(Math.random() * (10000 - 1) + 1)}_`;
  }

  el._x_validator_name = name;

  return name;
}

export function processRule(rule) {
  let [name, argsText = ""] = rule.split(":");

  return {
    name,
    argsText,
    args: processArgs(argsText),
  };
}

export function processArgs(args) {
  return args ? args.split(",") : [];
}

export function getValue(element) {
  if (element.tagName == "INPUT") {
    if (element.type === "checkbox" || element.type === "radio") {
      if (element.checked) return element.value || "checked";
      return "";
    }

    return element.value;
  }

  if (element.tagName == "TEXTAREA") {
    return element.value;
  }

  if (element.tagName == "SELECT") {
    return Array.from(element.selectedOptions).map((option) => option.value);
  }

  return "";
}

export function when(condition) {
  return {
    throwError(message) {
      if (condition) {
        throw new Error(message);
      }
    },
  };
}

export function replace(str, searchReplace = {}) {
  Object.keys(searchReplace).forEach((key) => {
    str = str.replaceAll(`:${key}`, searchReplace[key]);
  });
  return str;
}

export function getXModel(element) {
  let attrs = element.attributes;
  for (let index = 0; index < attrs.length; index++) {
    if (attrs[index].nodeName.startsWith("x-model")) {
      return attrs[index].value.trim();
    }
  }
  return null;
}
