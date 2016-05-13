goog.module('_angular$core$src$di$reflective__exceptions');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
/**
 * @param {?} keys
 * @return {?}
 */
function findFirstClosedCycle(keys) {
    var /** @type {?} */ res = [];
    for (var /** @type {?} */ i = 0; i < keys.length; ++i) {
        if (collection_1.ListWrapper.contains(res, keys[i])) {
            res.push(keys[i]);
            return res;
        }
        else {
            res.push(keys[i]);
        }
    }
    return res;
}
/**
 * @param {?} keys
 * @return {?}
 */
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        var /** @type {?} */ reversed = findFirstClosedCycle(collection_1.ListWrapper.reversed(keys));
        var /** @type {?} */ tokenStrs = reversed.map(k => lang_1.stringify(k.token));
        return " (" + tokenStrs.join(' -> ') + ")";
    }
    else {
        return "";
    }
}
/**
 * Base class for all errors arising from misconfigured providers.
 */
class AbstractProviderError extends exceptions_1.BaseException {
    /**
     * @param {?} injector
     * @param {?} key
     * @param {?} constructResolvingMessage
     */
    constructor(injector, key, constructResolvingMessage) {
        super("DI Exception");
        this.keys = [key];
        this.injectors = [injector];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    }
    get context() { return this.injectors[this.injectors.length - 1].debugContext(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        AbstractProviderError.prototype.message;
        /** @internal
        @type {?} */
        AbstractProviderError.prototype.keys;
        /** @internal
        @type {?} */
        AbstractProviderError.prototype.injectors;
        /** @internal
        @type {?} */
        AbstractProviderError.prototype.constructResolvingMessage;
    }
}
exports.AbstractProviderError = AbstractProviderError;
/**
 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
 * {@link Injector} does not have a {@link Provider} for {@link Key}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 */
class NoProviderError extends AbstractProviderError {
    /**
     * @param {?} injector
     * @param {?} key
     */
    constructor(injector, key) {
        super(injector, key, function (keys) {
            var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
            return `No provider for ${first}!${constructResolvingPath(keys)}`;
        });
    }
}
exports.NoProviderError = NoProviderError;
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   provide("one", {useFactory: (two) => "two", deps: [[new Inject("two")]]}),
 *   provide("two", {useFactory: (one) => "one", deps: [[new Inject("one")]]})
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 */
class CyclicDependencyError extends AbstractProviderError {
    /**
     * @param {?} injector
     * @param {?} key
     */
    constructor(injector, key) {
        super(injector, key, function (keys) {
            return `Cannot instantiate cyclic dependency!${constructResolvingPath(keys)}`;
        });
    }
}
exports.CyclicDependencyError = CyclicDependencyError;
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);

 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 */
class InstantiationError extends exceptions_1.WrappedException {
    /**
     * @param {?} injector
     * @param {?} originalException
     * @param {?} originalStack
     * @param {?} key
     */
    constructor(injector, originalException, originalStack, key) {
        super("DI Exception", originalException, originalStack, null);
        this.keys = [key];
        this.injectors = [injector];
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
    }
    get wrapperMessage() {
        var /** @type {?} */ first = lang_1.stringify(collection_1.ListWrapper.first(this.keys).token);
        return `Error during instantiation of ${first}!${constructResolvingPath(this.keys)}.`;
    }
    get causeKey() { return this.keys[0]; }
    get context() { return this.injectors[this.injectors.length - 1].debugContext(); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        InstantiationError.prototype.keys;
        /** @internal
        @type {?} */
        InstantiationError.prototype.injectors;
    }
}
exports.InstantiationError = InstantiationError;
/**
 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 */
class InvalidProviderError extends exceptions_1.BaseException {
    /**
     * @param {?} provider
     */
    constructor(provider) {
        super("Invalid provider - only instances of Provider and Type are allowed, got: " +
            provider.toString());
    }
}
exports.InvalidProviderError = InvalidProviderError;
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 */
class NoAnnotationError extends exceptions_1.BaseException {
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     */
    constructor(typeOrFunc, params) {
        super(NoAnnotationError._genMessage(typeOrFunc, params));
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     * @return {?}
     */
    static _genMessage(typeOrFunc, params) {
        var /** @type {?} */ signature = [];
        for (var /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
            var /** @type {?} */ parameter = params[i];
            if (lang_1.isBlank(parameter) || parameter.length == 0) {
                signature.push('?');
            }
            else {
                signature.push(parameter.map(lang_1.stringify).join(' '));
            }
        }
        return "Cannot resolve all parameters for '" + lang_1.stringify(typeOrFunc) + "'(" +
            signature.join(', ') + "). " +
            "Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" +
            lang_1.stringify(typeOrFunc) + "' is decorated with Injectable.";
    }
}
exports.NoAnnotationError = NoAnnotationError;
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 */
class OutOfBoundsError extends exceptions_1.BaseException {
    /**
     * @param {?} index
     */
    constructor(index) {
        super(`Index ${index} is out-of-bounds.`);
    }
}
exports.OutOfBoundsError = OutOfBoundsError;
// TODO: add a working example after alpha38 is released
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   new Provider("Strings", {useValue: "string1", multi: true}),
 *   new Provider("Strings", {useValue: "string2", multi: false})
 * ])).toThrowError();
 * ```
 */
class MixingMultiProvidersWithRegularProvidersError extends exceptions_1.BaseException {
    /**
     * @param {?} provider1
     * @param {?} provider2
     */
    constructor(provider1, provider2) {
        super("Cannot mix multi providers and regular providers, got: " + provider1.toString() + " " +
            provider2.toString());
    }
}
exports.MixingMultiProvidersWithRegularProvidersError = MixingMultiProvidersWithRegularProvidersError;
//# sourceMappingURL=reflective_exceptions.js.map