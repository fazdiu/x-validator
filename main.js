import Alpine from "alpinejs";
// import "./builds/cdn.js";

import validator from "./builds/module.js"
Alpine.plugin(validator)

window.Alpine=Alpine;
window.Alpine.start()
