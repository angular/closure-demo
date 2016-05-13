goog.module('_angular$core$src$change__detection$differs$iterable__differs');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var di_1 = goog.require('_angular$core$src$di');
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 * @ts2dart_const
 */
class IterableDiffers {
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
            return new IterableDiffers(factories);
        }
        else {
            return new IterableDiffers(factories);
        }
    }
    /**
     *  Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the inherited {@link IterableDiffers} instance with the provided factories and return a new {@link IterableDiffers} instance. * The following example shows how to extend an existing list of factories, which will only be applied to the injector for this component and its children. This step is all that's required to make a new {@link IterableDiffer} available. * ### Example * ```
     * @Component({ undefined viewProviders: [ IterableDiffers.extend([new ImmutableListDiffer()]) ] }) ```
     * @param {?} factories
     * @return {?}
     */
    static extend(factories) {
        return new di_1.Provider(IterableDiffers, {
            useFactory: (parent) => {
                if (lang_1.isBlank(parent)) {
                    // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new exceptions_1.BaseException('Cannot extend IterableDiffers without a parent injector');
                }
                return IterableDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[IterableDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
        });
    }
    /**
     * @param {?} iterable
     * @return {?}
     */
    find(iterable) {
        var /** @type {?} */ factory = this.factories.find(f => f.supports(iterable));
        if (lang_1.isPresent(factory)) {
            return factory;
        }
        else {
            throw new exceptions_1.BaseException(`Cannot find a differ supporting object '${iterable}' of type '${lang_1.getTypeNameForDebugging(iterable)}'`);
        }
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        IterableDiffers.prototype.factories;
    }
}
exports.IterableDiffers = IterableDiffers;
//# sourceMappingURL=iterable_differs.js.map