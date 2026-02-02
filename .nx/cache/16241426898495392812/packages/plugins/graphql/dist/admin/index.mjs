import pluginPkg from './package.json.mjs';
import { pluginId } from './pluginId.mjs';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations.mjs';

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case './translations/dk.json': return import('./translations/dk.json.mjs');
    case './translations/en.json': return import('./translations/en.json.mjs');
    case './translations/es.json': return import('./translations/es.json.mjs');
    case './translations/fr.json': return import('./translations/fr.json.mjs');
    case './translations/pl.json': return import('./translations/pl.json.mjs');
    case './translations/ru.json': return import('./translations/ru.json.mjs');
    case './translations/sv.json': return import('./translations/sv.json.mjs');
    case './translations/tr.json': return import('./translations/tr.json.mjs');
    case './translations/uk.json': return import('./translations/uk.json.mjs');
    case './translations/zh-Hans.json': return import('./translations/zh-Hans.json.mjs');
    case './translations/zh.json': return import('./translations/zh.json.mjs');
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
const name = pluginPkg.strapi.name;
// eslint-disable-next-line import/no-default-export
var index = {
    // TODO: we need to have the type for StrapiApp done from `@strapi/admin` package.
    register (app) {
        app.registerPlugin({
            id: pluginId,
            name
        });
    },
    bootstrap () {},
    async registerTrads ({ locales }) {
        const importedTrads = await Promise.all(locales.map((locale)=>{
            return __variableDynamicImportRuntime0__(`./translations/${locale}.json`).then(({ default: data })=>{
                return {
                    data: prefixPluginTranslations(data, pluginId),
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

export { index as default };
//# sourceMappingURL=index.mjs.map
