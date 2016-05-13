goog.module('_angular$platform_browser$testing$matchers');
var dom_adapter_1 = goog.require('_angular$platform_browser$src$dom$dom__adapter');
var lang_1 = goog.require('_angular$platform_browser$src$facade$lang');
var collection_1 = goog.require('_angular$platform_browser$src$facade$collection');
var /** @type {?} */ _global = ((typeof window === 'undefined' ? lang_1.global : window));
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
exports.expect = (_global.expect);
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
Map.prototype['jasmineToString'] = function () {
    var /** @type {?} */ m = this;
    if (!m) {
        return '' + m;
    }
    var /** @type {?} */ res = [];
    m.forEach((v, k) => { res.push(`${k}:${v}`); });
    return `{ ${res.join(',')} }`;
};
_global.beforeEach(function () {
    jasmine.addMatchers({
        // Custom handler for Map as Jasmine does not support it yet
        toEqual: function (util, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    return { pass: util.equals(actual, expected, [compareMap]) };
                }
            };
            /**
             * @param {?} actual
             * @param {?} expected
             * @return {?}
             */
            function compareMap(actual, expected) {
                if (actual instanceof Map) {
                    var /** @type {?} */ pass = actual.size === expected.size;
                    if (pass) {
                        actual.forEach((v, k) => { pass = pass && util.equals(v, expected.get(k)); });
                    }
                    return pass;
                }
                else {
                    return undefined;
                }
            }
        },
        toBePromise: function () {
            return {
                compare: function (actual, expectedClass) {
                    var /** @type {?} */ pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual, expectedClass) {
                    var /** @type {?} */ pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual, expectedText) {
                    var /** @type {?} */ actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            /**
             * @param {?} isNot
             * @return {?}
             */
            function buildError(isNot) {
                return function (actual, className) {
                    return {
                        pass: dom_adapter_1.getDOM().hasClass(actual, className) == !isNot,
                        get message() {
                            return `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`;
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual, styles) {
                    var /** @type {?} */ allPassed;
                    if (lang_1.isString(styles)) {
                        allPassed = dom_adapter_1.getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = !collection_1.StringMapWrapper.isEmpty(styles);
                        collection_1.StringMapWrapper.forEach(styles, (style, prop) => {
                            allPassed = allPassed && dom_adapter_1.getDOM().hasStyle(actual, prop, style);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            var /** @type {?} */ expectedValueStr = lang_1.isString(styles) ? styles : JSON.stringify(styles);
                            return `Expected ${actual.outerHTML} ${!allPassed ? ' ' : 'not '}to contain the
                      CSS ${lang_1.isString(styles) ? 'property' : 'styles'} "${expectedValueStr}"`;
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual, expectedText) {
                    var /** @type {?} */ errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toThrowErrorWith: function () {
            return {
                compare: function (actual, expectedText) {
                    try {
                        actual();
                        return {
                            pass: false,
                            get message() { return "Was expected to throw, but did not throw"; }
                        };
                    }
                    catch (e) {
                        var /** @type {?} */ errorMessage = e.toString();
                        return {
                            pass: errorMessage.indexOf(expectedText) > -1,
                            get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                        };
                    }
                }
            };
        },
        /**
         * @return {?}
         */
        toMatchPattern() {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            /**
             * @param {?} isNot
             * @return {?}
             */
            function buildError(isNot) {
                return function (actual, regex) {
                    return {
                        pass: regex.test(actual) == !isNot,
                        get message() {
                            return `Expected ${actual} ${isNot ? 'not ' : ''}to match ${regex.toString()}`;
                        }
                    };
                };
            }
        },
        toImplement: function () {
            return {
                compare: function (actualObject, expectedInterface) {
                    var /** @type {?} */ objProps = Object.keys(actualObject.constructor.prototype);
                    var /** @type {?} */ intProps = Object.keys(expectedInterface.prototype);
                    var /** @type {?} */ missedMethods = [];
                    intProps.forEach((k) => {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(", ");
                        }
                    };
                }
            };
        }
    });
});
/**
 * @param {?} n
 * @return {?}
 */
function elementText(n) {
    var /** @type {?} */ hasNodes = (n) => {
        var /** @type {?} */ children = dom_adapter_1.getDOM().childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join("");
    }
    if (dom_adapter_1.getDOM().isCommentNode(n)) {
        return '';
    }
    if (dom_adapter_1.getDOM().isElementNode(n) && dom_adapter_1.getDOM().tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(dom_adapter_1.getDOM().getDistributedNodes(n)));
    }
    if (dom_adapter_1.getDOM().hasShadowRoot(n)) {
        return elementText(dom_adapter_1.getDOM().childNodesAsList(dom_adapter_1.getDOM().getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(dom_adapter_1.getDOM().childNodesAsList(n));
    }
    return dom_adapter_1.getDOM().getText(n);
}
//# sourceMappingURL=matchers.js.map