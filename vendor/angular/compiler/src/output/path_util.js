/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// asset:<package-name>/<realm>/<path-to-module>
var /** @type {?} */ _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/;
/**
 * Interface that defines how import statements should be generated.
 */
export var ImportGenerator = (function () {
    function ImportGenerator() {
    }
    /**
     * @param {?} url
     * @return {?}
     */
    ImportGenerator.parseAssetUrl = function (url) { return AssetUrl.parse(url); };
    /**
     * @abstract
     * @param {?} moduleUrlStr
     * @param {?} importedUrlStr
     * @return {?}
     */
    ImportGenerator.prototype.getImportPath = function (moduleUrlStr, importedUrlStr) { };
    return ImportGenerator;
}());
export var AssetUrl = (function () {
    /**
     * @param {?} packageName
     * @param {?} firstLevelDir
     * @param {?} modulePath
     */
    function AssetUrl(packageName, firstLevelDir, modulePath) {
        this.packageName = packageName;
        this.firstLevelDir = firstLevelDir;
        this.modulePath = modulePath;
    }
    /**
     * @param {?} url
     * @param {?=} allowNonMatching
     * @return {?}
     */
    AssetUrl.parse = function (url, allowNonMatching) {
        if (allowNonMatching === void 0) { allowNonMatching = true; }
        var /** @type {?} */ match = url.match(_ASSET_URL_RE);
        if (match !== null) {
            return new AssetUrl(match[1], match[2], match[3]);
        }
        if (allowNonMatching) {
            return null;
        }
        throw new Error("Url " + url + " is not a valid asset: url");
    };
    AssetUrl._tsickle_typeAnnotationsHelper = function () {
        /** @type {?} */
        AssetUrl.prototype.packageName;
        /** @type {?} */
        AssetUrl.prototype.firstLevelDir;
        /** @type {?} */
        AssetUrl.prototype.modulePath;
    };
    return AssetUrl;
}());
//# sourceMappingURL=path_util.js.map