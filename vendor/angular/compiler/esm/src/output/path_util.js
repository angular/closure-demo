goog.module('_angular$compiler$src$output$path__util');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
// asset:<package-name>/<realm>/<path-to-module>
var /** @type {?} */ _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/g;
/**
 * Interface that defines how import statements should be generated.
 */
class ImportGenerator {
    /**
     * @param {?} url
     * @return {?}
     */
    static parseAssetUrl(url) { return AssetUrl.parse(url); }
}
exports.ImportGenerator = ImportGenerator;
class AssetUrl {
    /**
     * @param {?} packageName
     * @param {?} firstLevelDir
     * @param {?} modulePath
     */
    constructor(packageName, firstLevelDir, modulePath) {
        this.packageName = packageName;
        this.firstLevelDir = firstLevelDir;
        this.modulePath = modulePath;
    }
    /**
     * @param {?} url
     * @param {?=} allowNonMatching
     * @return {?}
     */
    static parse(url, allowNonMatching = true) {
        var /** @type {?} */ match = lang_1.RegExpWrapper.firstMatch(_ASSET_URL_RE, url);
        if (lang_1.isPresent(match)) {
            return new AssetUrl(match[1], match[2], match[3]);
        }
        if (allowNonMatching) {
            return null;
        }
        throw new exceptions_1.BaseException(`Url ${url} is not a valid asset: url`);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        AssetUrl.prototype.packageName;
        /** @type {?} */
        AssetUrl.prototype.firstLevelDir;
        /** @type {?} */
        AssetUrl.prototype.modulePath;
    }
}
exports.AssetUrl = AssetUrl;
//# sourceMappingURL=path_util.js.map