'use strict';

var upgrade = require('./upgrade/upgrade.js');
require('semver');
require('./upgrade/requirements/common.js');
var runCodemods = require('./codemods/run-codemods.js');
var listCodemods = require('./codemods/list-codemods.js');



exports.upgrade = upgrade.upgrade;
exports.runCodemods = runCodemods.runCodemods;
exports.listCodemods = listCodemods.listCodemods;
//# sourceMappingURL=index.js.map
