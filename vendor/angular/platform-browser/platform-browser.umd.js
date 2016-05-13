/**
 * @license AngularJS v$$ANGULAR_VERSION$$
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
        typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common'], factory) :
            (factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}), global.ng.core, global.ng.common));
}(this, function (exports, _angular_core, _angular_common) {
    'use strict';
    goog.module('_angular$platform_browser$src$facade$lang');
    var /** @type {?} */ globalScope;
    if (typeof window === 'undefined') {
        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
            // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
            globalScope = (self);
        }
        else {
            globalScope = (global);
        }
    }
    else {
        globalScope = (window);
    }
    var /** @type {?} */ IS_DART = false;
    // Need to declare a new variable for global here since TypeScript
    // exports the original value of the symbol.
    var /** @type {?} */ global$1 = globalScope;
    var /** @type {?} */ Date = global$1.Date;
    var /** @type {?} */ _devMode = true;
    /**
     * @return {?}
     */
    function assertionsEnabled() {
        return _devMode;
    }
    // TODO: remove calls to assert in production environment
    // Note: Can't just export this and import in in other files
    // as `assert` is a reserved keyword in Dart
    global$1.assert = function assert(condition) {
        // TODO: to be fixed properly via #2830, noop for now
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isString(obj) {
        return typeof obj === "string";
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isFunction(obj) {
        return typeof obj === "function";
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isArray(obj) {
        return Array.isArray(obj);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token === undefined || token === null) {
            return '' + token;
        }
        if (token.name) {
            return token.name;
        }
        if (token.overriddenName) {
            return token.overriddenName;
        }
        var /** @type {?} */ res = token.toString();
        var /** @type {?} */ newLineIndex = res.indexOf("\n");
        return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
    }
    var StringWrapper = (function () {
        function StringWrapper() {
        }
        /**
         * @param {?} code
         * @return {?}
         */
        StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
        /**
         * @param {?} s
         * @param {?} index
         * @return {?}
         */
        StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
        /**
         * @param {?} s
         * @param {?} regExp
         * @return {?}
         */
        StringWrapper.split = function (s, regExp) { return s.split(regExp); };
        /**
         * @param {?} s
         * @param {?} s2
         * @return {?}
         */
        StringWrapper.equals = function (s, s2) { return s === s2; };
        /**
         * @param {?} s
         * @param {?} charVal
         * @return {?}
         */
        StringWrapper.stripLeft = function (s, charVal) {
            if (s && s.length) {
                var /** @type {?} */ pos = 0;
                for (var /** @type {?} */ i = 0; i < s.length; i++) {
                    if (s[i] != charVal)
                        break;
                    pos++;
                }
                s = s.substring(pos);
            }
            return s;
        };
        /**
         * @param {?} s
         * @param {?} charVal
         * @return {?}
         */
        StringWrapper.stripRight = function (s, charVal) {
            if (s && s.length) {
                var /** @type {?} */ pos = s.length;
                for (var /** @type {?} */ i = s.length - 1; i >= 0; i--) {
                    if (s[i] != charVal)
                        break;
                    pos--;
                }
                s = s.substring(0, pos);
            }
            return s;
        };
        /**
         * @param {?} s
         * @param {?} from
         * @param {?} replace
         * @return {?}
         */
        StringWrapper.replace = function (s, from, replace) {
            return s.replace(from, replace);
        };
        /**
         * @param {?} s
         * @param {?} from
         * @param {?} replace
         * @return {?}
         */
        StringWrapper.replaceAll = function (s, from, replace) {
            return s.replace(from, replace);
        };
        /**
         * @param {?} s
         * @param {?=} from
         * @param {?=} to
         * @return {?}
         */
        StringWrapper.slice = function (s, from, to) {
            if (from === void 0) { from = 0; }
            if (to === void 0) { to = null; }
            return s.slice(from, to === null ? undefined : to);
        };
        /**
         * @param {?} s
         * @param {?} from
         * @param {?} cb
         * @return {?}
         */
        StringWrapper.replaceAllMapped = function (s, from, cb) {
            return s.replace(from, function () {
                var matches = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    matches[_i - 0] = arguments[_i];
                }
                // Remove offset & string from the result array
                matches.splice(-2, 2);
                // The callback receives match, p1, ..., pn
                return cb(matches);
            });
        };
        /**
         * @param {?} s
         * @param {?} substr
         * @return {?}
         */
        StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        StringWrapper.compare = function (a, b) {
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return 0;
            }
        };
        return StringWrapper;
    }());
    var NumberParseError = (function (_super) {
        __extends(NumberParseError, _super);
        /**
         * @param {?} message
         */
        function NumberParseError(message) {
            _super.call(this);
            this.message = message;
        }
        /**
         * @return {?}
         */
        NumberParseError.prototype.toString = function () { return this.message; };
        NumberParseError._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            NumberParseError.prototype.name;
            /** @type {?} */
            NumberParseError.prototype.message;
        };
        return NumberParseError;
    }(Error));
    var NumberWrapper = (function () {
        function NumberWrapper() {
        }
        /**
         * @param {?} n
         * @param {?} fractionDigits
         * @return {?}
         */
        NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        NumberWrapper.equal = function (a, b) { return a === b; };
        /**
         * @param {?} text
         * @return {?}
         */
        NumberWrapper.parseIntAutoRadix = function (text) {
            var /** @type {?} */ result = parseInt(text);
            if (isNaN(result)) {
                throw new NumberParseError("Invalid integer literal when parsing " + text);
            }
            return result;
        };
        /**
         * @param {?} text
         * @param {?} radix
         * @return {?}
         */
        NumberWrapper.parseInt = function (text, radix) {
            if (radix == 10) {
                if (/^(\-|\+)?[0-9]+$/.test(text)) {
                    return parseInt(text, radix);
                }
            }
            else if (radix == 16) {
                if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                    return parseInt(text, radix);
                }
            }
            else {
                var /** @type {?} */ result = parseInt(text, radix);
                if (!isNaN(result)) {
                    return result;
                }
            }
            throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " +
                radix);
        };
        /**
         * @param {?} text
         * @return {?}
         */
        NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
        Object.defineProperty(NumberWrapper, "NaN", {
            get: function () { return NaN; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        NumberWrapper.isNaN = function (value) { return isNaN(value); };
        /**
         * @param {?} value
         * @return {?}
         */
        NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
        return NumberWrapper;
    }());
    var RegExpWrapper = (function () {
        function RegExpWrapper() {
        }
        /**
         * @param {?} regExpStr
         * @param {?=} flags
         * @return {?}
         */
        RegExpWrapper.create = function (regExpStr, flags) {
            if (flags === void 0) { flags = ''; }
            flags = flags.replace(/g/g, '');
            return new global$1.RegExp(regExpStr, flags + 'g');
        };
        /**
         * @param {?} regExp
         * @param {?} input
         * @return {?}
         */
        RegExpWrapper.firstMatch = function (regExp, input) {
            // Reset multimatch regex state
            regExp.lastIndex = 0;
            return regExp.exec(input);
        };
        /**
         * @param {?} regExp
         * @param {?} input
         * @return {?}
         */
        RegExpWrapper.test = function (regExp, input) {
            regExp.lastIndex = 0;
            return regExp.test(input);
        };
        /**
         * @param {?} regExp
         * @param {?} input
         * @return {?}
         */
        RegExpWrapper.matcher = function (regExp, input) {
            // Reset regex state for the case
            // someone did not loop over all matches
            // last time.
            regExp.lastIndex = 0;
            return { re: regExp, input: input };
        };
        /**
         * @param {?} regExp
         * @param {?} input
         * @param {?} replace
         * @return {?}
         */
        RegExpWrapper.replaceAll = function (regExp, input, replace) {
            var /** @type {?} */ c = regExp.exec(input);
            var /** @type {?} */ res = '';
            regExp.lastIndex = 0;
            var /** @type {?} */ prev = 0;
            while (c) {
                res += input.substring(prev, c.index);
                res += replace(c);
                prev = c.index + c[0].length;
                regExp.lastIndex = prev;
                c = regExp.exec(input);
            }
            res += input.substring(prev);
            return res;
        };
        return RegExpWrapper;
    }());
    // Can't be all uppercase as our transpiler would think it is a special directive...
    var Json = (function () {
        function Json() {
        }
        /**
         * @param {?} s
         * @return {?}
         */
        Json.parse = function (s) { return global$1.JSON.parse(s); };
        /**
         * @param {?} data
         * @return {?}
         */
        Json.stringify = function (data) {
            // Dart doesn't take 3 arguments
            return global$1.JSON.stringify(data, null, 2);
        };
        return Json;
    }());
    var DateWrapper = (function () {
        function DateWrapper() {
        }
        /**
         * @param {?} year
         * @param {?=} month
         * @param {?=} day
         * @param {?=} hour
         * @param {?=} minutes
         * @param {?=} seconds
         * @param {?=} milliseconds
         * @return {?}
         */
        DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
            if (month === void 0) { month = 1; }
            if (day === void 0) { day = 1; }
            if (hour === void 0) { hour = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (milliseconds === void 0) { milliseconds = 0; }
            return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
        };
        /**
         * @param {?} str
         * @return {?}
         */
        DateWrapper.fromISOString = function (str) { return new Date(str); };
        /**
         * @param {?} ms
         * @return {?}
         */
        DateWrapper.fromMillis = function (ms) { return new Date(ms); };
        /**
         * @param {?} date
         * @return {?}
         */
        DateWrapper.toMillis = function (date) { return date.getTime(); };
        /**
         * @return {?}
         */
        DateWrapper.now = function () { return new Date(); };
        /**
         * @param {?} date
         * @return {?}
         */
        DateWrapper.toJson = function (date) { return date.toJSON(); };
        return DateWrapper;
    }());
    /**
     * @param {?} global
     * @param {?} path
     * @param {?} value
     * @return {?}
     */
    function setValueOnPath(global, path, value) {
        var /** @type {?} */ parts = path.split('.');
        var /** @type {?} */ obj = global;
        while (parts.length > 1) {
            var /** @type {?} */ name = parts.shift();
            if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
                obj = obj[name];
            }
            else {
                obj = obj[name] = {};
            }
        }
        if (obj === undefined || obj === null) {
            obj = {};
        }
        obj[parts.shift()] = value;
    }
    goog.module('_angular$platform_browser$core__private');
    var /** @type {?} */ wtfInit = _angular_core.__core_private__.wtfInit;
    var /** @type {?} */ DebugDomRootRenderer = _angular_core.__core_private__.DebugDomRootRenderer;
    var /** @type {?} */ SecurityContext = _angular_core.__core_private__.SecurityContext;
    var /** @type {?} */ SanitizationService = _angular_core.__core_private__.SanitizationService;
    goog.module('_angular$platform_browser$src$dom$dom__adapter');
    var /** @type {?} */ _DOM = null;
    /**
     * @return {?}
     */
    function getDOM() {
        return _DOM;
    }
    /**
     * @param {?} adapter
     * @return {?}
     */
    function setRootDomAdapter(adapter) {
        if (isBlank(_DOM)) {
            _DOM = adapter;
        }
    }
    /* tslint:disable:requireParameterType */
    /**
     * Provides DOM operations in an environment-agnostic way.
     */
    var DomAdapter = (function () {
        function DomAdapter() {
            this.xhrType = null;
        }
        /**
         * @deprecated
         * @return {?}
         */
        DomAdapter.prototype.getXHR = function () { return this.xhrType; };
        Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
            /**
             * Maps attribute names to their corresponding property names for cases
             * where attribute name doesn't match property name.
             */
            get: function () { return this._attrToPropMap; },
            set: function (value) { this._attrToPropMap = value; },
            enumerable: true,
            configurable: true
        });
        ;
        ;
        DomAdapter._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            DomAdapter.prototype.xhrType;
            /** @internal
            @type {?} */
            DomAdapter.prototype._attrToPropMap;
        };
        return DomAdapter;
    }());
    goog.module('_angular$platform_browser$src$security$url__sanitizer'); /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * This regular expression matches a subset of URLs that will not cause script
     * execution if used in URL context within a HTML document. Specifically, this
     * regular expression matches if (comment from here on and regex copied from
     * Soy's EscapingConventions):
     * (1) Either a protocol in a whitelist (http, https, mailto or ftp).
     * (2) or no protocol.  A protocol must be followed by a colon. The below
     *     allows that by allowing colons only after one of the characters [/?#].
     *     A colon after a hash (#) must be in the fragment.
     *     Otherwise, a colon after a (?) must be in a query.
     *     Otherwise, a colon after a single solidus (/) must be in a path.
     *     Otherwise, a colon after a double solidus (//) must be in the authority
     *     (before port).
     *
     * The pattern disallows &, used in HTML entity declarations before
     * one of the characters in [/?#]. This disallows HTML entities used in the
     * protocol name, which should never happen, e.g. "h&#116;tp" for "http".
     * It also disallows HTML entities in the first path part of a relative path,
     * e.g. "foo&lt;bar/baz".  Our existing escaping functions should not produce
     * that. More importantly, it disallows masking of a colon,
     * e.g. "javascript&#58;...".
     *
     * This regular expression was taken from the Closure sanitization library.
     */
    var /** @type {?} */ SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    /**
     * @param {?} url
     * @return {?}
     */
    function sanitizeUrl(url) {
        if (String(url).match(SAFE_URL_PATTERN))
            return url;
        return 'unsafe:' + url;
    }
    goog.module('_angular$platform_browser$src$security$html__sanitizer'); /** A <body> element that can be safely used to parse untrusted HTML. Lazily initialized below. */
    var /** @type {?} */ inertElement = null;
    /** Lazily initialized to make sure the DOM adapter gets set before use. */
    var /** @type {?} */ DOM = null;
    /**
     *  Returns an HTML element that is guaranteed to not execute code when creating elements in it.
     * @return {?}
     */
    function getInertElement() {
        if (inertElement)
            return inertElement;
        DOM = getDOM();
        // Prefer using <template> element if supported.
        var /** @type {?} */ templateEl = DOM.createElement('template');
        if ('content' in templateEl)
            return templateEl;
        var /** @type {?} */ doc = DOM.createHtmlDocument();
        inertElement = DOM.querySelector(doc, 'body');
        if (inertElement == null) {
            // usually there should be only one body element in the document, but IE doesn't have any, so we
            // need to create one.
            var /** @type {?} */ html = DOM.createElement('html', doc);
            inertElement = DOM.createElement('body', doc);
            DOM.appendChild(html, inertElement);
            DOM.appendChild(doc, html);
        }
        return inertElement;
    }
    /**
     * @param {?} tags
     * @return {?}
     */
    function tagSet(tags) {
        var /** @type {?} */ res = {};
        for (var _i = 0, _a = tags.split(','); _i < _a.length; _i++) {
            var t = _a[_i];
            res[t.toLowerCase()] = true;
        }
        return res;
    }
    /**
     * @param {...?} sets
     * @return {?}
     */
    function merge() {
        var sets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sets[_i - 0] = arguments[_i];
        }
        var /** @type {?} */ res = {};
        for (var _a = 0, sets_1 = sets; _a < sets_1.length; _a++) {
            var s = sets_1[_a];
            for (var v in s) {
                if (s.hasOwnProperty(v))
                    res[v] = true;
            }
        }
        return res;
    }
    // Good source of info about elements and attributes
    // http://dev.w3.org/html5/spec/Overview.html#semantics
    // http://simon.html5.org/html-elements
    // Safe Void Elements - HTML5
    // http://dev.w3.org/html5/spec/Overview.html#void-elements
    var /** @type {?} */ VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
    // Elements that you can, intentionally, leave open (and which close themselves)
    // http://dev.w3.org/html5/spec/Overview.html#optional-tags
    var /** @type {?} */ OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
    var /** @type {?} */ OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
    var /** @type {?} */ OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
    // Safe Block Elements - HTML5
    var /** @type {?} */ BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' +
        'aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
        'h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul'));
    // Inline Elements - HTML5
    var /** @type {?} */ INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,b,' +
        'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,' +
        'samp,small,span,strike,strong,sub,sup,time,tt,u,var'));
    var /** @type {?} */ VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
    // Attributes that have href and hence need to be sanitized
    var /** @type {?} */ URI_ATTRS = tagSet('background,cite,href,longdesc,src,xlink:href');
    var /** @type {?} */ HTML_ATTRS = tagSet('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
        'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
        'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
        'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
        'valign,value,vspace,width');
    // NB: This currently conciously doesn't support SVG. SVG sanitization has had several security
    // issues in the past, so it seems safer to leave it out if possible. If support for binding SVG via
    // innerHTML is required, SVG attributes should be added here.
    // NB: Sanitization does not allow <form> elements or other active elements (<button> etc). Those
    // can be sanitized, but they increase security surface area without a legitimate use case, so they
    // are left out here.
    var /** @type {?} */ VALID_ATTRS = merge(URI_ATTRS, HTML_ATTRS);
    /**
     * SanitizingHtmlSerializer serializes a DOM fragment, stripping out any unsafe elements and unsafe
     * attributes.
     */
    var SanitizingHtmlSerializer = (function () {
        function SanitizingHtmlSerializer() {
            this.buf = [];
        }
        /**
         * @param {?} el
         * @return {?}
         */
        SanitizingHtmlSerializer.prototype.sanitizeChildren = function (el) {
            // This cannot use a TreeWalker, as it has to run on Angular's various DOM adapters.
            // However this code never accesses properties off of `document` before deleting its contents
            // again, so it shouldn't be vulnerable to DOM clobbering.
            var /** @type {?} */ current = el.firstChild;
            while (current) {
                if (DOM.isElementNode(current)) {
                    this.startElement(current);
                }
                else if (DOM.isTextNode(current)) {
                    this.chars(DOM.nodeValue(current));
                }
                if (DOM.firstChild(current)) {
                    current = DOM.firstChild(current);
                    continue;
                }
                while (current) {
                    // Leaving the element. Walk up and to the right, closing tags as we go.
                    if (DOM.isElementNode(current)) {
                        this.endElement(DOM.nodeName(current).toLowerCase());
                    }
                    if (DOM.nextSibling(current)) {
                        current = DOM.nextSibling(current);
                        break;
                    }
                    current = DOM.parentElement(current);
                }
            }
            return this.buf.join('');
        };
        /**
         * @param {?} element
         * @return {?}
         */
        SanitizingHtmlSerializer.prototype.startElement = function (element) {
            var _this = this;
            var /** @type {?} */ tagName = DOM.nodeName(element).toLowerCase();
            tagName = tagName.toLowerCase();
            if (VALID_ELEMENTS.hasOwnProperty(tagName)) {
                this.buf.push('<');
                this.buf.push(tagName);
                DOM.attributeMap(element).forEach(function (value, attrName) {
                    var /** @type {?} */ lower = attrName.toLowerCase();
                    if (!VALID_ATTRS.hasOwnProperty(lower))
                        return;
                    // TODO(martinprobst): Special case image URIs for data:image/...
                    if (URI_ATTRS[lower])
                        value = sanitizeUrl(value);
                    _this.buf.push(' ');
                    _this.buf.push(attrName);
                    _this.buf.push('="');
                    _this.buf.push(encodeEntities(value));
                    _this.buf.push('"');
                });
                this.buf.push('>');
            }
        };
        /**
         * @param {?} tagName
         * @return {?}
         */
        SanitizingHtmlSerializer.prototype.endElement = function (tagName) {
            tagName = tagName.toLowerCase();
            if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
                this.buf.push('</');
                this.buf.push(tagName);
                this.buf.push('>');
            }
        };
        /**
         * @param {?} chars
         * @return {?}
         */
        SanitizingHtmlSerializer.prototype.chars = function (chars) { this.buf.push(encodeEntities(chars)); };
        SanitizingHtmlSerializer._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            SanitizingHtmlSerializer.prototype.buf;
        };
        return SanitizingHtmlSerializer;
    }());
    // Regular Expressions for parsing tags and attributes
    var /** @type {?} */ SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    // ! to ~ is the ASCII range.
    var /** @type {?} */ NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
    /**
     *  Escapes all potentially dangerous characters, so that the resulting string can be safely inserted into attribute or element text.
     * @returns {string} escaped text
     * @param {?} value
     * @return {?}
     */
    function encodeEntities(value) {
        return value.replace(/&/g, '&amp;')
            .replace(SURROGATE_PAIR_REGEXP, function (match) {
            var /** @type {?} */ hi = match.charCodeAt(0);
            var /** @type {?} */ low = match.charCodeAt(1);
            return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
        })
            .replace(NON_ALPHANUMERIC_REGEXP, function (match) { return '&#' + match.charCodeAt(0) + ';'; })
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    /**
     *  When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). * This is undesirable since we don't want to allow any of these custom attributes. This method strips them all.
     * @param {?} el
     * @return {?}
     */
    function stripCustomNsAttrs(el) {
        DOM.attributeMap(el).forEach(function (_, attrName) {
            if (attrName === 'xmlns:ns1' || attrName.indexOf('ns1:') === 0) {
                DOM.removeAttribute(el, attrName);
            }
        });
        for (var _i = 0, _a = DOM.childNodesAsList(el); _i < _a.length; _i++) {
            var n = _a[_i];
            if (DOM.isElementNode(n))
                stripCustomNsAttrs(n);
        }
    }
    /**
     *  Sanitizes the given unsafe, untrusted HTML fragment, and returns HTML text that is safe to add to the DOM in a browser environment.
     * @param {?} unsafeHtml
     * @return {?}
     */
    function sanitizeHtml(unsafeHtml) {
        try {
            var /** @type {?} */ containerEl = getInertElement();
            // Make sure unsafeHtml is actually a string (TypeScript types are not enforced at runtime).
            unsafeHtml = unsafeHtml ? String(unsafeHtml) : '';
            // mXSS protection. Repeatedly parse the document to make sure it stabilizes, so that a browser
            // trying to auto-correct incorrect HTML cannot cause formerly inert HTML to become dangerous.
            var /** @type {?} */ mXSSAttempts = 5;
            var /** @type {?} */ parsedHtml = unsafeHtml;
            do {
                if (mXSSAttempts === 0) {
                    throw new Error('Failed to sanitize html because the input is unstable');
                }
                mXSSAttempts--;
                unsafeHtml = parsedHtml;
                DOM.setInnerHTML(containerEl, unsafeHtml);
                if (DOM.defaultDoc().documentMode) {
                    // strip custom-namespaced attributes on IE<=11
                    stripCustomNsAttrs(containerEl);
                }
                parsedHtml = DOM.getInnerHTML(containerEl);
            } while (unsafeHtml !== parsedHtml);
            var /** @type {?} */ sanitizer = new SanitizingHtmlSerializer();
            var /** @type {?} */ safeHtml = sanitizer.sanitizeChildren(DOM.getTemplateContent(containerEl) || containerEl);
            // Clear out the body element.
            var /** @type {?} */ parent_1 = DOM.getTemplateContent(containerEl) || containerEl;
            for (var _i = 0, _a = DOM.childNodesAsList(parent_1); _i < _a.length; _i++) {
                var child = _a[_i];
                DOM.removeChild(parent_1, child);
            }
            if (assertionsEnabled() && safeHtml !== unsafeHtml) {
                DOM.log('WARNING: some HTML contents were removed during sanitization.');
            }
            return safeHtml;
        }
        catch (e) {
            // In case anything goes wrong, clear out inertElement to reset the entire DOM structure.
            inertElement = null;
            throw e;
        }
    }
    goog.module('_angular$platform_browser$src$security$style__sanitizer'); /**
     * Regular expression for safe style values.
     *
     * Quotes (" and ') are allowed, but a check must be done elsewhere to ensure
     * they're balanced.
     *
     * ',' allows multiple values to be assigned to the same property
     * (e.g. background-attachment or font-family) and hence could allow
     * multiple values to get injected, but that should pose no risk of XSS.
     *
     * The rgb() and rgba() expression checks only for XSS safety, not for CSS
     * validity.
     *
     * This regular expression was taken from the Closure sanitization library.
     */
    var /** @type {?} */ SAFE_STYLE_VALUE = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
    /**
     *  Checks that quotes (" and ') are properly balanced inside a string. Assumes that neither escape (\) nor any other character that could result in breaking out of a string parsing context are allowed; see http://www.w3.org/TR/css3-syntax/#string-token-diagram. * This code was taken from the Closure sanitization library.
     * @param {?} value
     * @return {?}
     */
    function hasBalancedQuotes(value) {
        var /** @type {?} */ outsideSingle = true;
        var /** @type {?} */ outsideDouble = true;
        for (var /** @type {?} */ i = 0; i < value.length; i++) {
            var /** @type {?} */ c = value.charAt(i);
            if (c === '\'' && outsideDouble) {
                outsideSingle = !outsideSingle;
            }
            else if (c === '"' && outsideSingle) {
                outsideDouble = !outsideDouble;
            }
        }
        return outsideSingle && outsideDouble;
    }
    /**
     *  Sanitizes the given untrusted CSS style property value (i.e. not an entire object, just a single value) and returns a value that is safe to use in a browser environment.
     * @param {?} value
     * @return {?}
     */
    function sanitizeStyle(value) {
        value = String(value); // Make sure it's actually a string.
        if (value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value))
            return value;
        return 'unsafe';
    }
    goog.module('_angular$platform_browser$src$security$dom__sanitization__service'); /**
     * DomSanitizationService helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
     * values to be safe to use in the different DOM contexts.
     *
     * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
     * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
     * the website.
     *
     * In specific situations, it might be necessary to disable sanitization, for example if the
     * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
     * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
     * methods, and then binding to that value from the template.
     *
     * These situations should be very rare, and extraordinary care must be taken to avoid creating a
     * Cross Site Scripting (XSS) security bug!
     *
     * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
     * close as possible to the source of the value, to make it easy to verify no security bug is
     * created by its use.
     *
     * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
     * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
     * code. The sanitizer leaves safe values intact.
     */
    var DomSanitizationService = (function () {
        function DomSanitizationService() {
        }
        return DomSanitizationService;
    }());
    var DomSanitizationServiceImpl = (function (_super) {
        __extends(DomSanitizationServiceImpl, _super);
        function DomSanitizationServiceImpl() {
            _super.apply(this, arguments);
        }
        /**
         * @param {?} ctx
         * @param {?} value
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.sanitize = function (ctx, value) {
            if (value == null)
                return null;
            switch (ctx) {
                case SecurityContext.NONE:
                    return value;
                case SecurityContext.HTML:
                    if (value instanceof SafeHtmlImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'HTML');
                    return sanitizeHtml(String(value));
                case SecurityContext.STYLE:
                    if (value instanceof SafeStyleImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'Style');
                    return sanitizeStyle(value);
                case SecurityContext.SCRIPT:
                    if (value instanceof SafeScriptImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'Script');
                    throw new Error('unsafe value used in a script context');
                case SecurityContext.URL:
                    if (value instanceof SafeUrlImpl)
                        return value.changingThisBreaksApplicationSecurity;
                    this.checkNotSafeValue(value, 'URL');
                    return sanitizeUrl(String(value));
                case SecurityContext.RESOURCE_URL:
                    if (value instanceof SafeResourceUrlImpl) {
                        return value.changingThisBreaksApplicationSecurity;
                    }
                    this.checkNotSafeValue(value, 'ResourceURL');
                    throw new Error('unsafe value used in a resource URL context');
                default:
                    throw new Error("Unexpected SecurityContext " + ctx);
            }
        };
        /**
         * @param {?} value
         * @param {?} expectedType
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.checkNotSafeValue = function (value, expectedType) {
            if (value instanceof SafeValueImpl) {
                throw new Error('Required a safe ' + expectedType + ', got a ' + value.getTypeName());
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.bypassSecurityTrustHtml = function (value) { return new SafeHtmlImpl(value); };
        /**
         * @param {?} value
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.bypassSecurityTrustStyle = function (value) { return new SafeStyleImpl(value); };
        /**
         * @param {?} value
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.bypassSecurityTrustScript = function (value) { return new SafeScriptImpl(value); };
        /**
         * @param {?} value
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.bypassSecurityTrustUrl = function (value) { return new SafeUrlImpl(value); };
        /**
         * @param {?} value
         * @return {?}
         */
        DomSanitizationServiceImpl.prototype.bypassSecurityTrustResourceUrl = function (value) {
            return new SafeResourceUrlImpl(value);
        };
        return DomSanitizationServiceImpl;
    }(DomSanitizationService));
    DomSanitizationServiceImpl.decorators = [
        { type: _angular_core.Injectable },
    ];
    var SafeValueImpl = (function () {
        /**
         * @param {?} changingThisBreaksApplicationSecurity
         */
        function SafeValueImpl(changingThisBreaksApplicationSecurity) {
            this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
            // empty
        }
        SafeValueImpl._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            SafeValueImpl.prototype.changingThisBreaksApplicationSecurity;
        };
        return SafeValueImpl;
    }());
    var SafeHtmlImpl = (function (_super) {
        __extends(SafeHtmlImpl, _super);
        function SafeHtmlImpl() {
            _super.apply(this, arguments);
        }
        /**
         * @return {?}
         */
        SafeHtmlImpl.prototype.getTypeName = function () { return 'HTML'; };
        return SafeHtmlImpl;
    }(SafeValueImpl));
    var SafeStyleImpl = (function (_super) {
        __extends(SafeStyleImpl, _super);
        function SafeStyleImpl() {
            _super.apply(this, arguments);
        }
        /**
         * @return {?}
         */
        SafeStyleImpl.prototype.getTypeName = function () { return 'Style'; };
        return SafeStyleImpl;
    }(SafeValueImpl));
    var SafeScriptImpl = (function (_super) {
        __extends(SafeScriptImpl, _super);
        function SafeScriptImpl() {
            _super.apply(this, arguments);
        }
        /**
         * @return {?}
         */
        SafeScriptImpl.prototype.getTypeName = function () { return 'Script'; };
        return SafeScriptImpl;
    }(SafeValueImpl));
    var SafeUrlImpl = (function (_super) {
        __extends(SafeUrlImpl, _super);
        function SafeUrlImpl() {
            _super.apply(this, arguments);
        }
        /**
         * @return {?}
         */
        SafeUrlImpl.prototype.getTypeName = function () { return 'URL'; };
        return SafeUrlImpl;
    }(SafeValueImpl));
    var SafeResourceUrlImpl = (function (_super) {
        __extends(SafeResourceUrlImpl, _super);
        function SafeResourceUrlImpl() {
            _super.apply(this, arguments);
        }
        /**
         * @return {?}
         */
        SafeResourceUrlImpl.prototype.getTypeName = function () { return 'ResourceURL'; };
        return SafeResourceUrlImpl;
    }(SafeValueImpl));
    goog.module('_angular$platform_browser$src$facade$collection');
    var /** @type {?} */ Map$1 = global$1.Map;
    var /** @type {?} */ Set$1 = global$1.Set;
    // Safari and Internet Explorer do not support the iterable parameter to the
    // Map constructor.  We work around that by manually adding the items.
    var /** @type {?} */ createMapFromPairs = (function () {
        try {
            if (new Map$1(/** @type {?} */ ([[1, 2]])).size === 1) {
                return function createMapFromPairs(pairs) { return new Map$1(pairs); };
            }
        }
        catch (e) {
        }
        return function createMapAndPopulateFromPairs(pairs) {
            var /** @type {?} */ map = new Map$1();
            for (var /** @type {?} */ i = 0; i < pairs.length; i++) {
                var /** @type {?} */ pair = pairs[i];
                map.set(pair[0], pair[1]);
            }
            return map;
        };
    })();
    var /** @type {?} */ createMapFromMap = (function () {
        try {
            if (new Map$1(/** @type {?} */ ((new Map$1())))) {
                return function createMapFromMap(m) { return new Map$1(/** @type {?} */ (m)); };
            }
        }
        catch (e) {
        }
        return function createMapAndPopulateFromMap(m) {
            var /** @type {?} */ map = new Map$1();
            m.forEach(function (v, k) { map.set(k, v); });
            return map;
        };
    })();
    var /** @type {?} */ _clearValues = (function () {
        if ((((new Map$1()).keys())).next) {
            return function _clearValues(m) {
                var /** @type {?} */ keyIterator = m.keys();
                var /** @type {?} */ k;
                while (!((k = ((keyIterator)).next()).done)) {
                    m.set(k.value, null);
                }
            };
        }
        else {
            return function _clearValuesWithForeEach(m) {
                m.forEach(function (v, k) { m.set(k, null); });
            };
        }
    })();
    // Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
    // TODO(mlaval): remove the work around once we have a working polyfill of Array.from
    var /** @type {?} */ _arrayFromMap = (function () {
        try {
            if ((((new Map$1()).values())).next) {
                return function createArrayFromMap(m, getValues) {
                    return getValues ? ((Array)).from(m.values()) : ((Array)).from(m.keys());
                };
            }
        }
        catch (e) {
        }
        return function createArrayFromMapWithForeach(m, getValues) {
            var /** @type {?} */ res = ListWrapper.createFixedSize(m.size), /** @type {?} */ i = 0;
            m.forEach(function (v, k) {
                res[i] = getValues ? v : k;
                i++;
            });
            return res;
        };
    })();
    /**
     * Wraps Javascript Objects
     */
    var StringMapWrapper = (function () {
        function StringMapWrapper() {
        }
        /**
         * @return {?}
         */
        StringMapWrapper.create = function () {
            // Note: We are not using Object.create(null) here due to
            // performance!
            // http://jsperf.com/ng2-object-create-null
            return {};
        };
        /**
         * @param {?} map
         * @param {?} key
         * @return {?}
         */
        StringMapWrapper.contains = function (map, key) {
            return map.hasOwnProperty(key);
        };
        /**
         * @param {?} map
         * @param {?} key
         * @return {?}
         */
        StringMapWrapper.get = function (map, key) {
            return map.hasOwnProperty(key) ? map[key] : undefined;
        };
        /**
         * @param {?} map
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        StringMapWrapper.set = function (map, key, value) { map[key] = value; };
        /**
         * @param {?} map
         * @return {?}
         */
        StringMapWrapper.keys = function (map) { return Object.keys(map); };
        /**
         * @param {?} map
         * @return {?}
         */
        StringMapWrapper.values = function (map) {
            return Object.keys(map).reduce(function (r, a) {
                r.push(map[a]);
                return r;
            }, []);
        };
        /**
         * @param {?} map
         * @return {?}
         */
        StringMapWrapper.isEmpty = function (map) {
            for (var prop in map) {
                return false;
            }
            return true;
        };
        /**
         * @param {?} map
         * @param {?} key
         * @return {?}
         */
        StringMapWrapper.delete = function (map, key) { delete map[key]; };
        /**
         * @param {?} map
         * @param {?} callback
         * @return {?}
         */
        StringMapWrapper.forEach = function (map, callback) {
            for (var prop in map) {
                if (map.hasOwnProperty(prop)) {
                    callback(map[prop], prop);
                }
            }
        };
        /**
         * @param {?} m1
         * @param {?} m2
         * @return {?}
         */
        StringMapWrapper.merge = function (m1, m2) {
            var /** @type {?} */ m = {};
            for (var attr in m1) {
                if (m1.hasOwnProperty(attr)) {
                    m[attr] = m1[attr];
                }
            }
            for (var attr in m2) {
                if (m2.hasOwnProperty(attr)) {
                    m[attr] = m2[attr];
                }
            }
            return m;
        };
        /**
         * @param {?} m1
         * @param {?} m2
         * @return {?}
         */
        StringMapWrapper.equals = function (m1, m2) {
            var /** @type {?} */ k1 = Object.keys(m1);
            var /** @type {?} */ k2 = Object.keys(m2);
            if (k1.length != k2.length) {
                return false;
            }
            var /** @type {?} */ key;
            for (var /** @type {?} */ i = 0; i < k1.length; i++) {
                key = k1[i];
                if (m1[key] !== m2[key]) {
                    return false;
                }
            }
            return true;
        };
        return StringMapWrapper;
    }());
    var ListWrapper = (function () {
        function ListWrapper() {
        }
        /**
         * @param {?} size
         * @return {?}
         */
        ListWrapper.createFixedSize = function (size) { return new Array(size); };
        /**
         * @param {?} size
         * @return {?}
         */
        ListWrapper.createGrowableSize = function (size) { return new Array(size); };
        /**
         * @param {?} array
         * @return {?}
         */
        ListWrapper.clone = function (array) { return array.slice(0); };
        /**
         * @param {?} array
         * @param {?} fn
         * @return {?}
         */
        ListWrapper.forEachWithIndex = function (array, fn) {
            for (var /** @type {?} */ i = 0; i < array.length; i++) {
                fn(array[i], i);
            }
        };
        /**
         * @param {?} array
         * @return {?}
         */
        ListWrapper.first = function (array) {
            if (!array)
                return null;
            return array[0];
        };
        /**
         * @param {?} array
         * @return {?}
         */
        ListWrapper.last = function (array) {
            if (!array || array.length == 0)
                return null;
            return array[array.length - 1];
        };
        /**
         * @param {?} array
         * @param {?} value
         * @param {?=} startIndex
         * @return {?}
         */
        ListWrapper.indexOf = function (array, value, startIndex) {
            if (startIndex === void 0) { startIndex = 0; }
            return array.indexOf(value, startIndex);
        };
        /**
         * @param {?} list
         * @param {?} el
         * @return {?}
         */
        ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
        /**
         * @param {?} array
         * @return {?}
         */
        ListWrapper.reversed = function (array) {
            var /** @type {?} */ a = ListWrapper.clone(array);
            return a.reverse();
        };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        ListWrapper.concat = function (a, b) { return a.concat(b); };
        /**
         * @param {?} list
         * @param {?} index
         * @param {?} value
         * @return {?}
         */
        ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
        /**
         * @param {?} list
         * @param {?} index
         * @return {?}
         */
        ListWrapper.removeAt = function (list, index) {
            var /** @type {?} */ res = list[index];
            list.splice(index, 1);
            return res;
        };
        /**
         * @param {?} list
         * @param {?} items
         * @return {?}
         */
        ListWrapper.removeAll = function (list, items) {
            for (var /** @type {?} */ i = 0; i < items.length; ++i) {
                var /** @type {?} */ index = list.indexOf(items[i]);
                list.splice(index, 1);
            }
        };
        /**
         * @param {?} list
         * @param {?} el
         * @return {?}
         */
        ListWrapper.remove = function (list, el) {
            var /** @type {?} */ index = list.indexOf(el);
            if (index > -1) {
                list.splice(index, 1);
                return true;
            }
            return false;
        };
        /**
         * @param {?} list
         * @return {?}
         */
        ListWrapper.clear = function (list) { list.length = 0; };
        /**
         * @param {?} list
         * @return {?}
         */
        ListWrapper.isEmpty = function (list) { return list.length == 0; };
        /**
         * @param {?} list
         * @param {?} value
         * @param {?=} start
         * @param {?=} end
         * @return {?}
         */
        ListWrapper.fill = function (list, value, start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = null; }
            list.fill(value, start, end === null ? list.length : end);
        };
        /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        ListWrapper.equals = function (a, b) {
            if (a.length != b.length)
                return false;
            for (var /** @type {?} */ i = 0; i < a.length; ++i) {
                if (a[i] !== b[i])
                    return false;
            }
            return true;
        };
        /**
         * @param {?} l
         * @param {?=} from
         * @param {?=} to
         * @return {?}
         */
        ListWrapper.slice = function (l, from, to) {
            if (from === void 0) { from = 0; }
            if (to === void 0) { to = null; }
            return l.slice(from, to === null ? undefined : to);
        };
        /**
         * @param {?} l
         * @param {?} from
         * @param {?} length
         * @return {?}
         */
        ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
        /**
         * @param {?} l
         * @param {?=} compareFn
         * @return {?}
         */
        ListWrapper.sort = function (l, compareFn) {
            if (isPresent(compareFn)) {
                l.sort(compareFn);
            }
            else {
                l.sort();
            }
        };
        /**
         * @param {?} l
         * @return {?}
         */
        ListWrapper.toString = function (l) { return l.toString(); };
        /**
         * @param {?} l
         * @return {?}
         */
        ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
        /**
         * @param {?} list
         * @param {?} predicate
         * @return {?}
         */
        ListWrapper.maximum = function (list, predicate) {
            if (list.length == 0) {
                return null;
            }
            var /** @type {?} */ solution = null;
            var /** @type {?} */ maxValue = -Infinity;
            for (var /** @type {?} */ index = 0; index < list.length; index++) {
                var /** @type {?} */ candidate = list[index];
                if (isBlank(candidate)) {
                    continue;
                }
                var /** @type {?} */ candidateValue = predicate(candidate);
                if (candidateValue > maxValue) {
                    solution = candidate;
                    maxValue = candidateValue;
                }
            }
            return solution;
        };
        /**
         * @param {?} list
         * @return {?}
         */
        ListWrapper.flatten = function (list) {
            var /** @type {?} */ target = [];
            _flattenArray(list, target);
            return target;
        };
        /**
         * @param {?} list
         * @param {?} source
         * @return {?}
         */
        ListWrapper.addAll = function (list, source) {
            for (var /** @type {?} */ i = 0; i < source.length; i++) {
                list.push(source[i]);
            }
        };
        return ListWrapper;
    }());
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    function _flattenArray(source, target) {
        if (isPresent(source)) {
            for (var /** @type {?} */ i = 0; i < source.length; i++) {
                var /** @type {?} */ item = source[i];
                if (isArray(item)) {
                    _flattenArray(item, target);
                }
                else {
                    target.push(item);
                }
            }
        }
        return target;
    }
    // Safari and Internet Explorer do not support the iterable parameter to the
    // Set constructor.  We work around that by manually adding the items.
    var /** @type {?} */ createSetFromList = (function () {
        var /** @type {?} */ test = new Set$1([1, 2, 3]);
        if (test.size === 3) {
            return function createSetFromList(lst) { return new Set$1(lst); };
        }
        else {
            return function createSetAndPopulateFromList(lst) {
                var /** @type {?} */ res = new Set$1(lst);
                if (res.size !== lst.length) {
                    for (var /** @type {?} */ i = 0; i < lst.length; i++) {
                        res.add(lst[i]);
                    }
                }
                return res;
            };
        }
    })();
    var SetWrapper = (function () {
        function SetWrapper() {
        }
        /**
         * @param {?} lst
         * @return {?}
         */
        SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
        /**
         * @param {?} s
         * @param {?} key
         * @return {?}
         */
        SetWrapper.has = function (s, key) { return s.has(key); };
        /**
         * @param {?} m
         * @param {?} k
         * @return {?}
         */
        SetWrapper.delete = function (m, k) { m.delete(k); };
        return SetWrapper;
    }());
    goog.module('_angular$platform_browser$src$browser$generic__browser__adapter'); /**
     * Provides DOM operations in any browser environment.
     */
    var GenericBrowserDomAdapter = (function (_super) {
        __extends(GenericBrowserDomAdapter, _super);
        /**
         */
        function GenericBrowserDomAdapter() {
            var _this = this;
            _super.call(this);
            this._animationPrefix = null;
            this._transitionEnd = null;
            try {
                var element = this.createElement('div', this.defaultDoc());
                if (isPresent(this.getStyle(element, 'animationName'))) {
                    this._animationPrefix = '';
                }
                else {
                    var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                    for (var i = 0; i < domPrefixes.length; i++) {
                        if (isPresent(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                            this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                            break;
                        }
                    }
                }
                var transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                };
                StringMapWrapper.forEach(transEndEventNames, function (value, key) {
                    if (isPresent(_this.getStyle(element, key))) {
                        _this._transitionEnd = value;
                    }
                });
            }
            catch (e) {
                this._animationPrefix = null;
                this._transitionEnd = null;
            }
        }
        /**
         * @param {?} el
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return ((el)).getDistributedNodes(); };
        /**
         * @param {?} el
         * @param {?} baseUrl
         * @param {?} href
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
            el.href = href == null ? baseUrl : baseUrl + '/../' + href;
        };
        /**
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
        /**
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () {
            return isFunction(((this.defaultDoc().body)).createShadowRoot);
        };
        /**
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.getAnimationPrefix = function () {
            return isPresent(this._animationPrefix) ? this._animationPrefix : "";
        };
        /**
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.getTransitionEnd = function () { return isPresent(this._transitionEnd) ? this._transitionEnd : ""; };
        /**
         * @return {?}
         */
        GenericBrowserDomAdapter.prototype.supportsAnimation = function () {
            return isPresent(this._animationPrefix) && isPresent(this._transitionEnd);
        };
        GenericBrowserDomAdapter._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            GenericBrowserDomAdapter.prototype._animationPrefix;
            /** @type {?} */
            GenericBrowserDomAdapter.prototype._transitionEnd;
        };
        return GenericBrowserDomAdapter;
    }(DomAdapter));
    goog.module('_angular$platform_browser$src$browser$browser__adapter');
    var /** @type {?} */ _attrToPropMap = {
        'class': 'className',
        'innerHtml': 'innerHTML',
        'readonly': 'readOnly',
        'tabindex': 'tabIndex'
    };
    var /** @type {?} */ DOM_KEY_LOCATION_NUMPAD = 3;
    // Map to convert some key or keyIdentifier values to what will be returned by getEventKey
    var /** @type {?} */ _keyMap = {
        // The following values are here for cross-browser compatibility and to match the W3C standard
        // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
        '\b': 'Backspace',
        '\t': 'Tab',
        '\x7F': 'Delete',
        '\x1B': 'Escape',
        'Del': 'Delete',
        'Esc': 'Escape',
        'Left': 'ArrowLeft',
        'Right': 'ArrowRight',
        'Up': 'ArrowUp',
        'Down': 'ArrowDown',
        'Menu': 'ContextMenu',
        'Scroll': 'ScrollLock',
        'Win': 'OS'
    };
    // There is a bug in Chrome for numeric keypad keys:
    // https://code.google.com/p/chromium/issues/detail?id=155654
    // 1, 2, 3 ... are reported as A, B, C ...
    var /** @type {?} */ _chromeNumKeyPadMap = {
        'A': '1',
        'B': '2',
        'C': '3',
        'D': '4',
        'E': '5',
        'F': '6',
        'G': '7',
        'H': '8',
        'I': '9',
        'J': '*',
        'K': '+',
        'M': '-',
        'N': '.',
        'O': '/',
        '\x60': '0',
        '\x90': 'NumLock'
    };
    /**
     * A `DomAdapter` powered by full browser DOM APIs.
     */
    /* tslint:disable:requireParameterType */
    var BrowserDomAdapter = (function (_super) {
        __extends(BrowserDomAdapter, _super);
        function BrowserDomAdapter() {
            _super.apply(this, arguments);
        }
        /**
         * @param {?} templateHtml
         * @return {?}
         */
        BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error("parse not implemented"); };
        /**
         * @return {?}
         */
        BrowserDomAdapter.makeCurrent = function () { setRootDomAdapter(new BrowserDomAdapter()); };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.hasProperty = function (element, name) { return name in element; };
        /**
         * @param {?} el
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
        /**
         * @param {?} el
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
        /**
         * @param {?} el
         * @param {?} methodName
         * @param {?} args
         * @return {?}
         */
        BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
            el[methodName].apply(el, args);
        };
        /**
         * @param {?} error
         * @return {?}
         */
        BrowserDomAdapter.prototype.logError = function (error) {
            if (window.console.error) {
                window.console.error(error);
            }
            else {
                window.console.log(error);
            }
        };
        /**
         * @param {?} error
         * @return {?}
         */
        BrowserDomAdapter.prototype.log = function (error) { window.console.log(error); };
        /**
         * @param {?} error
         * @return {?}
         */
        BrowserDomAdapter.prototype.logGroup = function (error) {
            if (window.console.group) {
                window.console.group(error);
                this.logError(error);
            }
            else {
                window.console.log(error);
            }
        };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.logGroupEnd = function () {
            if (window.console.groupEnd) {
                window.console.groupEnd();
            }
        };
        Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
            get: function () { return _attrToPropMap; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} selector
         * @return {?}
         */
        BrowserDomAdapter.prototype.query = function (selector) { return document.querySelector(selector); };
        /**
         * @param {?} el
         * @param {?} selector
         * @return {?}
         */
        BrowserDomAdapter.prototype.querySelector = function (el, selector) { return el.querySelector(selector); };
        /**
         * @param {?} el
         * @param {?} selector
         * @return {?}
         */
        BrowserDomAdapter.prototype.querySelectorAll = function (el, selector) { return el.querySelectorAll(selector); };
        /**
         * @param {?} el
         * @param {?} evt
         * @param {?} listener
         * @return {?}
         */
        BrowserDomAdapter.prototype.on = function (el, evt, listener) { el.addEventListener(evt, listener, false); };
        /**
         * @param {?} el
         * @param {?} evt
         * @param {?} listener
         * @return {?}
         */
        BrowserDomAdapter.prototype.onAndCancel = function (el, evt, listener) {
            el.addEventListener(evt, listener, false);
            // Needed to follow Dart's subscription semantic, until fix of
            // https://code.google.com/p/dart/issues/detail?id=17406
            return function () { el.removeEventListener(evt, listener, false); };
        };
        /**
         * @param {?} el
         * @param {?} evt
         * @return {?}
         */
        BrowserDomAdapter.prototype.dispatchEvent = function (el, evt) { el.dispatchEvent(evt); };
        /**
         * @param {?} eventType
         * @return {?}
         */
        BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
            var /** @type {?} */ evt = document.createEvent('MouseEvent');
            evt.initEvent(eventType, true, true);
            return evt;
        };
        /**
         * @param {?} eventType
         * @return {?}
         */
        BrowserDomAdapter.prototype.createEvent = function (eventType) {
            var /** @type {?} */ evt = document.createEvent('Event');
            evt.initEvent(eventType, true, true);
            return evt;
        };
        /**
         * @param {?} evt
         * @return {?}
         */
        BrowserDomAdapter.prototype.preventDefault = function (evt) {
            evt.preventDefault();
            evt.returnValue = false;
        };
        /**
         * @param {?} evt
         * @return {?}
         */
        BrowserDomAdapter.prototype.isPrevented = function (evt) {
            return evt.defaultPrevented || isPresent(evt.returnValue) && !evt.returnValue;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getInnerHTML = function (el) { return el.innerHTML; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getTemplateContent = function (el) {
            return 'content' in el && el instanceof HTMLTemplateElement ? el.content : null;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getOuterHTML = function (el) { return el.outerHTML; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.type = function (node) { return node.type; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.content = function (node) {
            if (this.hasProperty(node, "content")) {
                return ((node)).content;
            }
            else {
                return node;
            }
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.firstChild = function (el) { return el.firstChild; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.nextSibling = function (el) { return el.nextSibling; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.parentElement = function (el) { return el.parentNode; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.childNodes = function (el) { return el.childNodes; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.childNodesAsList = function (el) {
            var /** @type {?} */ childNodes = el.childNodes;
            var /** @type {?} */ res = ListWrapper.createFixedSize(childNodes.length);
            for (var /** @type {?} */ i = 0; i < childNodes.length; i++) {
                res[i] = childNodes[i];
            }
            return res;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.clearNodes = function (el) {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        };
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.appendChild = function (el, node) { el.appendChild(node); };
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.removeChild = function (el, node) { el.removeChild(node); };
        /**
         * @param {?} el
         * @param {?} newChild
         * @param {?} oldChild
         * @return {?}
         */
        BrowserDomAdapter.prototype.replaceChild = function (el, newChild, oldChild) { el.replaceChild(newChild, oldChild); };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.remove = function (node) {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
            return node;
        };
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.insertBefore = function (el, node) { el.parentNode.insertBefore(node, el); };
        /**
         * @param {?} el
         * @param {?} nodes
         * @return {?}
         */
        BrowserDomAdapter.prototype.insertAllBefore = function (el, nodes) { nodes.forEach(function (n) { return el.parentNode.insertBefore(n, el); }); };
        /**
         * @param {?} el
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.insertAfter = function (el, node) { el.parentNode.insertBefore(node, el.nextSibling); };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setInnerHTML = function (el, value) { el.innerHTML = value; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getText = function (el) { return el.textContent; };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setText = function (el, value) { el.textContent = value; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getValue = function (el) { return el.value; };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setValue = function (el, value) { el.value = value; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getChecked = function (el) { return el.checked; };
        /**
         * @param {?} el
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setChecked = function (el, value) { el.checked = value; };
        /**
         * @param {?} text
         * @return {?}
         */
        BrowserDomAdapter.prototype.createComment = function (text) { return document.createComment(text); };
        /**
         * @param {?} html
         * @return {?}
         */
        BrowserDomAdapter.prototype.createTemplate = function (html) {
            var /** @type {?} */ t = document.createElement('template');
            t.innerHTML = html;
            return t;
        };
        /**
         * @param {?} tagName
         * @param {?=} doc
         * @return {?}
         */
        BrowserDomAdapter.prototype.createElement = function (tagName, doc) {
            if (doc === void 0) { doc = document; }
            return doc.createElement(tagName);
        };
        /**
         * @param {?} ns
         * @param {?} tagName
         * @param {?=} doc
         * @return {?}
         */
        BrowserDomAdapter.prototype.createElementNS = function (ns, tagName, doc) {
            if (doc === void 0) { doc = document; }
            return doc.createElementNS(ns, tagName);
        };
        /**
         * @param {?} text
         * @param {?=} doc
         * @return {?}
         */
        BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
            if (doc === void 0) { doc = document; }
            return doc.createTextNode(text);
        };
        /**
         * @param {?} attrName
         * @param {?} attrValue
         * @param {?=} doc
         * @return {?}
         */
        BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
            if (doc === void 0) { doc = document; }
            var /** @type {?} */ el = (doc.createElement('SCRIPT'));
            el.setAttribute(attrName, attrValue);
            return el;
        };
        /**
         * @param {?} css
         * @param {?=} doc
         * @return {?}
         */
        BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
            if (doc === void 0) { doc = document; }
            var /** @type {?} */ style = (doc.createElement('style'));
            this.appendChild(style, this.createTextNode(css));
            return style;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.createShadowRoot = function (el) { return ((el)).createShadowRoot(); };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getShadowRoot = function (el) { return ((el)).shadowRoot; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getHost = function (el) { return ((el)).host; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.getElementsByClassName = function (element, name) {
            return element.getElementsByClassName(name);
        };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.getElementsByTagName = function (element, name) {
            return element.getElementsByTagName(name);
        };
        /**
         * @param {?} element
         * @return {?}
         */
        BrowserDomAdapter.prototype.classList = function (element) { return (Array.prototype.slice.call(element.classList, 0)); };
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */
        BrowserDomAdapter.prototype.addClass = function (element, className) { element.classList.add(className); };
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */
        BrowserDomAdapter.prototype.removeClass = function (element, className) { element.classList.remove(className); };
        /**
         * @param {?} element
         * @param {?} className
         * @return {?}
         */
        BrowserDomAdapter.prototype.hasClass = function (element, className) { return element.classList.contains(className); };
        /**
         * @param {?} element
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        BrowserDomAdapter.prototype.setStyle = function (element, styleName, styleValue) {
            element.style[styleName] = styleValue;
        };
        /**
         * @param {?} element
         * @param {?} stylename
         * @return {?}
         */
        BrowserDomAdapter.prototype.removeStyle = function (element, stylename) { element.style[stylename] = null; };
        /**
         * @param {?} element
         * @param {?} stylename
         * @return {?}
         */
        BrowserDomAdapter.prototype.getStyle = function (element, stylename) { return element.style[stylename]; };
        /**
         * @param {?} element
         * @param {?} styleName
         * @param {?=} styleValue
         * @return {?}
         */
        BrowserDomAdapter.prototype.hasStyle = function (element, styleName, styleValue) {
            if (styleValue === void 0) { styleValue = null; }
            var /** @type {?} */ value = this.getStyle(element, styleName) || '';
            return styleValue ? value == styleValue : value.length > 0;
        };
        /**
         * @param {?} element
         * @return {?}
         */
        BrowserDomAdapter.prototype.tagName = function (element) { return element.tagName; };
        /**
         * @param {?} element
         * @return {?}
         */
        BrowserDomAdapter.prototype.attributeMap = function (element) {
            var /** @type {?} */ res = new Map();
            var /** @type {?} */ elAttrs = element.attributes;
            for (var /** @type {?} */ i = 0; i < elAttrs.length; i++) {
                var /** @type {?} */ attrib = elAttrs[i];
                res.set(attrib.name, attrib.value);
            }
            return res;
        };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        BrowserDomAdapter.prototype.hasAttribute = function (element, attribute) { return element.hasAttribute(attribute); };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} attribute
         * @return {?}
         */
        BrowserDomAdapter.prototype.hasAttributeNS = function (element, ns, attribute) {
            return element.hasAttributeNS(ns, attribute);
        };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        BrowserDomAdapter.prototype.getAttribute = function (element, attribute) { return element.getAttribute(attribute); };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.getAttributeNS = function (element, ns, name) {
            return element.getAttributeNS(ns, name);
        };
        /**
         * @param {?} element
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setAttribute = function (element, name, value) { element.setAttribute(name, value); };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setAttributeNS = function (element, ns, name, value) {
            element.setAttributeNS(ns, name, value);
        };
        /**
         * @param {?} element
         * @param {?} attribute
         * @return {?}
         */
        BrowserDomAdapter.prototype.removeAttribute = function (element, attribute) { element.removeAttribute(attribute); };
        /**
         * @param {?} element
         * @param {?} ns
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.removeAttributeNS = function (element, ns, name) { element.removeAttributeNS(ns, name); };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.templateAwareRoot = function (el) { return this.isTemplateElement(el) ? this.content(el) : el; };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.createHtmlDocument = function () {
            return document.implementation.createHTMLDocument('fakeTitle');
        };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.defaultDoc = function () { return document; };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getBoundingClientRect = function (el) {
            try {
                return el.getBoundingClientRect();
            }
            catch (e) {
                return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
            }
        };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.getTitle = function () { return document.title; };
        /**
         * @param {?} newTitle
         * @return {?}
         */
        BrowserDomAdapter.prototype.setTitle = function (newTitle) { document.title = newTitle || ''; };
        /**
         * @param {?} n
         * @param {?} selector
         * @return {?}
         */
        BrowserDomAdapter.prototype.elementMatches = function (n, selector) {
            var /** @type {?} */ matches = false;
            if (n instanceof HTMLElement) {
                if (n.matches) {
                    matches = n.matches(selector);
                }
                else if (n.msMatchesSelector) {
                    matches = n.msMatchesSelector(selector);
                }
                else if (n.webkitMatchesSelector) {
                    matches = n.webkitMatchesSelector(selector);
                }
            }
            return matches;
        };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.isTemplateElement = function (el) {
            return el instanceof HTMLElement && el.nodeName == "TEMPLATE";
        };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.hasShadowRoot = function (node) { return node instanceof HTMLElement && isPresent(node.shadowRoot); };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.isShadowRoot = function (node) { return node instanceof DocumentFragment; };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.importIntoDoc = function (node) {
            var /** @type {?} */ toImport = node;
            if (this.isTemplateElement(node)) {
                toImport = this.content(node);
            }
            return document.importNode(toImport, true);
        };
        /**
         * @param {?} node
         * @return {?}
         */
        BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
        /**
         * @param {?} el
         * @return {?}
         */
        BrowserDomAdapter.prototype.getHref = function (el) { return ((el)).href; };
        /**
         * @param {?} event
         * @return {?}
         */
        BrowserDomAdapter.prototype.getEventKey = function (event) {
            var /** @type {?} */ key = event.key;
            if (isBlank(key)) {
                key = event.keyIdentifier;
                // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
                // Safari
                // cf
                // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
                if (isBlank(key)) {
                    return 'Unidentified';
                }
                if (key.startsWith('U+')) {
                    key = String.fromCharCode(parseInt(key.substring(2), 16));
                    if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                        // There is a bug in Chrome for numeric keypad keys:
                        // https://code.google.com/p/chromium/issues/detail?id=155654
                        // 1, 2, 3 ... are reported as A, B, C ...
                        key = _chromeNumKeyPadMap[key];
                    }
                }
            }
            if (_keyMap.hasOwnProperty(key)) {
                key = _keyMap[key];
            }
            return key;
        };
        /**
         * @param {?} target
         * @return {?}
         */
        BrowserDomAdapter.prototype.getGlobalEventTarget = function (target) {
            if (target == "window") {
                return window;
            }
            else if (target == "document") {
                return document;
            }
            else if (target == "body") {
                return document.body;
            }
        };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.getHistory = function () { return window.history; };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.getLocation = function () { return window.location; };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.getBaseHref = function () {
            var /** @type {?} */ href = getBaseElementHref();
            if (isBlank(href)) {
                return null;
            }
            return relativePath(href);
        };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.getUserAgent = function () { return window.navigator.userAgent; };
        /**
         * @param {?} element
         * @param {?} name
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setData = function (element, name, value) {
            this.setAttribute(element, 'data-' + name, value);
        };
        /**
         * @param {?} element
         * @param {?} name
         * @return {?}
         */
        BrowserDomAdapter.prototype.getData = function (element, name) { return this.getAttribute(element, 'data-' + name); };
        /**
         * @param {?} element
         * @return {?}
         */
        BrowserDomAdapter.prototype.getComputedStyle = function (element) { return getComputedStyle(element); };
        /**
         * @param {?} path
         * @param {?} value
         * @return {?}
         */
        BrowserDomAdapter.prototype.setGlobalVar = function (path, value) { setValueOnPath(global$1, path, value); };
        /**
         * @param {?} callback
         * @return {?}
         */
        BrowserDomAdapter.prototype.requestAnimationFrame = function (callback) { return window.requestAnimationFrame(callback); };
        /**
         * @param {?} id
         * @return {?}
         */
        BrowserDomAdapter.prototype.cancelAnimationFrame = function (id) { window.cancelAnimationFrame(id); };
        /**
         * @return {?}
         */
        BrowserDomAdapter.prototype.performanceNow = function () {
            // performance.now() is not available in all browsers, see
            // http://caniuse.com/#search=performance.now
            if (isPresent(window.performance) && isPresent(window.performance.now)) {
                return window.performance.now();
            }
            else {
                return DateWrapper.toMillis(DateWrapper.now());
            }
        };
        return BrowserDomAdapter;
    }(GenericBrowserDomAdapter));
    var /** @type {?} */ baseElement = null;
    /**
     * @return {?}
     */
    function getBaseElementHref() {
        if (isBlank(baseElement)) {
            baseElement = document.querySelector('base');
            if (isBlank(baseElement)) {
                return null;
            }
        }
        return baseElement.getAttribute('href');
    }
    // based on urlUtils.js in AngularJS 1
    var /** @type {?} */ urlParsingNode = null;
    /**
     * @param {?} url
     * @return {?}
     */
    function relativePath(url) {
        if (isBlank(urlParsingNode)) {
            urlParsingNode = document.createElement("a");
        }
        urlParsingNode.setAttribute('href', url);
        return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
            '/' + urlParsingNode.pathname;
    }
    goog.module('_angular$platform_browser$src$browser$testability');
    var PublicTestability = (function () {
        /**
         * @param {?} testability
         */
        function PublicTestability(testability) {
            this._testability = testability;
        }
        /**
         * @return {?}
         */
        PublicTestability.prototype.isStable = function () { return this._testability.isStable(); };
        /**
         * @param {?} callback
         * @return {?}
         */
        PublicTestability.prototype.whenStable = function (callback) { this._testability.whenStable(callback); };
        /**
         * @param {?} using
         * @param {?} provider
         * @param {?} exactMatch
         * @return {?}
         */
        PublicTestability.prototype.findBindings = function (using, provider, exactMatch) {
            return this.findProviders(using, provider, exactMatch);
        };
        /**
         * @param {?} using
         * @param {?} provider
         * @param {?} exactMatch
         * @return {?}
         */
        PublicTestability.prototype.findProviders = function (using, provider, exactMatch) {
            return this._testability.findBindings(using, provider, exactMatch);
        };
        PublicTestability._tsickle_typeAnnotationsHelper = function () {
            /** @internal
            @type {?} */
            PublicTestability.prototype._testability;
        };
        return PublicTestability;
    }());
    var BrowserGetTestability = (function () {
        function BrowserGetTestability() {
        }
        /**
         * @return {?}
         */
        BrowserGetTestability.init = function () { _angular_core.setTestabilityGetter(new BrowserGetTestability()); };
        /**
         * @param {?} registry
         * @return {?}
         */
        BrowserGetTestability.prototype.addToWindow = function (registry) {
            global$1.getAngularTestability = function (elem, findInAncestors) {
                if (findInAncestors === void 0) { findInAncestors = true; }
                var /** @type {?} */ testability = registry.findTestabilityInTree(elem, findInAncestors);
                if (testability == null) {
                    throw new Error('Could not find testability for element.');
                }
                return new PublicTestability(testability);
            };
            global$1.getAllAngularTestabilities = function () {
                var /** @type {?} */ testabilities = registry.getAllTestabilities();
                return testabilities.map(function (testability) { return new PublicTestability(testability); });
            };
            global$1.getAllAngularRootElements = function () { return registry.getAllRootElements(); };
            var /** @type {?} */ whenAllStable = function (callback) {
                var /** @type {?} */ testabilities = global$1.getAllAngularTestabilities();
                var /** @type {?} */ count = testabilities.length;
                var /** @type {?} */ didWork = false;
                var /** @type {?} */ decrement = function (didWork_) {
                    didWork = didWork || didWork_;
                    count--;
                    if (count == 0) {
                        callback(didWork);
                    }
                };
                testabilities.forEach(function (testability) { testability.whenStable(decrement); });
            };
            if (!global$1.frameworkStabilizers) {
                global$1.frameworkStabilizers = ListWrapper.createGrowableSize(0);
            }
            global$1.frameworkStabilizers.push(whenAllStable);
        };
        /**
         * @param {?} registry
         * @param {?} elem
         * @param {?} findInAncestors
         * @return {?}
         */
        BrowserGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
            if (elem == null) {
                return null;
            }
            var /** @type {?} */ t = registry.getTestability(elem);
            if (isPresent(t)) {
                return t;
            }
            else if (!findInAncestors) {
                return null;
            }
            if (getDOM().isShadowRoot(elem)) {
                return this.findTestabilityInTree(registry, getDOM().getHost(elem), true);
            }
            return this.findTestabilityInTree(registry, getDOM().parentElement(elem), true);
        };
        return BrowserGetTestability;
    }());
    goog.module('_angular$platform_browser$src$dom$dom__tokens'); /**
     * A DI Token representing the main rendering context. In a browser this is the DOM Document.
     *
     * Note: Document might not be available in the Application Context when Application and Rendering
     * Contexts are not the same (e.g. when running the application into a Web Worker).
     */
    var /** @type {?} */ DOCUMENT = new _angular_core.OpaqueToken('DocumentToken');
    goog.module('_angular$platform_browser$src$facade$base__wrapped__exception');
    goog.module('_angular$platform_browser$src$facade$exception__handler');
    goog.module('_angular$platform_browser$src$facade$exceptions');
    var BaseException = (function (_super) {
        __extends(BaseException, _super);
        /**
         * @param {?=} message
         */
        function BaseException(message) {
            if (message === void 0) { message = "--"; }
            _super.call(this, message);
            this.message = message;
            this.stack = (new Error(message)).stack;
        }
        /**
         * @return {?}
         */
        BaseException.prototype.toString = function () { return this.message; };
        BaseException._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            BaseException.prototype.stack;
            /** @type {?} */
            BaseException.prototype.message;
        };
        return BaseException;
    }(Error));
    goog.module('_angular$platform_browser$src$dom$events$event__manager');
    var /** @type {?} */ EVENT_MANAGER_PLUGINS = 
    /*@ts2dart_const*/ new _angular_core.OpaqueToken("EventManagerPlugins");
    var EventManager = (function () {
        /**
         * @param {?} plugins
         * @param {?} _zone
         */
        function EventManager(plugins, _zone) {
            var _this = this;
            this._zone = _zone;
            plugins.forEach(function (p) { return p.manager = _this; });
            this._plugins = ListWrapper.reversed(plugins);
        }
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        EventManager.prototype.addEventListener = function (element, eventName, handler) {
            var /** @type {?} */ plugin = this._findPluginFor(eventName);
            return plugin.addEventListener(element, eventName, handler);
        };
        /**
         * @param {?} target
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
            var /** @type {?} */ plugin = this._findPluginFor(eventName);
            return plugin.addGlobalEventListener(target, eventName, handler);
        };
        /**
         * @return {?}
         */
        EventManager.prototype.getZone = function () { return this._zone; };
        /**
         * @internal
         * @param {?} eventName
         * @return {?}
         */
        EventManager.prototype._findPluginFor = function (eventName) {
            var /** @type {?} */ plugins = this._plugins;
            for (var /** @type {?} */ i = 0; i < plugins.length; i++) {
                var /** @type {?} */ plugin = plugins[i];
                if (plugin.supports(eventName)) {
                    return plugin;
                }
            }
            throw new BaseException("No event manager plugin found for event " + eventName);
        };
        EventManager._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            EventManager.prototype._plugins;
            /** @type {?} */
            EventManager.prototype._zone;
        };
        return EventManager;
    }());
    EventManager.decorators = [
        { type: _angular_core.Injectable },
    ];
    EventManager.ctorParameters = [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [EVENT_MANAGER_PLUGINS,] },] },
        { type: _angular_core.NgZone, },
    ];
    var EventManagerPlugin = (function () {
        function EventManagerPlugin() {
        }
        /**
         * @param {?} eventName
         * @return {?}
         */
        EventManagerPlugin.prototype.supports = function (eventName) { return false; };
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
            throw "not implemented";
        };
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
            throw "not implemented";
        };
        EventManagerPlugin._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            EventManagerPlugin.prototype.manager;
        };
        return EventManagerPlugin;
    }());
    goog.module('_angular$platform_browser$src$animate$css__animation__options');
    var CssAnimationOptions = (function () {
        function CssAnimationOptions() {
            /** classes to be added to the element */
            this.classesToAdd = [];
            /** classes to be removed from the element */
            this.classesToRemove = [];
            /** classes to be added for the duration of the animation */
            this.animationClasses = [];
        }
        CssAnimationOptions._tsickle_typeAnnotationsHelper = function () {
            /** initial styles for the element
            @type {?} */
            CssAnimationOptions.prototype.fromStyles;
            /** destination styles for the element
            @type {?} */
            CssAnimationOptions.prototype.toStyles;
            /** classes to be added to the element
            @type {?} */
            CssAnimationOptions.prototype.classesToAdd;
            /** classes to be removed from the element
            @type {?} */
            CssAnimationOptions.prototype.classesToRemove;
            /** classes to be added for the duration of the animation
            @type {?} */
            CssAnimationOptions.prototype.animationClasses;
            /** override the duration of the animation (in milliseconds)
            @type {?} */
            CssAnimationOptions.prototype.duration;
            /** override the transition delay (in milliseconds)
            @type {?} */
            CssAnimationOptions.prototype.delay;
        };
        return CssAnimationOptions;
    }());
    goog.module('_angular$platform_browser$src$facade$math');
    var /** @type {?} */ Math$1 = global$1.Math;
    goog.module('_angular$platform_browser$src$dom$util');
    var /** @type {?} */ CAMEL_CASE_REGEXP = /([A-Z])/g;
    /**
     * @param {?} input
     * @return {?}
     */
    function camelCaseToDashCase(input) {
        return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
    }
    goog.module('_angular$platform_browser$src$animate$animation');
    var Animation = (function () {
        /**
         *  Stores the start time and starts the animation
         * @param {?} element
         * @param {?} data
         * @param {?} browserDetails
         */
        function Animation(element, data, browserDetails) {
            var _this = this;
            this.element = element;
            this.data = data;
            this.browserDetails = browserDetails;
            /** functions to be called upon completion */
            this.callbacks = [];
            /** functions for removing event listeners */
            this.eventClearFunctions = [];
            /** flag used to track whether or not the animation has finished */
            this.completed = false;
            this._stringPrefix = '';
            this.startTime = DateWrapper.toMillis(DateWrapper.now());
            this._stringPrefix = getDOM().getAnimationPrefix();
            this.setup();
            this.wait(function (timestamp) { return _this.start(); });
        }
        Object.defineProperty(Animation.prototype, "totalTime", {
            /** total amount of time that the animation should take including delay */
            get: function () {
                var /** @type {?} */ delay = this.computedDelay != null ? this.computedDelay : 0;
                var /** @type {?} */ duration = this.computedDuration != null ? this.computedDuration : 0;
                return delay + duration;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} callback
         * @return {?}
         */
        Animation.prototype.wait = function (callback) {
            // Firefox requires 2 frames for some reason
            this.browserDetails.raf(callback, 2);
        };
        /**
         *  Sets up the initial styles before the animation is started
         * @return {?}
         */
        Animation.prototype.setup = function () {
            if (this.data.fromStyles != null)
                this.applyStyles(this.data.fromStyles);
            if (this.data.duration != null)
                this.applyStyles({ 'transitionDuration': this.data.duration.toString() + 'ms' });
            if (this.data.delay != null)
                this.applyStyles({ 'transitionDelay': this.data.delay.toString() + 'ms' });
        };
        /**
         *  After the initial setup has occurred, this method adds the animation styles
         * @return {?}
         */
        Animation.prototype.start = function () {
            this.addClasses(this.data.classesToAdd);
            this.addClasses(this.data.animationClasses);
            this.removeClasses(this.data.classesToRemove);
            if (this.data.toStyles != null)
                this.applyStyles(this.data.toStyles);
            var /** @type {?} */ computedStyles = getDOM().getComputedStyle(this.element);
            this.computedDelay =
                Math$1.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-delay')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-delay')));
            this.computedDuration = Math$1.max(this.parseDurationString(computedStyles.getPropertyValue(this._stringPrefix + 'transition-duration')), this.parseDurationString(this.element.style.getPropertyValue(this._stringPrefix + 'transition-duration')));
            this.addEvents();
        };
        /**
         *  Applies the provided styles to the element
         * @param {?} styles
         * @return {?}
         */
        Animation.prototype.applyStyles = function (styles) {
            var _this = this;
            StringMapWrapper.forEach(styles, function (value, key) {
                var /** @type {?} */ dashCaseKey = camelCaseToDashCase(key);
                if (isPresent(getDOM().getStyle(_this.element, dashCaseKey))) {
                    getDOM().setStyle(_this.element, dashCaseKey, value.toString());
                }
                else {
                    getDOM().setStyle(_this.element, _this._stringPrefix + dashCaseKey, value.toString());
                }
            });
        };
        /**
         *  Adds the provided classes to the element
         * @param {?} classes
         * @return {?}
         */
        Animation.prototype.addClasses = function (classes) {
            for (var /** @type {?} */ i = 0, /** @type {?} */ len = classes.length; i < len; i++)
                getDOM().addClass(this.element, classes[i]);
        };
        /**
         *  Removes the provided classes from the element
         * @param {?} classes
         * @return {?}
         */
        Animation.prototype.removeClasses = function (classes) {
            for (var /** @type {?} */ i = 0, /** @type {?} */ len = classes.length; i < len; i++)
                getDOM().removeClass(this.element, classes[i]);
        };
        /**
         *  Adds events to track when animations have finished
         * @return {?}
         */
        Animation.prototype.addEvents = function () {
            var _this = this;
            if (this.totalTime > 0) {
                this.eventClearFunctions.push(getDOM().onAndCancel(this.element, getDOM().getTransitionEnd(), function (event) { return _this.handleAnimationEvent(event); }));
            }
            else {
                this.handleAnimationCompleted();
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        Animation.prototype.handleAnimationEvent = function (event) {
            var /** @type {?} */ elapsedTime = Math$1.round(event.elapsedTime * 1000);
            if (!this.browserDetails.elapsedTimeIncludesDelay)
                elapsedTime += this.computedDelay;
            event.stopPropagation();
            if (elapsedTime >= this.totalTime)
                this.handleAnimationCompleted();
        };
        /**
         *  Runs all animation callbacks and removes temporary classes
         * @return {?}
         */
        Animation.prototype.handleAnimationCompleted = function () {
            this.removeClasses(this.data.animationClasses);
            this.callbacks.forEach(function (callback) { return callback(); });
            this.callbacks = [];
            this.eventClearFunctions.forEach(function (fn) { return fn(); });
            this.eventClearFunctions = [];
            this.completed = true;
        };
        /**
         *  Adds animation callbacks to be called upon completion
         * @returns {Animation}
         * @param {?} callback
         * @return {?}
         */
        Animation.prototype.onComplete = function (callback) {
            if (this.completed) {
                callback();
            }
            else {
                this.callbacks.push(callback);
            }
            return this;
        };
        /**
         *  Converts the duration string to the number of milliseconds
         * @returns {number}
         * @param {?} duration
         * @return {?}
         */
        Animation.prototype.parseDurationString = function (duration) {
            var /** @type {?} */ maxValue = 0;
            // duration must have at least 2 characters to be valid. (number + type)
            if (duration == null || duration.length < 2) {
                return maxValue;
            }
            else if (duration.substring(duration.length - 2) == 'ms') {
                var /** @type {?} */ value = NumberWrapper.parseInt(this.stripLetters(duration), 10);
                if (value > maxValue)
                    maxValue = value;
            }
            else if (duration.substring(duration.length - 1) == 's') {
                var /** @type {?} */ ms = NumberWrapper.parseFloat(this.stripLetters(duration)) * 1000;
                var /** @type {?} */ value = Math$1.floor(ms);
                if (value > maxValue)
                    maxValue = value;
            }
            return maxValue;
        };
        /**
         *  Strips the letters from the duration string
         * @returns {string}
         * @param {?} str
         * @return {?}
         */
        Animation.prototype.stripLetters = function (str) {
            return StringWrapper.replaceAll(str, RegExpWrapper.create('[^0-9]+$', ''), '');
        };
        Animation._tsickle_typeAnnotationsHelper = function () {
            /** functions to be called upon completion
            @type {?} */
            Animation.prototype.callbacks;
            /** the duration (ms) of the animation (whether from CSS or manually set)
            @type {?} */
            Animation.prototype.computedDuration;
            /** the animation delay (ms) (whether from CSS or manually set)
            @type {?} */
            Animation.prototype.computedDelay;
            /** timestamp of when the animation started
            @type {?} */
            Animation.prototype.startTime;
            /** functions for removing event listeners
            @type {?} */
            Animation.prototype.eventClearFunctions;
            /** flag used to track whether or not the animation has finished
            @type {?} */
            Animation.prototype.completed;
            /** @type {?} */
            Animation.prototype._stringPrefix;
            /** @type {?} */
            Animation.prototype.element;
            /** @type {?} */
            Animation.prototype.data;
            /** @type {?} */
            Animation.prototype.browserDetails;
        };
        return Animation;
    }());
    goog.module('_angular$platform_browser$src$animate$css__animation__builder');
    var CssAnimationBuilder = (function () {
        /**
         *  Accepts public properties for CssAnimationBuilder
         * @param {?} browserDetails
         */
        function CssAnimationBuilder(browserDetails) {
            this.browserDetails = browserDetails;
            this.data = new CssAnimationOptions();
        }
        /**
         *  Adds a temporary class that will be removed at the end of the animation
         * @param {?} className
         * @return {?}
         */
        CssAnimationBuilder.prototype.addAnimationClass = function (className) {
            this.data.animationClasses.push(className);
            return this;
        };
        /**
         *  Adds a class that will remain on the element after the animation has finished
         * @param {?} className
         * @return {?}
         */
        CssAnimationBuilder.prototype.addClass = function (className) {
            this.data.classesToAdd.push(className);
            return this;
        };
        /**
         *  Removes a class from the element
         * @param {?} className
         * @return {?}
         */
        CssAnimationBuilder.prototype.removeClass = function (className) {
            this.data.classesToRemove.push(className);
            return this;
        };
        /**
         *  Sets the animation duration (and overrides any defined through CSS)
         * @param {?} duration
         * @return {?}
         */
        CssAnimationBuilder.prototype.setDuration = function (duration) {
            this.data.duration = duration;
            return this;
        };
        /**
         *  Sets the animation delay (and overrides any defined through CSS)
         * @param {?} delay
         * @return {?}
         */
        CssAnimationBuilder.prototype.setDelay = function (delay) {
            this.data.delay = delay;
            return this;
        };
        /**
         *  Sets styles for both the initial state and the destination state
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
        CssAnimationBuilder.prototype.setStyles = function (from, to) {
            return this.setFromStyles(from).setToStyles(to);
        };
        /**
         *  Sets the initial styles for the animation
         * @param {?} from
         * @return {?}
         */
        CssAnimationBuilder.prototype.setFromStyles = function (from) {
            this.data.fromStyles = from;
            return this;
        };
        /**
         *  Sets the destination styles for the animation
         * @param {?} to
         * @return {?}
         */
        CssAnimationBuilder.prototype.setToStyles = function (to) {
            this.data.toStyles = to;
            return this;
        };
        /**
         *  Starts the animation and returns a promise
         * @param {?} element
         * @return {?}
         */
        CssAnimationBuilder.prototype.start = function (element) {
            return new Animation(element, this.data, this.browserDetails);
        };
        CssAnimationBuilder._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            CssAnimationBuilder.prototype.data;
            /** @type {?} */
            CssAnimationBuilder.prototype.browserDetails;
        };
        return CssAnimationBuilder;
    }());
    goog.module('_angular$platform_browser$src$animate$browser__details');
    var BrowserDetails = (function () {
        /**
         */
        function BrowserDetails() {
            this.elapsedTimeIncludesDelay = false;
            this.doesElapsedTimeIncludesDelay();
        }
        /**
         *  Determines if `event.elapsedTime` includes transition delay in the current browser.  At this time, Chrome and Opera seem to be the only browsers that include this.
         * @return {?}
         */
        BrowserDetails.prototype.doesElapsedTimeIncludesDelay = function () {
            var _this = this;
            var /** @type {?} */ div = getDOM().createElement('div');
            getDOM().setAttribute(div, 'style', "position: absolute; top: -9999px; left: -9999px; width: 1px;\n      height: 1px; transition: all 1ms linear 1ms;");
            // Firefox requires that we wait for 2 frames for some reason
            this.raf(function (timestamp) {
                getDOM().on(div, 'transitionend', function (event) {
                    var /** @type {?} */ elapsed = Math$1.round(event.elapsedTime * 1000);
                    _this.elapsedTimeIncludesDelay = elapsed == 2;
                    getDOM().remove(div);
                });
                getDOM().setStyle(div, 'width', '2px');
            }, 2);
        };
        /**
         * @param {?} callback
         * @param {?=} frames
         * @return {?}
         */
        BrowserDetails.prototype.raf = function (callback, frames) {
            if (frames === void 0) { frames = 1; }
            var /** @type {?} */ queue = new RafQueue(callback, frames);
            return function () { return queue.cancel(); };
        };
        BrowserDetails._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            BrowserDetails.prototype.elapsedTimeIncludesDelay;
        };
        return BrowserDetails;
    }());
    BrowserDetails.decorators = [
        { type: _angular_core.Injectable },
    ];
    BrowserDetails.ctorParameters = [];
    var RafQueue = (function () {
        /**
         * @param {?} callback
         * @param {?} frames
         */
        function RafQueue(callback, frames) {
            this.callback = callback;
            this.frames = frames;
            this._raf();
        }
        /**
         * @return {?}
         */
        RafQueue.prototype._raf = function () {
            var _this = this;
            this.currentFrameId =
                getDOM().requestAnimationFrame(function (timestamp) { return _this._nextFrame(timestamp); });
        };
        /**
         * @param {?} timestamp
         * @return {?}
         */
        RafQueue.prototype._nextFrame = function (timestamp) {
            this.frames--;
            if (this.frames > 0) {
                this._raf();
            }
            else {
                this.callback(timestamp);
            }
        };
        /**
         * @return {?}
         */
        RafQueue.prototype.cancel = function () {
            getDOM().cancelAnimationFrame(this.currentFrameId);
            this.currentFrameId = null;
        };
        RafQueue._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            RafQueue.prototype.currentFrameId;
            /** @type {?} */
            RafQueue.prototype.callback;
            /** @type {?} */
            RafQueue.prototype.frames;
        };
        return RafQueue;
    }());
    goog.module('_angular$platform_browser$src$animate$animation__builder');
    var AnimationBuilder = (function () {
        /**
         *  Used for DI
         * @param {?} browserDetails
         */
        function AnimationBuilder(browserDetails) {
            this.browserDetails = browserDetails;
        }
        /**
         *  Creates a new CSS Animation
         * @returns {CssAnimationBuilder}
         * @return {?}
         */
        AnimationBuilder.prototype.css = function () { return new CssAnimationBuilder(this.browserDetails); };
        AnimationBuilder._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            AnimationBuilder.prototype.browserDetails;
        };
        return AnimationBuilder;
    }());
    AnimationBuilder.decorators = [
        { type: _angular_core.Injectable },
    ];
    AnimationBuilder.ctorParameters = [
        { type: BrowserDetails, },
    ];
    goog.module('_angular$platform_browser$src$dom$shared__styles__host');
    var SharedStylesHost = (function () {
        /**
         */
        function SharedStylesHost() {
            /** @internal */
            this._styles = [];
            /** @internal */
            this._stylesSet = new Set();
        }
        /**
         * @param {?} styles
         * @return {?}
         */
        SharedStylesHost.prototype.addStyles = function (styles) {
            var _this = this;
            var /** @type {?} */ additions = [];
            styles.forEach(function (style) {
                if (!SetWrapper.has(_this._stylesSet, style)) {
                    _this._stylesSet.add(style);
                    _this._styles.push(style);
                    additions.push(style);
                }
            });
            this.onStylesAdded(additions);
        };
        /**
         * @param {?} additions
         * @return {?}
         */
        SharedStylesHost.prototype.onStylesAdded = function (additions) { };
        /**
         * @return {?}
         */
        SharedStylesHost.prototype.getAllStyles = function () { return this._styles; };
        SharedStylesHost._tsickle_typeAnnotationsHelper = function () {
            /** @internal
            @type {?} */
            SharedStylesHost.prototype._styles;
            /** @internal
            @type {?} */
            SharedStylesHost.prototype._stylesSet;
        };
        return SharedStylesHost;
    }());
    SharedStylesHost.decorators = [
        { type: _angular_core.Injectable },
    ];
    SharedStylesHost.ctorParameters = [];
    var DomSharedStylesHost = (function (_super) {
        __extends(DomSharedStylesHost, _super);
        /**
         * @param {?} doc
         */
        function DomSharedStylesHost(doc) {
            _super.call(this);
            this._hostNodes = new Set();
            this._hostNodes.add(doc.head);
        }
        /**
         * @internal
         * @param {?} styles
         * @param {?} host
         * @return {?}
         */
        DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
            for (var /** @type {?} */ i = 0; i < styles.length; i++) {
                var /** @type {?} */ style = styles[i];
                getDOM().appendChild(host, getDOM().createStyleElement(style));
            }
        };
        /**
         * @param {?} hostNode
         * @return {?}
         */
        DomSharedStylesHost.prototype.addHost = function (hostNode) {
            this._addStylesToHost(this._styles, hostNode);
            this._hostNodes.add(hostNode);
        };
        /**
         * @param {?} hostNode
         * @return {?}
         */
        DomSharedStylesHost.prototype.removeHost = function (hostNode) { SetWrapper.delete(this._hostNodes, hostNode); };
        /**
         * @param {?} additions
         * @return {?}
         */
        DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
            var _this = this;
            this._hostNodes.forEach(function (hostNode) { _this._addStylesToHost(additions, hostNode); });
        };
        DomSharedStylesHost._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            DomSharedStylesHost.prototype._hostNodes;
        };
        return DomSharedStylesHost;
    }(SharedStylesHost));
    DomSharedStylesHost.decorators = [
        { type: _angular_core.Injectable },
    ];
    DomSharedStylesHost.ctorParameters = [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [DOCUMENT,] },] },
    ];
    goog.module('_angular$platform_browser$src$dom$dom__renderer');
    var /** @type {?} */ NAMESPACE_URIS = 
    /*@ts2dart_const*/
    { 'xlink': 'http://www.w3.org/1999/xlink', 'svg': 'http://www.w3.org/2000/svg' };
    var /** @type {?} */ TEMPLATE_COMMENT_TEXT = 'template bindings={}';
    var /** @type {?} */ TEMPLATE_BINDINGS_EXP = /^template bindings=(.*)$/g;
    var DomRootRenderer = (function () {
        /**
         * @param {?} document
         * @param {?} eventManager
         * @param {?} sharedStylesHost
         * @param {?} animate
         */
        function DomRootRenderer(document, eventManager, sharedStylesHost, animate) {
            this.document = document;
            this.eventManager = eventManager;
            this.sharedStylesHost = sharedStylesHost;
            this.animate = animate;
            this._registeredComponents = new Map();
        }
        /**
         * @param {?} componentProto
         * @return {?}
         */
        DomRootRenderer.prototype.renderComponent = function (componentProto) {
            var /** @type {?} */ renderer = this._registeredComponents.get(componentProto.id);
            if (isBlank(renderer)) {
                renderer = new DomRenderer(this, componentProto);
                this._registeredComponents.set(componentProto.id, renderer);
            }
            return renderer;
        };
        DomRootRenderer._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            DomRootRenderer.prototype._registeredComponents;
            /** @type {?} */
            DomRootRenderer.prototype.document;
            /** @type {?} */
            DomRootRenderer.prototype.eventManager;
            /** @type {?} */
            DomRootRenderer.prototype.sharedStylesHost;
            /** @type {?} */
            DomRootRenderer.prototype.animate;
        };
        return DomRootRenderer;
    }());
    var DomRootRenderer_ = (function (_super) {
        __extends(DomRootRenderer_, _super);
        /**
         * @param {?} _document
         * @param {?} _eventManager
         * @param {?} sharedStylesHost
         * @param {?} animate
         */
        function DomRootRenderer_(_document, _eventManager, sharedStylesHost, animate) {
            _super.call(this, _document, _eventManager, sharedStylesHost, animate);
        }
        return DomRootRenderer_;
    }(DomRootRenderer));
    DomRootRenderer_.decorators = [
        { type: _angular_core.Injectable },
    ];
    DomRootRenderer_.ctorParameters = [
        { type: undefined, decorators: [{ type: _angular_core.Inject, args: [DOCUMENT,] },] },
        { type: EventManager, },
        { type: DomSharedStylesHost, },
        { type: AnimationBuilder, },
    ];
    var DomRenderer = (function () {
        /**
         * @param {?} _rootRenderer
         * @param {?} componentProto
         */
        function DomRenderer(_rootRenderer, componentProto) {
            this._rootRenderer = _rootRenderer;
            this.componentProto = componentProto;
            this._styles = _flattenStyles(componentProto.id, componentProto.styles, []);
            if (componentProto.encapsulation !== _angular_core.ViewEncapsulation.Native) {
                this._rootRenderer.sharedStylesHost.addStyles(this._styles);
            }
            if (this.componentProto.encapsulation === _angular_core.ViewEncapsulation.Emulated) {
                this._contentAttr = _shimContentAttribute(componentProto.id);
                this._hostAttr = _shimHostAttribute(componentProto.id);
            }
            else {
                this._contentAttr = null;
                this._hostAttr = null;
            }
        }
        /**
         * @param {?} selectorOrNode
         * @param {?} debugInfo
         * @return {?}
         */
        DomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
            var /** @type {?} */ el;
            if (isString(selectorOrNode)) {
                el = getDOM().querySelector(this._rootRenderer.document, selectorOrNode);
                if (isBlank(el)) {
                    throw new BaseException("The selector \"" + selectorOrNode + "\" did not match any elements");
                }
            }
            else {
                el = selectorOrNode;
            }
            getDOM().clearNodes(el);
            return el;
        };
        /**
         * @param {?} parent
         * @param {?} name
         * @param {?} debugInfo
         * @return {?}
         */
        DomRenderer.prototype.createElement = function (parent, name, debugInfo) {
            var /** @type {?} */ nsAndName = splitNamespace(name);
            var /** @type {?} */ el = isPresent(nsAndName[0]) ?
                getDOM().createElementNS(NAMESPACE_URIS[nsAndName[0]], nsAndName[1]) :
                getDOM().createElement(nsAndName[1]);
            if (isPresent(this._contentAttr)) {
                getDOM().setAttribute(el, this._contentAttr, '');
            }
            if (isPresent(parent)) {
                getDOM().appendChild(parent, el);
            }
            return el;
        };
        /**
         * @param {?} hostElement
         * @return {?}
         */
        DomRenderer.prototype.createViewRoot = function (hostElement) {
            var /** @type {?} */ nodesParent;
            if (this.componentProto.encapsulation === _angular_core.ViewEncapsulation.Native) {
                nodesParent = getDOM().createShadowRoot(hostElement);
                this._rootRenderer.sharedStylesHost.addHost(nodesParent);
                for (var /** @type {?} */ i = 0; i < this._styles.length; i++) {
                    getDOM().appendChild(nodesParent, getDOM().createStyleElement(this._styles[i]));
                }
            }
            else {
                if (isPresent(this._hostAttr)) {
                    getDOM().setAttribute(hostElement, this._hostAttr, '');
                }
                nodesParent = hostElement;
            }
            return nodesParent;
        };
        /**
         * @param {?} parentElement
         * @param {?} debugInfo
         * @return {?}
         */
        DomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
            var /** @type {?} */ comment = getDOM().createComment(TEMPLATE_COMMENT_TEXT);
            if (isPresent(parentElement)) {
                getDOM().appendChild(parentElement, comment);
            }
            return comment;
        };
        /**
         * @param {?} parentElement
         * @param {?} value
         * @param {?} debugInfo
         * @return {?}
         */
        DomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
            var /** @type {?} */ node = getDOM().createTextNode(value);
            if (isPresent(parentElement)) {
                getDOM().appendChild(parentElement, node);
            }
            return node;
        };
        /**
         * @param {?} parentElement
         * @param {?} nodes
         * @return {?}
         */
        DomRenderer.prototype.projectNodes = function (parentElement, nodes) {
            if (isBlank(parentElement))
                return;
            appendNodes(parentElement, nodes);
        };
        /**
         * @param {?} node
         * @param {?} viewRootNodes
         * @return {?}
         */
        DomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
            moveNodesAfterSibling(node, viewRootNodes);
            for (var /** @type {?} */ i = 0; i < viewRootNodes.length; i++)
                this.animateNodeEnter(viewRootNodes[i]);
        };
        /**
         * @param {?} viewRootNodes
         * @return {?}
         */
        DomRenderer.prototype.detachView = function (viewRootNodes) {
            for (var /** @type {?} */ i = 0; i < viewRootNodes.length; i++) {
                var /** @type {?} */ node = viewRootNodes[i];
                getDOM().remove(node);
                this.animateNodeLeave(node);
            }
        };
        /**
         * @param {?} hostElement
         * @param {?} viewAllNodes
         * @return {?}
         */
        DomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
            if (this.componentProto.encapsulation === _angular_core.ViewEncapsulation.Native && isPresent(hostElement)) {
                this._rootRenderer.sharedStylesHost.removeHost(getDOM().getShadowRoot(hostElement));
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        DomRenderer.prototype.listen = function (renderElement, name, callback) {
            return this._rootRenderer.eventManager.addEventListener(renderElement, name, decoratePreventDefault(callback));
        };
        /**
         * @param {?} target
         * @param {?} name
         * @param {?} callback
         * @return {?}
         */
        DomRenderer.prototype.listenGlobal = function (target, name, callback) {
            return this._rootRenderer.eventManager.addGlobalEventListener(target, name, decoratePreventDefault(callback));
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        DomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
            getDOM().setProperty(renderElement, propertyName, propertyValue);
        };
        /**
         * @param {?} renderElement
         * @param {?} attributeName
         * @param {?} attributeValue
         * @return {?}
         */
        DomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
            var /** @type {?} */ attrNs;
            var /** @type {?} */ nsAndName = splitNamespace(attributeName);
            if (isPresent(nsAndName[0])) {
                attributeName = nsAndName[0] + ':' + nsAndName[1];
                attrNs = NAMESPACE_URIS[nsAndName[0]];
            }
            if (isPresent(attributeValue)) {
                if (isPresent(attrNs)) {
                    getDOM().setAttributeNS(renderElement, attrNs, attributeName, attributeValue);
                }
                else {
                    getDOM().setAttribute(renderElement, attributeName, attributeValue);
                }
            }
            else {
                if (isPresent(attrNs)) {
                    getDOM().removeAttributeNS(renderElement, attrNs, nsAndName[1]);
                }
                else {
                    getDOM().removeAttribute(renderElement, attributeName);
                }
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} propertyName
         * @param {?} propertyValue
         * @return {?}
         */
        DomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
            var /** @type {?} */ dashCasedPropertyName = camelCaseToDashCase(propertyName);
            if (getDOM().isCommentNode(renderElement)) {
                var /** @type {?} */ existingBindings = RegExpWrapper.firstMatch(TEMPLATE_BINDINGS_EXP, StringWrapper.replaceAll(getDOM().getText(renderElement), /\n/g, ''));
                var /** @type {?} */ parsedBindings = Json.parse(existingBindings[1]);
                parsedBindings[dashCasedPropertyName] = propertyValue;
                getDOM().setText(renderElement, StringWrapper.replace(TEMPLATE_COMMENT_TEXT, '{}', Json.stringify(parsedBindings)));
            }
            else {
                this.setElementAttribute(renderElement, propertyName, propertyValue);
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} className
         * @param {?} isAdd
         * @return {?}
         */
        DomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
            if (isAdd) {
                getDOM().addClass(renderElement, className);
            }
            else {
                getDOM().removeClass(renderElement, className);
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} styleName
         * @param {?} styleValue
         * @return {?}
         */
        DomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
            if (isPresent(styleValue)) {
                getDOM().setStyle(renderElement, styleName, stringify(styleValue));
            }
            else {
                getDOM().removeStyle(renderElement, styleName);
            }
        };
        /**
         * @param {?} renderElement
         * @param {?} methodName
         * @param {?} args
         * @return {?}
         */
        DomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
            getDOM().invoke(renderElement, methodName, args);
        };
        /**
         * @param {?} renderNode
         * @param {?} text
         * @return {?}
         */
        DomRenderer.prototype.setText = function (renderNode, text) { getDOM().setText(renderNode, text); };
        /**
         *  Performs animations if necessary
         * @param {?} node
         * @return {?}
         */
        DomRenderer.prototype.animateNodeEnter = function (node) {
            if (getDOM().isElementNode(node) && getDOM().hasClass(node, 'ng-animate')) {
                getDOM().addClass(node, 'ng-enter');
                this._rootRenderer.animate.css()
                    .addAnimationClass('ng-enter-active')
                    .start(/** @type {?} */ (node))
                    .onComplete(function () { getDOM().removeClass(node, 'ng-enter'); });
            }
        };
        /**
         *  If animations are necessary, performs animations then removes the element; otherwise, it just removes the element.
         * @param {?} node
         * @return {?}
         */
        DomRenderer.prototype.animateNodeLeave = function (node) {
            if (getDOM().isElementNode(node) && getDOM().hasClass(node, 'ng-animate')) {
                getDOM().addClass(node, 'ng-leave');
                this._rootRenderer.animate.css()
                    .addAnimationClass('ng-leave-active')
                    .start(/** @type {?} */ (node))
                    .onComplete(function () {
                    getDOM().removeClass(node, 'ng-leave');
                    getDOM().remove(node);
                });
            }
            else {
                getDOM().remove(node);
            }
        };
        DomRenderer._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            DomRenderer.prototype._contentAttr;
            /** @type {?} */
            DomRenderer.prototype._hostAttr;
            /** @type {?} */
            DomRenderer.prototype._styles;
            /** @type {?} */
            DomRenderer.prototype._rootRenderer;
            /** @type {?} */
            DomRenderer.prototype.componentProto;
        };
        return DomRenderer;
    }());
    /**
     * @param {?} sibling
     * @param {?} nodes
     * @return {?}
     */
    function moveNodesAfterSibling(sibling, nodes) {
        var /** @type {?} */ parent = getDOM().parentElement(sibling);
        if (nodes.length > 0 && isPresent(parent)) {
            var /** @type {?} */ nextSibling = getDOM().nextSibling(sibling);
            if (isPresent(nextSibling)) {
                for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                    getDOM().insertBefore(nextSibling, nodes[i]);
                }
            }
            else {
                for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
                    getDOM().appendChild(parent, nodes[i]);
                }
            }
        }
    }
    /**
     * @param {?} parent
     * @param {?} nodes
     * @return {?}
     */
    function appendNodes(parent, nodes) {
        for (var /** @type {?} */ i = 0; i < nodes.length; i++) {
            getDOM().appendChild(parent, nodes[i]);
        }
    }
    /**
     * @param {?} eventHandler
     * @return {?}
     */
    function decoratePreventDefault(eventHandler) {
        return function (event) {
            var /** @type {?} */ allowDefaultBehavior = eventHandler(event);
            if (allowDefaultBehavior === false) {
                // TODO(tbosch): move preventDefault into event plugins...
                getDOM().preventDefault(event);
            }
        };
    }
    var /** @type {?} */ COMPONENT_REGEX = /%COMP%/g;
    var /** @type {?} */ COMPONENT_VARIABLE = '%COMP%';
    var /** @type {?} */ HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
    var /** @type {?} */ CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
    /**
     * @param {?} componentShortId
     * @return {?}
     */
    function _shimContentAttribute(componentShortId) {
        return StringWrapper.replaceAll(CONTENT_ATTR, COMPONENT_REGEX, componentShortId);
    }
    /**
     * @param {?} componentShortId
     * @return {?}
     */
    function _shimHostAttribute(componentShortId) {
        return StringWrapper.replaceAll(HOST_ATTR, COMPONENT_REGEX, componentShortId);
    }
    /**
     * @param {?} compId
     * @param {?} styles
     * @param {?} target
     * @return {?}
     */
    function _flattenStyles(compId, styles, target) {
        for (var /** @type {?} */ i = 0; i < styles.length; i++) {
            var /** @type {?} */ style = styles[i];
            if (isArray(style)) {
                _flattenStyles(compId, style, target);
            }
            else {
                style = StringWrapper.replaceAll(style, COMPONENT_REGEX, compId);
                target.push(style);
            }
        }
        return target;
    }
    var /** @type {?} */ NS_PREFIX_RE = /^:([^:]+):(.+)/g;
    /**
     * @param {?} name
     * @return {?}
     */
    function splitNamespace(name) {
        if (name[0] != ':') {
            return [null, name];
        }
        var /** @type {?} */ match = RegExpWrapper.firstMatch(NS_PREFIX_RE, name);
        return [match[1], match[2]];
    }
    goog.module('_angular$platform_browser$src$dom$events$key__events');
    var /** @type {?} */ modifierKeys = ['alt', 'control', 'meta', 'shift'];
    var /** @type {?} */ modifierKeyGetters = {
        'alt': function (event) { return event.altKey; },
        'control': function (event) { return event.ctrlKey; },
        'meta': function (event) { return event.metaKey; },
        'shift': function (event) { return event.shiftKey; }
    };
    var KeyEventsPlugin = (function (_super) {
        __extends(KeyEventsPlugin, _super);
        /**
         */
        function KeyEventsPlugin() {
            _super.call(this);
        }
        /**
         * @param {?} eventName
         * @return {?}
         */
        KeyEventsPlugin.prototype.supports = function (eventName) {
            return isPresent(KeyEventsPlugin.parseEventName(eventName));
        };
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        KeyEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var /** @type {?} */ parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            var /** @type {?} */ outsideHandler = KeyEventsPlugin.eventCallback(element, StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(function () {
                return getDOM().onAndCancel(element, StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
            });
        };
        /**
         * @param {?} eventName
         * @return {?}
         */
        KeyEventsPlugin.parseEventName = function (eventName) {
            var /** @type {?} */ parts = eventName.toLowerCase().split('.');
            var /** @type {?} */ domEventName = parts.shift();
            if ((parts.length === 0) ||
                !(StringWrapper.equals(domEventName, 'keydown') ||
                    StringWrapper.equals(domEventName, 'keyup'))) {
                return null;
            }
            var /** @type {?} */ key = KeyEventsPlugin._normalizeKey(parts.pop());
            var /** @type {?} */ fullKey = '';
            modifierKeys.forEach(function (modifierName) {
                if (ListWrapper.contains(parts, modifierName)) {
                    ListWrapper.remove(parts, modifierName);
                    fullKey += modifierName + '.';
                }
            });
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
                // returning null instead of throwing to let another plugin process the event
                return null;
            }
            var /** @type {?} */ result = StringMapWrapper.create();
            StringMapWrapper.set(result, 'domEventName', domEventName);
            StringMapWrapper.set(result, 'fullKey', fullKey);
            return result;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        KeyEventsPlugin.getEventFullKey = function (event) {
            var /** @type {?} */ fullKey = '';
            var /** @type {?} */ key = getDOM().getEventKey(event);
            key = key.toLowerCase();
            if (StringWrapper.equals(key, ' ')) {
                key = 'space'; // for readability
            }
            else if (StringWrapper.equals(key, '.')) {
                key = 'dot'; // because '.' is used as a separator in event names
            }
            modifierKeys.forEach(function (modifierName) {
                if (modifierName != key) {
                    var /** @type {?} */ modifierGetter = StringMapWrapper.get(modifierKeyGetters, modifierName);
                    if (modifierGetter(event)) {
                        fullKey += modifierName + '.';
                    }
                }
            });
            fullKey += key;
            return fullKey;
        };
        /**
         * @param {?} element
         * @param {?} fullKey
         * @param {?} handler
         * @param {?} zone
         * @return {?}
         */
        KeyEventsPlugin.eventCallback = function (element, fullKey, handler, zone) {
            return function (event) {
                if (StringWrapper.equals(KeyEventsPlugin.getEventFullKey(event), fullKey)) {
                    zone.runGuarded(function () { return handler(event); });
                }
            };
        };
        /**
         * @internal
         * @param {?} keyName
         * @return {?}
         */
        KeyEventsPlugin._normalizeKey = function (keyName) {
            // TODO: switch to a StringMap if the mapping grows too much
            switch (keyName) {
                case 'esc':
                    return 'escape';
                default:
                    return keyName;
            }
        };
        return KeyEventsPlugin;
    }(EventManagerPlugin));
    KeyEventsPlugin.decorators = [
        { type: _angular_core.Injectable },
    ];
    KeyEventsPlugin.ctorParameters = [];
    goog.module('_angular$platform_browser$src$dom$debug$ng__probe');
    var /** @type {?} */ CORE_TOKENS = { 'ApplicationRef': _angular_core.ApplicationRef, 'NgZone': _angular_core.NgZone };
    var /** @type {?} */ INSPECT_GLOBAL_NAME = 'ng.probe';
    var /** @type {?} */ CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
    /**
     *  Returns a {@link DebugElement} for the given native DOM element, or null if the given native element does not have an Angular view associated with it.
     * @param {?} element
     * @return {?}
     */
    function inspectNativeElement(element) {
        return _angular_core.getDebugNode(element);
    }
    /**
     * @param {?} rootRenderer
     * @return {?}
     */
    function _createConditionalRootRenderer(rootRenderer) {
        if (assertionsEnabled()) {
            return _createRootRenderer(rootRenderer);
        }
        return rootRenderer;
    }
    /**
     * @param {?} rootRenderer
     * @return {?}
     */
    function _createRootRenderer(rootRenderer) {
        getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
        getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
        return new DebugDomRootRenderer(rootRenderer);
    }
    /**
     * Providers which support debugging Angular applications (e.g. via `ng.probe`).
     */
    var /** @type {?} */ ELEMENT_PROBE_PROVIDERS = [
        /*@ts2dart_Provider*/ {
            provide: _angular_core.RootRenderer,
            useFactory: _createConditionalRootRenderer,
            deps: [DomRootRenderer]
        }
    ];
    goog.module('_angular$platform_browser$src$dom$events$dom__events');
    var DomEventsPlugin = (function (_super) {
        __extends(DomEventsPlugin, _super);
        function DomEventsPlugin() {
            _super.apply(this, arguments);
        }
        /**
         * @param {?} eventName
         * @return {?}
         */
        DomEventsPlugin.prototype.supports = function (eventName) { return true; };
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var /** @type {?} */ zone = this.manager.getZone();
            var /** @type {?} */ outsideHandler = function (event) { return zone.runGuarded(function () { return handler(event); }); };
            return this.manager.getZone().runOutsideAngular(function () { return getDOM().onAndCancel(element, eventName, outsideHandler); });
        };
        /**
         * @param {?} target
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        DomEventsPlugin.prototype.addGlobalEventListener = function (target, eventName, handler) {
            var /** @type {?} */ element = getDOM().getGlobalEventTarget(target);
            var /** @type {?} */ zone = this.manager.getZone();
            var /** @type {?} */ outsideHandler = function (event) { return zone.runGuarded(function () { return handler(event); }); };
            return this.manager.getZone().runOutsideAngular(function () { return getDOM().onAndCancel(element, eventName, outsideHandler); });
        };
        return DomEventsPlugin;
    }(EventManagerPlugin));
    DomEventsPlugin.decorators = [
        { type: _angular_core.Injectable },
    ];
    goog.module('_angular$platform_browser$src$dom$events$hammer__common');
    var /** @type {?} */ _eventNames = {
        // pan
        'pan': true,
        'panstart': true,
        'panmove': true,
        'panend': true,
        'pancancel': true,
        'panleft': true,
        'panright': true,
        'panup': true,
        'pandown': true,
        // pinch
        'pinch': true,
        'pinchstart': true,
        'pinchmove': true,
        'pinchend': true,
        'pinchcancel': true,
        'pinchin': true,
        'pinchout': true,
        // press
        'press': true,
        'pressup': true,
        // rotate
        'rotate': true,
        'rotatestart': true,
        'rotatemove': true,
        'rotateend': true,
        'rotatecancel': true,
        // swipe
        'swipe': true,
        'swipeleft': true,
        'swiperight': true,
        'swipeup': true,
        'swipedown': true,
        // tap
        'tap': true,
    };
    var HammerGesturesPluginCommon = (function (_super) {
        __extends(HammerGesturesPluginCommon, _super);
        /**
         */
        function HammerGesturesPluginCommon() {
            _super.call(this);
        }
        /**
         * @param {?} eventName
         * @return {?}
         */
        HammerGesturesPluginCommon.prototype.supports = function (eventName) {
            eventName = eventName.toLowerCase();
            return StringMapWrapper.contains(_eventNames, eventName);
        };
        return HammerGesturesPluginCommon;
    }(EventManagerPlugin));
    goog.module('_angular$platform_browser$src$dom$events$hammer__gestures');
    var /** @type {?} */ HAMMER_GESTURE_CONFIG = 
    /*@ts2dart_const*/ new _angular_core.OpaqueToken("HammerGestureConfig");
    var HammerGestureConfig = (function () {
        function HammerGestureConfig() {
            this.events = [];
            this.overrides = {};
        }
        /**
         * @param {?} element
         * @return {?}
         */
        HammerGestureConfig.prototype.buildHammer = function (element) {
            var /** @type {?} */ mc = new Hammer(element);
            mc.get('pinch').set({ enable: true });
            mc.get('rotate').set({ enable: true });
            for (var eventName in this.overrides) {
                mc.get(eventName).set(this.overrides[eventName]);
            }
            return mc;
        };
        HammerGestureConfig._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            HammerGestureConfig.prototype.events;
            /** @type {?} */
            HammerGestureConfig.prototype.overrides;
        };
        return HammerGestureConfig;
    }());
    HammerGestureConfig.decorators = [
        { type: _angular_core.Injectable },
    ];
    var HammerGesturesPlugin = (function (_super) {
        __extends(HammerGesturesPlugin, _super);
        /**
         * @param {?} _config
         */
        function HammerGesturesPlugin(_config) {
            _super.call(this);
            this._config = _config;
        }
        /**
         * @param {?} eventName
         * @return {?}
         */
        HammerGesturesPlugin.prototype.supports = function (eventName) {
            if (!_super.prototype.supports.call(this, eventName) && !this.isCustomEvent(eventName))
                return false;
            if (!isPresent(window['Hammer'])) {
                throw new BaseException("Hammer.js is not loaded, can not bind " + eventName + " event");
            }
            return true;
        };
        /**
         * @param {?} element
         * @param {?} eventName
         * @param {?} handler
         * @return {?}
         */
        HammerGesturesPlugin.prototype.addEventListener = function (element, eventName, handler) {
            var _this = this;
            var /** @type {?} */ zone = this.manager.getZone();
            eventName = eventName.toLowerCase();
            return zone.runOutsideAngular(function () {
                // Creating the manager bind events, must be done outside of angular
                var /** @type {?} */ mc = _this._config.buildHammer(element);
                var /** @type {?} */ callback = function (eventObj) { zone.runGuarded(function () { handler(eventObj); }); };
                mc.on(eventName, callback);
                return function () { mc.off(eventName, callback); };
            });
        };
        /**
         * @param {?} eventName
         * @return {?}
         */
        HammerGesturesPlugin.prototype.isCustomEvent = function (eventName) { return this._config.events.indexOf(eventName) > -1; };
        HammerGesturesPlugin._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            HammerGesturesPlugin.prototype._config;
        };
        return HammerGesturesPlugin;
    }(HammerGesturesPluginCommon));
    HammerGesturesPlugin.decorators = [
        { type: _angular_core.Injectable },
    ];
    HammerGesturesPlugin.ctorParameters = [
        { type: HammerGestureConfig, decorators: [{ type: _angular_core.Inject, args: [HAMMER_GESTURE_CONFIG,] },] },
    ];
    goog.module('_angular$platform_browser$src$browser$title'); /**
     * A service that can be used to get and set the title of a current HTML document.
     *
     * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
     * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
     * (representing the `<title>` tag). Instead, this service can be used to set and get the current
     * title value.
     */
    var Title = (function () {
        function Title() {
        }
        /**
         *  Get the title of the current HTML document.
         * @returns {string}
         * @return {?}
         */
        Title.prototype.getTitle = function () { return getDOM().getTitle(); };
        /**
         *  Set the title of the current HTML document.
         * @param {?} newTitle
         * @return {?}
         */
        Title.prototype.setTitle = function (newTitle) { getDOM().setTitle(newTitle); };
        return Title;
    }());
    goog.module('_angular$platform_browser$src$facade$browser'); /**
     * JS version of browser APIs. This library can only run in the browser.
     */
    var /** @type {?} */ win = typeof window !== 'undefined' && window || ({});
    goog.module('_angular$platform_browser$src$browser$tools$common__tools');
    var ChangeDetectionPerfRecord = (function () {
        /**
         * @param {?} msPerTick
         * @param {?} numTicks
         */
        function ChangeDetectionPerfRecord(msPerTick, numTicks) {
            this.msPerTick = msPerTick;
            this.numTicks = numTicks;
        }
        ChangeDetectionPerfRecord._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            ChangeDetectionPerfRecord.prototype.msPerTick;
            /** @type {?} */
            ChangeDetectionPerfRecord.prototype.numTicks;
        };
        return ChangeDetectionPerfRecord;
    }());
    /**
     * Entry point for all Angular debug tools. This object corresponds to the `ng`
     * global variable accessible in the dev console.
     */
    var AngularTools = (function () {
        /**
         * @param {?} ref
         */
        function AngularTools(ref) {
            this.profiler = new AngularProfiler(ref);
        }
        AngularTools._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            AngularTools.prototype.profiler;
        };
        return AngularTools;
    }());
    /**
     * Entry point for all Angular profiling-related debug tools. This object
     * corresponds to the `ng.profiler` in the dev console.
     */
    var AngularProfiler = (function () {
        /**
         * @param {?} ref
         */
        function AngularProfiler(ref) {
            this.appRef = ref.injector.get(_angular_core.ApplicationRef);
        }
        /**
         *  Exercises change detection in a loop and then prints the average amount of time in milliseconds how long a single round of change detection takes for the current state of the UI. It runs a minimum of 5 rounds for a minimum of 500 milliseconds. * Optionally, a user may pass a `config` parameter containing a map of options. Supported options are: * `record` (boolean) - causes the profiler to record a CPU profile while it exercises the change detector. Example: * ``` ng.profiler.timeChangeDetection({record: true}) ```
         * @param {?} config
         * @return {?}
         */
        AngularProfiler.prototype.timeChangeDetection = function (config) {
            var /** @type {?} */ record = isPresent(config) && config['record'];
            var /** @type {?} */ profileName = 'Change Detection';
            // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
            var /** @type {?} */ isProfilerAvailable = isPresent(win.console.profile);
            if (record && isProfilerAvailable) {
                win.console.profile(profileName);
            }
            var /** @type {?} */ start = getDOM().performanceNow();
            var /** @type {?} */ numTicks = 0;
            while (numTicks < 5 || (getDOM().performanceNow() - start) < 500) {
                this.appRef.tick();
                numTicks++;
            }
            var /** @type {?} */ end = getDOM().performanceNow();
            if (record && isProfilerAvailable) {
                // need to cast to <any> because type checker thinks there's no argument
                // while in fact there is:
                //
                // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
                ((win.console.profileEnd))(profileName);
            }
            var /** @type {?} */ msPerTick = (end - start) / numTicks;
            win.console.log("ran " + numTicks + " change detection cycles");
            win.console.log(NumberWrapper.toFixed(msPerTick, 2) + " ms per check");
            return new ChangeDetectionPerfRecord(msPerTick, numTicks);
        };
        AngularProfiler._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            AngularProfiler.prototype.appRef;
        };
        return AngularProfiler;
    }());
    goog.module('_angular$platform_browser$src$browser$tools$tools');
    var /** @type {?} */ context = (global$1);
    /**
     *  Enabled Angular 2 debug tools that are accessible via your browser's developer console. * Usage: * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j) 1. Type `ng.` (usually the console will show auto-complete suggestion) 1. Try the change detection profiler `ng.profiler.timeChangeDetection()` then hit Enter.
     * @param {?} ref
     * @return {?}
     */
    function enableDebugTools(ref) {
        context.ng = new AngularTools(ref);
    }
    /**
     *  Disables Angular 2 tools.
     * @return {?}
     */
    function disableDebugTools() {
        delete context.ng;
    }
    goog.module('_angular$platform_browser$src$dom$debug$by'); /**
     * Predicates for use with {@link DebugElement}'s query functions.
     */
    var By = (function () {
        function By() {
        }
        /**
         *  Match all elements. * ## Example * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
         * @return {?}
         */
        By.all = function () { return function (debugElement) { return true; }; };
        /**
         *  Match elements by the given CSS selector. * ## Example * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
         * @param {?} selector
         * @return {?}
         */
        By.css = function (selector) {
            return function (debugElement) {
                return isPresent(debugElement.nativeElement) ?
                    getDOM().elementMatches(debugElement.nativeElement, selector) :
                    false;
            };
        };
        /**
         *  Match elements that have the given directive present. * ## Example * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
         * @param {?} type
         * @return {?}
         */
        By.directive = function (type) {
            return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
        };
        return By;
    }());
    goog.module('_angular$platform_browser$src$browser__common');
    var /** @type {?} */ BROWSER_PLATFORM_MARKER = 
    /*@ts2dart_const*/ new _angular_core.OpaqueToken('BrowserPlatformMarker');
    /**
     * A set of providers to initialize the Angular platform in a web browser.
     *
     * Used automatically by `bootstrap`, or can be passed to {@link platform}.
     */
    var /** @type {?} */ BROWSER_PROVIDERS = [
        /*@ts2dart_Provider*/ { provide: BROWSER_PLATFORM_MARKER, useValue: true },
        _angular_core.PLATFORM_COMMON_PROVIDERS,
        /*@ts2dart_Provider*/ { provide: _angular_core.PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    ];
    /**
     * @return {?}
     */
    function _exceptionHandler() {
        // !IS_DART is required because we must rethrow exceptions in JS,
        // but must not rethrow exceptions in Dart
        return new _angular_core.ExceptionHandler(getDOM(), !IS_DART);
    }
    /**
     * @return {?}
     */
    function _document() {
        return getDOM().defaultDoc();
    }
    var /** @type {?} */ BROWSER_SANITIZATION_PROVIDERS = [
        /* @ts2dart_Provider */ { provide: SanitizationService, useExisting: DomSanitizationService },
        /* @ts2dart_Provider */ { provide: DomSanitizationService, useClass: DomSanitizationServiceImpl },
    ];
    /**
     * A set of providers to initialize an Angular application in a web browser.
     *
     * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
     */
    var /** @type {?} */ BROWSER_APP_COMMON_PROVIDERS = 
    /*@ts2dart_const*/ [
        _angular_core.APPLICATION_COMMON_PROVIDERS,
        _angular_common.FORM_PROVIDERS,
        BROWSER_SANITIZATION_PROVIDERS,
        /* @ts2dart_Provider */ { provide: _angular_core.PLATFORM_PIPES, useValue: _angular_common.COMMON_PIPES, multi: true },
        /* @ts2dart_Provider */ { provide: _angular_core.PLATFORM_DIRECTIVES, useValue: _angular_common.COMMON_DIRECTIVES, multi: true },
        /* @ts2dart_Provider */ { provide: _angular_core.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
        /* @ts2dart_Provider */ { provide: DOCUMENT, useFactory: _document, deps: [] },
        /* @ts2dart_Provider */ { provide: EVENT_MANAGER_PLUGINS, useClass: DomEventsPlugin, multi: true },
        /* @ts2dart_Provider */ { provide: EVENT_MANAGER_PLUGINS, useClass: KeyEventsPlugin, multi: true },
        /* @ts2dart_Provider */ { provide: EVENT_MANAGER_PLUGINS, useClass: HammerGesturesPlugin, multi: true },
        /* @ts2dart_Provider */ { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
        /* @ts2dart_Provider */ { provide: DomRootRenderer, useClass: DomRootRenderer_ },
        /* @ts2dart_Provider */ { provide: _angular_core.RootRenderer, useExisting: DomRootRenderer },
        /* @ts2dart_Provider */ { provide: SharedStylesHost, useExisting: DomSharedStylesHost },
        DomSharedStylesHost,
        _angular_core.Testability,
        BrowserDetails,
        AnimationBuilder,
        EventManager,
        ELEMENT_PROBE_PROVIDERS
    ];
    /**
     * @return {?}
     */
    function initDomAdapter() {
        BrowserDomAdapter.makeCurrent();
        wtfInit();
        BrowserGetTestability.init();
    }
    goog.module('_angular$platform_browser$src$browser$location$browser__platform__location');
    var BrowserPlatformLocation = (function (_super) {
        __extends(BrowserPlatformLocation, _super);
        /**
         */
        function BrowserPlatformLocation() {
            _super.call(this);
            this._init();
        }
        /**
         * @internal
         * @return {?}
         */
        BrowserPlatformLocation.prototype._init = function () {
            this._location = getDOM().getLocation();
            this._history = getDOM().getHistory();
        };
        Object.defineProperty(BrowserPlatformLocation.prototype, "location", {
            /** @internal */
            get: function () { return this._location; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function () { return getDOM().getBaseHref(); };
        /**
         * @param {?} fn
         * @return {?}
         */
        BrowserPlatformLocation.prototype.onPopState = function (fn) {
            getDOM().getGlobalEventTarget('window').addEventListener('popstate', fn, false);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        BrowserPlatformLocation.prototype.onHashChange = function (fn) {
            getDOM().getGlobalEventTarget('window').addEventListener('hashchange', fn, false);
        };
        Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
            get: function () { return this._location.pathname; },
            set: function (newPath) { this._location.pathname = newPath; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
            get: function () { return this._location.search; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
            get: function () { return this._location.hash; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        BrowserPlatformLocation.prototype.pushState = function (state, title, url) {
            this._history.pushState(state, title, url);
        };
        /**
         * @param {?} state
         * @param {?} title
         * @param {?} url
         * @return {?}
         */
        BrowserPlatformLocation.prototype.replaceState = function (state, title, url) {
            this._history.replaceState(state, title, url);
        };
        /**
         * @return {?}
         */
        BrowserPlatformLocation.prototype.forward = function () { this._history.forward(); };
        /**
         * @return {?}
         */
        BrowserPlatformLocation.prototype.back = function () { this._history.back(); };
        BrowserPlatformLocation._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            BrowserPlatformLocation.prototype._location;
            /** @type {?} */
            BrowserPlatformLocation.prototype._history;
        };
        return BrowserPlatformLocation;
    }(_angular_common.PlatformLocation));
    BrowserPlatformLocation.decorators = [
        { type: _angular_core.Injectable },
    ];
    BrowserPlatformLocation.ctorParameters = [];
    goog.module('_angular$platform_browser$src$platform__browser__static'); /**
     * An array of providers that should be passed into `application()` when bootstrapping a component
     * when all templates
     * have been precompiled offline.
     */
    var /** @type {?} */ BROWSER_APP_STATIC_PROVIDERS = 
    /*@ts2dart_const*/ BROWSER_APP_COMMON_PROVIDERS;
    /**
     * @return {?}
     */
    function browserStaticPlatform() {
        if (isBlank(_angular_core.getPlatform())) {
            _angular_core.createPlatform(_angular_core.ReflectiveInjector.resolveAndCreate(BROWSER_PROVIDERS));
        }
        return _angular_core.assertPlatform(BROWSER_PLATFORM_MARKER);
    }
    /**
     *  See {@link bootstrap} for more information.
     * @param {?} appComponentType
     * @param {?=} customProviders
     * @param {?=} initReflector
     * @return {?}
     */
    function bootstrapStatic(appComponentType, customProviders, initReflector) {
        if (isPresent(initReflector)) {
            initReflector();
        }
        var /** @type {?} */ appProviders = isPresent(customProviders) ? [BROWSER_APP_STATIC_PROVIDERS, customProviders] :
            BROWSER_APP_STATIC_PROVIDERS;
        var /** @type {?} */ appInjector = _angular_core.ReflectiveInjector.resolveAndCreate(appProviders, browserStaticPlatform().injector);
        return _angular_core.coreLoadAndBootstrap(appInjector, appComponentType);
    }
    goog.module('_angular$platform_browser$src$platform__browser'); /**
     * @return {?}
     */
    function browserPlatform() {
        if (isBlank(_angular_core.getPlatform())) {
            _angular_core.createPlatform(_angular_core.ReflectiveInjector.resolveAndCreate(BROWSER_PROVIDERS));
        }
        return _angular_core.assertPlatform(BROWSER_PLATFORM_MARKER);
    }
    goog.module('_angular$platform_browser');
    exports.DomEventsPlugin = DomEventsPlugin;
    exports.EventManager = EventManager;
    exports.EVENT_MANAGER_PLUGINS = EVENT_MANAGER_PLUGINS;
    exports.ELEMENT_PROBE_PROVIDERS = ELEMENT_PROBE_PROVIDERS;
    exports.BROWSER_APP_COMMON_PROVIDERS = BROWSER_APP_COMMON_PROVIDERS;
    exports.BROWSER_SANITIZATION_PROVIDERS = BROWSER_SANITIZATION_PROVIDERS;
    exports.BROWSER_PROVIDERS = BROWSER_PROVIDERS;
    exports.By = By;
    exports.Title = Title;
    exports.enableDebugTools = enableDebugTools;
    exports.disableDebugTools = disableDebugTools;
    exports.HAMMER_GESTURE_CONFIG = HAMMER_GESTURE_CONFIG;
    exports.HammerGestureConfig = HammerGestureConfig;
    exports.DOCUMENT = DOCUMENT;
    exports.DomSanitizationService = DomSanitizationService;
    exports.SecurityContext = SecurityContext;
    exports.bootstrapStatic = bootstrapStatic;
    exports.browserStaticPlatform = browserStaticPlatform;
    exports.BROWSER_APP_STATIC_PROVIDERS = BROWSER_APP_STATIC_PROVIDERS;
    exports.BrowserPlatformLocation = BrowserPlatformLocation;
    exports.browserPlatform = browserPlatform;
}));
