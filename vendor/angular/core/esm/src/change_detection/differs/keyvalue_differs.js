goog.module('_angular$core$src$change__detection$differs$keyvalue__differs');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var di_1 = goog.require('_angular$core$src$di');
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 * @ts2dart_const
 */
class KeyValueDiffers {
    /**
     * @param {?} factories
     */
    constructor(factories) {
        this.factories = factories;
    }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    static create(factories, parent) {
        if (lang_1.isPresent(parent)) {
            var /** @type {?} */ copied = collection_1.ListWrapper.clone(parent.factories);
            factories = factories.concat(copied);
            return new KeyValueDiffers(factories);
        }
        else {
            return new KeyValueDiffers(factories);
        }
    }
    /**
     *  Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the inherited {@link KeyValueDiffers} instance with the provided factories and return a new {@link KeyValueDiffers} instance. * The following example shows how to extend an existing list of factories, which will only be applied to the injector for this component and its children. This step is all that's required to make a new {@link KeyValueDiffer} available. * ### Example * ```
     * @Component({ undefined viewProviders: [ KeyValueDiffers.extend([new ImmutableMapDiffer()]) ] }) ```
     * @param {?} factories
     * @return {?}
     */
    static extend(factories) {
        return new di_1.Provider(KeyValueDiffers, {
            useFactory: (parent) => {
                if (lang_1.isBlank(parent)) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new exceptions_1.BaseException('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
        });
    }
    /**
     * @param {?} kv
     * @return {?}
     */
    find(kv) {
        var /** @type {?} */ factory = this.factories.find(f => f.supports(kv));
        if (lang_1.isPresent(factory)) {
            return factory;
        }
        else {
            throw new exceptions_1.BaseException(`Cannot find a differ supporting object '${kv}'`);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        KeyValueDiffers.prototype.factories;
    }
}
exports.KeyValueDiffers = KeyValueDiffers;
//# sourceMappingURL=keyvalue_differs.js.map