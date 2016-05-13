goog.module('_angular$core$src$application__ref');
var ng_zone_1 = goog.require('_angular$core$src$zone$ng__zone');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var di_1 = goog.require('_angular$core$src$di');
var application_tokens_1 = goog.require('_angular$core$src$application__tokens');
var async_1 = goog.require('_angular$core$src$facade$async');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var testability_1 = goog.require('_angular$core$src$testability$testability');
var component_resolver_1 = goog.require('_angular$core$src$linker$component__resolver');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var console_1 = goog.require('_angular$core$src$console');
var profile_1 = goog.require('_angular$core$src$profile$profile');
/**
 *  Create an Angular zone.
 * @return {?}
 */
function createNgZone() {
    return new ng_zone_1.NgZone({ enableLongStackTrace: lang_1.assertionsEnabled() });
}
exports.createNgZone = createNgZone;
var /** @type {?} */ _platform;
var /** @type {?} */ _inPlatformCreate = false;
/**
 *  Creates a platform. Platforms have to be eagerly created via this function.
 * @param {?} injector
 * @return {?}
 */
function createPlatform(injector) {
    if (_inPlatformCreate) {
        throw new exceptions_1.BaseException('Already creating a platform...');
    }
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
        throw new exceptions_1.BaseException("There can be only one platform. Destroy the previous one to create a new one.");
    }
    lang_1.lockMode();
    _inPlatformCreate = true;
    try {
        _platform = injector.get(PlatformRef);
    }
    finally {
        _inPlatformCreate = false;
    }
    return _platform;
}
exports.createPlatform = createPlatform;
/**
 *  Checks that there currently is a platform which contains the given token as a provider.
 * @param {?} requiredToken
 * @return {?}
 */
