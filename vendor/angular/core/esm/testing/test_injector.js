goog.module('_angular$core$testing$test__injector');
var index_1 = goog.require('_angular$core');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var async_1 = goog.require('_angular$core$testing$async');
var async_test_completer_1 = goog.require('_angular$core$testing$async__test__completer');
var async_2 = async_1;
exports.async = async_2.async;
class TestInjector {
    constructor() {
        this._instantiated = false;
        this._injector = null;
        this._providers = [];
        this.platformProviders = [];
        this.applicationProviders = [];
    }
    /**
     * @return {?}
     */
    reset() {
        this._injector = null;
        this._providers = [];
        this._instantiated = false;
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    addProviders(providers) {
        if (this._instantiated) {
            throw new exceptions_1.BaseException('Cannot add providers after test injector is instantiated');
        }
        this._providers = collection_1.ListWrapper.concat(this._providers, providers);
    }
    /**
     * @return {?}
     */
    createInjector() {
        var /** @type {?} */ rootInjector = index_1.ReflectiveInjector.resolveAndCreate(this.platformProviders);
        this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(this.applicationProviders, this._providers));
        this._instantiated = true;
        return this._injector;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        if (!this._instantiated) {
            this.createInjector();
        }
        return this._injector.get(token);
    }
    /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    execute(tokens, fn) {
        if (!this._instantiated) {
            this.createInjector();
        }
        var /** @type {?} */ params = tokens.map(t => this._injector.get(t));
        return lang_1.FunctionWrapper.apply(fn, params);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        TestInjector.prototype._instantiated;
        /** @type {?} */
        TestInjector.prototype._injector;
        /** @type {?} */
        TestInjector.prototype._providers;
        /** @type {?} */
        TestInjector.prototype.platformProviders;
        /** @type {?} */
        TestInjector.prototype.applicationProviders;
    }
}
exports.TestInjector = TestInjector;
var /** @type {?} */ _testInjector = null;
/**
 * @return {?}
 */
function getTestInjector() {
    if (_testInjector == null) {
        _testInjector = new TestInjector();
    }
    return _testInjector;
}
exports.getTestInjector = getTestInjector;
/**
 *  Set the providers that the test injector should use. These should be providers common to every test in the suite. * This may only be called once, to set up the common providers for the current test suite on teh current platform. If you absolutely need to change the providers, first use `resetBaseTestProviders`. * Test Providers for individual platforms are available from 'angular2/platform/testing/<platform_name>'.
 * @param {?} platformProviders
 * @param {?} applicationProviders
 * @return {?}
 */
function setBaseTestProviders(platformProviders, applicationProviders) {
    var /** @type {?} */ testInjector = getTestInjector();
    if (testInjector.platformProviders.length > 0 || testInjector.applicationProviders.length > 0) {
        throw new exceptions_1.BaseException('Cannot set base providers because it has already been called');
    }
    testInjector.platformProviders = platformProviders;
    testInjector.applicationProviders = applicationProviders;
    var /** @type {?} */ injector = testInjector.createInjector();
    let /** @type {?} */ inits = injector.get(index_1.PLATFORM_INITIALIZER, null);
    if (lang_1.isPresent(inits)) {
        inits.forEach(init => init());
    }
    testInjector.reset();
}
exports.setBaseTestProviders = setBaseTestProviders;
/**
 *  Reset the providers for the test injector.
 * @return {?}
 */
function resetBaseTestProviders() {
    var /** @type {?} */ testInjector = getTestInjector();
    testInjector.platformProviders = [];
    testInjector.applicationProviders = [];
    testInjector.reset();
}
exports.resetBaseTestProviders = resetBaseTestProviders;
/**
 *  Allows injecting dependencies in `beforeEach()` and `it()`. * Example: * ``` beforeEach(inject([Dependency, AClass], (dep, object) => { // some code that uses `dep` and `object` // ... })); * it('...', inject([AClass], (object) => { object.doSomething(); expect(...); }) ``` * Notes: - inject is currently a function because of some Traceur limitation the syntax should eventually becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });` *
 * @param {?} tokens
 * @param {?} fn
 * @return {?}
 */
function inject(tokens, fn) {
    let /** @type {?} */ testInjector = getTestInjector();
    if (tokens.indexOf(async_test_completer_1.AsyncTestCompleter) >= 0) {
        // Return an async test method that returns a Promise if AsyncTestCompleter is one of the
        // injected tokens.
        return () => {
            let /** @type {?} */ completer = testInjector.get(async_test_completer_1.AsyncTestCompleter);
            testInjector.execute(tokens, fn);
            return completer.promise;
        };
    }
    else {
        // Return a synchronous test method with the injected tokens.
        return () => { return getTestInjector().execute(tokens, fn); };
    }
}
exports.inject = inject;
class InjectSetupWrapper {
    /**
     * @param {?} _providers
     */
    constructor(_providers) {
        this._providers = _providers;
    }
    /**
     * @return {?}
     */
    _addProviders() {
        var /** @type {?} */ additionalProviders = this._providers();
        if (additionalProviders.length > 0) {
            getTestInjector().addProviders(additionalProviders);
        }
    }
    /**
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    inject(tokens, fn) {
        return () => {
            this._addProviders();
            return inject_impl(tokens, fn)();
        };
    }
    /**
     * @Deprecated {use async(withProviders().inject())}
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    injectAsync(tokens, fn) {
        return () => {
            this._addProviders();
            return injectAsync_impl(tokens, fn)();
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        InjectSetupWrapper.prototype._providers;
    }
}
exports.InjectSetupWrapper = InjectSetupWrapper;
/**
 * @param {?} providers
 * @return {?}
 */
function withProviders(providers) {
    return new InjectSetupWrapper(providers);
}
exports.withProviders = withProviders;
/**
 * @Deprecated {use async(inject())} * Allows injecting dependencies in `beforeEach()` and `it()`. The test must return a promise which will resolve when all asynchronous activity is complete. * Example: * ``` it('...', injectAsync([AClass], (object) => { return object.doSomething().then(() => { expect(...); }); }) ``` *
 * @param {?} tokens
 * @param {?} fn
 * @return {?}
 */
function injectAsync(tokens, fn) {
    return async_1.async(inject(tokens, fn));
}
exports.injectAsync = injectAsync;
// This is to ensure inject(Async) within InjectSetupWrapper doesn't call itself
// when transpiled to Dart.
var /** @type {?} */ inject_impl = inject;
var /** @type {?} */ injectAsync_impl = injectAsync;
//# sourceMappingURL=test_injector.js.map