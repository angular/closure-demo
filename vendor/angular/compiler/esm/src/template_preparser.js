goog.module('_angular$compiler$src$template__preparser');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var html_tags_1 = goog.require('_angular$compiler$src$html__tags');
const /** @type {?} */ NG_CONTENT_SELECT_ATTR = 'select';
const /** @type {?} */ NG_CONTENT_ELEMENT = 'ng-content';
const /** @type {?} */ LINK_ELEMENT = 'link';
const /** @type {?} */ LINK_STYLE_REL_ATTR = 'rel';
const /** @type {?} */ LINK_STYLE_HREF_ATTR = 'href';
const /** @type {?} */ LINK_STYLE_REL_VALUE = 'stylesheet';
const /** @type {?} */ STYLE_ELEMENT = 'style';
const /** @type {?} */ SCRIPT_ELEMENT = 'script';
const /** @type {?} */ NG_NON_BINDABLE_ATTR = 'ngNonBindable';
const /** @type {?} */ NG_PROJECT_AS = 'ngProjectAs';
/**
 * @param {?} ast
 * @return {?}
 */
function preparseElement(ast) {
    var /** @type {?} */ selectAttr = null;
    var /** @type {?} */ hrefAttr = null;
    var /** @type {?} */ relAttr = null;
    var /** @type {?} */ nonBindable = false;
    var /** @type {?} */ projectAs = null;
    ast.attrs.forEach(attr => {
        let /** @type {?} */ lcAttrName = attr.name.toLowerCase();
        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
            selectAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
            hrefAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_REL_ATTR) {
            relAttr = attr.value;
        }
        else if (attr.name == NG_NON_BINDABLE_ATTR) {
            nonBindable = true;
        }
        else if (attr.name == NG_PROJECT_AS) {
            if (attr.value.length > 0) {
                projectAs = attr.value;
            }
        }
    });
    selectAttr = normalizeNgContentSelect(selectAttr);
    var /** @type {?} */ nodeName = ast.name.toLowerCase();
    var /** @type {?} */ type = exports.PreparsedElementType.OTHER;
    if (html_tags_1.splitNsName(nodeName)[1] == NG_CONTENT_ELEMENT) {
        type = exports.PreparsedElementType.NG_CONTENT;
    }
    else if (nodeName == STYLE_ELEMENT) {
        type = exports.PreparsedElementType.STYLE;
    }
    else if (nodeName == SCRIPT_ELEMENT) {
        type = exports.PreparsedElementType.SCRIPT;
    }
    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = exports.PreparsedElementType.STYLESHEET;
    }
    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
}
exports.preparseElement = preparseElement;
exports.PreparsedElementType = {};
exports.PreparsedElementType.NG_CONTENT = 0;
exports.PreparsedElementType.STYLE = 1;
exports.PreparsedElementType.STYLESHEET = 2;
exports.PreparsedElementType.SCRIPT = 3;
exports.PreparsedElementType.OTHER = 4;
exports.PreparsedElementType[exports.PreparsedElementType.NG_CONTENT] = "NG_CONTENT";
exports.PreparsedElementType[exports.PreparsedElementType.STYLE] = "STYLE";
exports.PreparsedElementType[exports.PreparsedElementType.STYLESHEET] = "STYLESHEET";
exports.PreparsedElementType[exports.PreparsedElementType.SCRIPT] = "SCRIPT";
exports.PreparsedElementType[exports.PreparsedElementType.OTHER] = "OTHER";
class PreparsedElement {
    /**
     * @param {?} type
     * @param {?} selectAttr
     * @param {?} hrefAttr
     * @param {?} nonBindable
     * @param {?} projectAs
     */
    constructor(type, selectAttr, hrefAttr, nonBindable, projectAs) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
        this.projectAs = projectAs;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PreparsedElement.prototype.type;
        /** @type {?} */
        PreparsedElement.prototype.selectAttr;
        /** @type {?} */
        PreparsedElement.prototype.hrefAttr;
        /** @type {?} */
        PreparsedElement.prototype.nonBindable;
        /** @type {?} */
        PreparsedElement.prototype.projectAs;
    }
}
exports.PreparsedElement = PreparsedElement;
/**
 * @param {?} selectAttr
 * @return {?}
 */
function normalizeNgContentSelect(selectAttr) {
    if (lang_1.isBlank(selectAttr) || selectAttr.length === 0) {
        return '*';
    }
    return selectAttr;
}
//# sourceMappingURL=template_preparser.js.map