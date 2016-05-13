goog.module('_angular$compiler$src$parse__util');
class ParseLocation {
    /**
     * @param {?} file
     * @param {?} offset
     * @param {?} line
     * @param {?} col
     */
    constructor(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
    /**
     * @return {?}
     */
    toString() { return `${this.file.url}@${this.line}:${this.col}`; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ParseLocation.prototype.file;
        /** @type {?} */
        ParseLocation.prototype.offset;
        /** @type {?} */
        ParseLocation.prototype.line;
        /** @type {?} */
        ParseLocation.prototype.col;
    }
}
exports.ParseLocation = ParseLocation;
class ParseSourceFile {
    /**
     * @param {?} content
     * @param {?} url
     */
    constructor(content, url) {
        this.content = content;
        this.url = url;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ParseSourceFile.prototype.content;
        /** @type {?} */
        ParseSourceFile.prototype.url;
    }
}
exports.ParseSourceFile = ParseSourceFile;
class ParseSourceSpan {
    /**
     * @param {?} start
     * @param {?} end
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    /**
     * @return {?}
     */
    toString() {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ParseSourceSpan.prototype.start;
        /** @type {?} */
        ParseSourceSpan.prototype.end;
    }
}
exports.ParseSourceSpan = ParseSourceSpan;
exports.ParseErrorLevel = {};
exports.ParseErrorLevel.WARNING = 0;
exports.ParseErrorLevel.FATAL = 1;
exports.ParseErrorLevel[exports.ParseErrorLevel.WARNING] = "WARNING";
exports.ParseErrorLevel[exports.ParseErrorLevel.FATAL] = "FATAL";
class ParseError {
    /**
     * @param {?} span
     * @param {?} msg
     * @param {?=} level
     */
    constructor(span, msg, level = exports.ParseErrorLevel.FATAL) {
        this.span = span;
        this.msg = msg;
        this.level = level;
    }
    /**
     * @return {?}
     */
    toString() {
        var /** @type {?} */ source = this.span.start.file.content;
        var /** @type {?} */ ctxStart = this.span.start.offset;
        if (ctxStart > source.length - 1) {
            ctxStart = source.length - 1;
        }
        var /** @type {?} */ ctxEnd = ctxStart;
        var /** @type {?} */ ctxLen = 0;
        var /** @type {?} */ ctxLines = 0;
        while (ctxLen < 100 && ctxStart > 0) {
            ctxStart--;
            ctxLen++;
            if (source[ctxStart] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        ctxLen = 0;
        ctxLines = 0;
        while (ctxLen < 100 && ctxEnd < source.length - 1) {
            ctxEnd++;
            ctxLen++;
            if (source[ctxEnd] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        let /** @type {?} */ context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
            source.substring(this.span.start.offset, ctxEnd + 1);
        return `${this.msg} ("${context}"): ${this.span.start}`;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ParseError.prototype.span;
        /** @type {?} */
        ParseError.prototype.msg;
        /** @type {?} */
        ParseError.prototype.level;
    }
}
exports.ParseError = ParseError;
//# sourceMappingURL=parse_util.js.map