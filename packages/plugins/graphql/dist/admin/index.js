'use strict';

var _package = require('./package.json.js');
var pluginId = require('./pluginId.js');
var prefixPluginTranslations = require('./utils/prefixPluginTranslations.js');

function _interopNamespaceDefaultOnly (e) { return Object.freeze({ __proto__: null, default: e }); }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/dk.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/dk.json.js')); });
    case './translations/en.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/en.json.js')); });
    case './translations/es.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/es.json.js')); });
    case './translations/fr.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/fr.json.js')); });
    case './translations/pl.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/pl.json.js')); });
    case './translations/ru.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/ru.json.js')); });
    case './translations/sv.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/sv.json.js')); });
    case './translations/tr.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/tr.json.js')); });
    case './translations/uk.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/uk.json.js')); });
    case './translations/zh-Hans.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/zh-Hans.json.js')); });
    case './translations/zh.json': return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./translations/zh.json.js')); });
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
const name = _package.default.strapi.name;
// eslint-disable-next-line import/no-default-export
var index = {
    // TODO: we need to have the type for StrapiApp done from `@strapi/admin` package.
    register (app) {
        app.registerPlugin({
            id: pluginId.pluginId,
            name
        });
    },
    bootstrap () {},
    async registerTrads ({ locales }) {
        const importedTrads = await Promise.all(locales.map((locale)=>{
            return __variableDynamicImportRuntime0__(`./translations/${locale}.json`).then(({ default: data })=>{
                return {
                    data: prefixPluginTranslations.prefixPluginTranslations(data, pluginId.pluginId),
                    locale
                };
            }).catch(()=>{
                return {
                    data: {},
                    locale
                };
            });
        }));
        return Promise.resolve(importedTrads);
    }
};

module.exports = index;
//# sourceMappingURL=index.js.map