function assertPlatform(requiredToken) {
    var /** @type {?} */ platform = getPlatform();
    if (lang_1.isBlank(platform)) {
        throw new exceptions_1.BaseException('Not platform exists!');
    }
    if (lang_1.isPresent(platform) && lang_1.isBlank(platform.injector.get(requiredToken, null))) {
        throw new exceptions_1.BaseException('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
exports.assertPlatform = assertPlatform;
/**
 *  Dispose the existing platform.
 * @return {?}
 */
function disposePlatform() {
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
        _platform.dispose();
    }
}
exports.disposePlatform = disposePlatform;
/**
 *  Returns the current platform.
 * @return {?}
 */
function getPlatform() {
    return lang_1.isPresent(_platform) && !_platform.disposed ? _platform : null;
}
exports.getPlatform = getPlatform;
/**
 *  Shortcut for ApplicationRef.bootstrap. Requires a platform the be created first.
 * @param {?} injector
 * @param {?} componentFactory
 * @return {?}
 */
function coreBootstrap(injector, componentFactory) {
    var /** @type {?} */ appRef = injector.get(ApplicationRef);
    return appRef.bootstrap(componentFactory);
}
exports.coreBootstrap = coreBootstrap;
/**
 *  Resolves the componentFactory for the given component, waits for asynchronous initializers and bootstraps the component. Requires a platform the be created first.
 * @param {?} injector
 * @param {?} componentType
 * @return {?}
 */
function coreLoadAndBootstrap(injector, componentType) {
    var /** @type {?} */ appRef = injector.get(ApplicationRef);
    return appRef.run(() => {
        var /** @type {?} */ componentResolver = injector.get(component_resolver_1.ComponentResolver);
        return async_1.PromiseWrapper
            .all([componentResolver.resolveComponent(componentType), appRef.waitForAsyncInitializers()])
            .then((arr) => appRef.bootstrap(arr[0]));
    });
}
exports.coreLoadAndBootstrap = coreLoadAndBootstrap;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link createPlatform}().
 */
class PlatformRef {
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    get injector() { throw exceptions_1.unimplemented(); }
    ;
    get disposed() { throw exceptions_1.unimplemented(); }
}
exports.PlatformRef = PlatformRef;
class PlatformRef_ extends PlatformRef {
    /**
     * @param {?} _injector
     */
    constructor(_injector) {
        super();
        this._injector = _injector;
        /** @internal */
        this._applications = [];
        /** @internal */
        this._disposeListeners = [];
        this._disposed = false;
        if (!_inPlatformCreate) {
            throw new exceptions_1.BaseException('Platforms have to be created via `createPlatform`!');
        }
        let inits = _injector.get(application_tokens_1.PLATFORM_INITIALIZER, null);
        if (lang_1.isPresent(inits))
            inits.forEach(init => init());
    }
    /**
     * @param {?} dispose
     * @return {?}
     */
    registerDisposeListener(dispose) { this._disposeListeners.push(dispose); }
    get injector() { return this._injector; }
    get disposed() { return this._disposed; }
    /**
     * @param {?} appRef
     * @return {?}
     */
    addApplication(appRef) { this._applications.push(appRef); }
    /**
     * @return {?}
     */
    dispose() {
        collection_1.ListWrapper.clone(this._applications).forEach((app) => app.dispose());
        this._disposeListeners.forEach((dispose) => dispose());
        this._disposed = true;
    }
    /**
     * @internal
     * @param {?} app
     * @return {?}
     */
    _applicationDisposed(app) { collection_1.ListWrapper.remove(this._applications, app); }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        PlatformRef_.prototype._applications;
        /** @internal
        @type {?} */
        PlatformRef_.prototype._disposeListeners;
        /** @type {?} */
        PlatformRef_.prototype._disposed;
        /** @type {?} */
        PlatformRef_.prototype._injector;
    }
}
PlatformRef_.decorators = [
    { type: di_1.Injectable },
];
PlatformRef_.ctorParameters = [
    { type: di_1.Injector, },
];
exports.PlatformRef_ = PlatformRef_;
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
class ApplicationRef {
    /**
     * Retrieve the application {@link Injector}.
     */
    get injector() { return (exceptions_1.unimplemented()); }
    ;
    /**
     * Retrieve the application {@link NgZone}.
     */
    get zone() { return (exceptions_1.unimplemented()); }
    ;
    /**
     * Get a list of component types registered to this application.
     */
    get componentTypes() { return (exceptions_1.unimplemented()); }
    ;
}
exports.ApplicationRef = ApplicationRef;
class ApplicationRef_ extends ApplicationRef {
    /**
     * @param {?} _platform
     * @param {?} _zone
     * @param {?} _injector
     */
    constructor(_platform, _zone, _injector) {
        super();
        this._platform = _platform;
        this._zone = _zone;
        this._injector = _injector;
        this._bootstrapListeners = [];
        this._disposeListeners = [];
        this._rootComponents = [];
        this._rootComponentTypes = [];
        this._changeDetectorRefs = [];
        this._runningTick = false;
        this._enforceNoNewChanges = false;
        var zone = _injector.get(ng_zone_1.NgZone);
        this._enforceNoNewChanges = lang_1.assertionsEnabled();
        zone.run(() => { this._exceptionHandler = _injector.get(exceptions_1.ExceptionHandler); });
        this._asyncInitDonePromise = this.run(() => {
            let inits = _injector.get(application_tokens_1.APP_INITIALIZER, null);
            var asyncInitResults = [];
            var asyncInitDonePromise;
            if (lang_1.isPresent(inits)) {
                for (var i = 0; i < inits.length; i++) {
                    var initResult = inits[i]();
                    if (lang_1.isPromise(initResult)) {
                        asyncInitResults.push(initResult);
                    }
                }
            }
            if (asyncInitResults.length > 0) {
                asyncInitDonePromise =
                    async_1.PromiseWrapper.all(asyncInitResults).then((_) => this._asyncInitDone = true);
                this._asyncInitDone = false;
            }
            else {
                this._asyncInitDone = true;
                asyncInitDonePromise = async_1.PromiseWrapper.resolve(true);
            }
            return asyncInitDonePromise;
        });
        async_1.ObservableWrapper.subscribe(zone.onError, (error) => {
            this._exceptionHandler.call(error.error, error.stackTrace);
        });
        async_1.ObservableWrapper.subscribe(this._zone.onMicrotaskEmpty, (_) => { this._zone.run(() => { this.tick(); }); });
    }
    /**
     * @param {?} listener
     * @return {?}
     */
    registerBootstrapListener(listener) {
        this._bootstrapListeners.push(listener);
    }
    /**
     * @param {?} dispose
     * @return {?}
     */
    registerDisposeListener(dispose) { this._disposeListeners.push(dispose); }
    /**
     * @param {?} changeDetector
     * @return {?}
     */
    registerChangeDetector(changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    }
    /**
     * @param {?} changeDetector
     * @return {?}
     */
    unregisterChangeDetector(changeDetector) {
        collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    }
    /**
     * @return {?}
     */
    waitForAsyncInitializers() { return this._asyncInitDonePromise; }
    /**
     * @param {?} callback
     * @return {?}
     */
    run(callback) {
        var /** @type {?} */ zone = this.injector.get(ng_zone_1.NgZone);
        var /** @type {?} */ result;
        // Note: Don't use zone.runGuarded as we want to know about
        // the thrown exception!
        // Note: the completer needs to be created outside
        // of `zone.run` as Dart swallows rejected promises
        // via the onError callback of the promise.
        var /** @type {?} */ completer = async_1.PromiseWrapper.completer();
        zone.run(() => {
            try {
                result = callback();
                if (lang_1.isPromise(result)) {
                    async_1.PromiseWrapper.then(result, (ref) => { completer.resolve(ref); }, (err, stackTrace) => {
                        completer.reject(err, stackTrace);
                        this._exceptionHandler.call(err, stackTrace);
                    });
                }
            }
            catch (e) {
                this._exceptionHandler.call(e, e.stack);
                throw e;
            }
        });
        return lang_1.isPromise(result) ? completer.promise : result;
    }
    /**
     * @param {?} componentFactory
     * @return {?}
     */
    bootstrap(componentFactory) {
        if (!this._asyncInitDone) {
            throw new exceptions_1.BaseException('Cannot bootstrap as there are still asynchronous initializers running. Wait for them using waitForAsyncInitializers().');
        }
        return this.run(() => {
            this._rootComponentTypes.push(componentFactory.componentType);
            var /** @type {?} */ compRef = componentFactory.create(this._injector, [], componentFactory.selector);
            compRef.onDestroy(() => { this._unloadComponent(compRef); });
            var /** @type {?} */ testability = compRef.injector.get(testability_1.Testability, null);
            if (lang_1.isPresent(testability)) {
                compRef.injector.get(testability_1.TestabilityRegistry)
                    .registerApplication(compRef.location.nativeElement, testability);
            }
            this._loadComponent(compRef);
            let /** @type {?} */ c = this._injector.get(console_1.Console);
            if (lang_1.assertionsEnabled()) {
                c.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
            }
            return compRef;
        });
    }
    /**
     * @internal
     * @param {?} componentRef
     * @return {?}
     */
    _loadComponent(componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        this._bootstrapListeners.forEach((listener) => listener(componentRef));
    }
    /**
     * @internal
     * @param {?} componentRef
     * @return {?}
     */
    _unloadComponent(componentRef) {
        if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        collection_1.ListWrapper.remove(this._rootComponents, componentRef);
    }
    get injector() { return this._injector; }
    get zone() { return this._zone; }
    /**
     * @return {?}
     */
    tick() {
        if (this._runningTick) {
            throw new exceptions_1.BaseException("ApplicationRef.tick is called recursively");
        }
        var /** @type {?} */ s = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach((detector) => detector.detectChanges());
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach((detector) => detector.checkNoChanges());
            }
        }
        finally {
            this._runningTick = false;
            profile_1.wtfLeave(s);
        }
    }
    /**
     * @return {?}
     */
    dispose() {
        // TODO(alxhub): Dispose of the NgZone.
        collection_1.ListWrapper.clone(this._rootComponents).forEach((ref) => ref.destroy());
        this._disposeListeners.forEach((dispose) => dispose());
        this._platform._applicationDisposed(this);
    }
    get componentTypes() { return this._rootComponentTypes; }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        ApplicationRef_._tickScope;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._bootstrapListeners;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._disposeListeners;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._rootComponents;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._rootComponentTypes;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._changeDetectorRefs;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._runningTick;
        /** @internal
        @type {?} */
        ApplicationRef_.prototype._enforceNoNewChanges;
        /** @type {?} */
        ApplicationRef_.prototype._exceptionHandler;
        /** @type {?} */
        ApplicationRef_.prototype._asyncInitDonePromise;
        /** @type {?} */
        ApplicationRef_.prototype._asyncInitDone;
        /** @type {?} */
        ApplicationRef_.prototype._platform;
        /** @type {?} */
        ApplicationRef_.prototype._zone;
        /** @type {?} */
        ApplicationRef_.prototype._injector;
    }
}
/** @internal */
ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
ApplicationRef_.decorators = [
    { type: di_1.Injectable },
];
ApplicationRef_.ctorParameters = [
    { type: PlatformRef_, },
    { type: ng_zone_1.NgZone, },
    { type: di_1.Injector, },
];
exports.ApplicationRef_ = ApplicationRef_;
/**
 * @internal
 */
exports.PLATFORM_CORE_PROVIDERS = 
/*@ts2dart_const*/ [
    PlatformRef_,
    /*@ts2dart_const*/ (
    /* @ts2dart_Provider */ { provide: PlatformRef, useExisting: PlatformRef_ })
];
/**
 * @internal
 */
exports.APPLICATION_CORE_PROVIDERS = [
    /* @ts2dart_Provider */ { provide: ng_zone_1.NgZone, useFactory: createNgZone, deps: [] },
    ApplicationRef_,
    /* @ts2dart_Provider */ { provide: ApplicationRef, useExisting: ApplicationRef_ }
];
//# sourceMappingURL=application_ref.js.map