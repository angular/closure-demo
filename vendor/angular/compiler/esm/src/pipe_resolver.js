goog.module('_angular$compiler$src$pipe__resolver');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
/**
 * @param {?} type
 * @return {?}
 */
function _isPipeMetadata(type) {
    return type instanceof core_1.PipeMetadata;
}
class PipeResolver {
    /**
     * @param {?=} _reflector
     */
    constructor(_reflector) {
        if (lang_1.isPresent(_reflector)) {
            this._reflector = _reflector;
        }
        else {
            this._reflector = core_1.reflector;
        }
    }
    /**
     *  Return {@link PipeMetadata} for a given `Type`.
     * @param {?} type
     * @return {?}
     */
    resolve(type) {
        var /** @type {?} */ metas = this._reflector.annotations(core_1.resolveForwardRef(type));
        if (lang_1.isPresent(metas)) {
            var /** @type {?} */ annotation = metas.find(_isPipeMetadata);
            if (lang_1.isPresent(annotation)) {
                return annotation;
            }
        }
        throw new exceptions_1.BaseException(`No Pipe decorator found on ${lang_1.stringify(type)}`);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        PipeResolver.prototype._reflector;
    }
}
PipeResolver.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ PipeResolver.ctorParameters = [
    { type: core_private_1.ReflectorReader, },
];
exports.PipeResolver = PipeResolver;
exports.CODEGEN_PIPE_RESOLVER = new PipeResolver(core_1.reflector);
//# sourceMappingURL=pipe_resolver.js.map