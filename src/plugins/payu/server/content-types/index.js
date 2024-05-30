'use strict';
const productionSettings = require("./production-settings");
const sandboxSettings = require("./sandbox-settings");
// module.exports = {
//   "production-settings": productionSettings,
//   "sandbox-settings": sandboxSettings,
// }
const configuration = require("./configuration");
module.exports = {
  // ...
  configuration,
    "production-settings": productionSettings,
  "sandbox-settings": sandboxSettings,
};