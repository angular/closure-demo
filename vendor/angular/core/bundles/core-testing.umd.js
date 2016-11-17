/**
 * @license Angular v0.0.0-PLACEHOLDER
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.core = global.ng.core || {}, global.ng.core.testing = global.ng.core.testing || {}),global.ng.core));
}(this, function (exports,_angular_core) { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ _global = ((typeof window === 'undefined' ? global : window));
    /**
     *  Wraps a test function in an asynchronous test zone. The test will automatically complete when all asynchronous calls within this zone are done. Can be used to wrap an {@link inject} call. * Example: * ``` it('...', async(inject([AClass], (object) => { object.doSomething.then(() => { expect(...); }) }); ``` *
     * @param {?} fn
     * @return {?}
     */
    function async(fn) {
        // If we're running using the Jasmine test framework, adapt to call the 'done'
        // function when asynchronous activity is finished.
        if (_global.jasmine) {
            return function (done) {
                if (!done) {
                    // if we run beforeEach in @angular/core/testing/testing_internal then we get no done
                    // fake it here and assume sync.
                    done = function () { };
                    done.fail = function (e) { throw e; };
                }
                runInTestZone(fn, done, function (err) {
                    if (typeof err === 'string') {
                        return done.fail(new Error(/** @type {?} */ (err)));
                    }
                    else {
                        done.fail(err);
                    }
                });
            };
        }
        // Otherwise, return a promise which will resolve when asynchronous activity
        // is finished. This will be correctly consumed by the Mocha framework with
        // it('...', async(myFn)); or can be used in a custom framework.
        return function () { return new Promise(function (finishCallback, failCallback) {
            runInTestZone(fn, finishCallback, failCallback);
        }); };
    }
    /**
     * @param {?} fn
     * @param {?} finishCallback
     * @param {?} failCallback
     * @return {?}
     */
    function runInTestZone(fn, finishCallback, failCallback) {
        var /** @type {?} */ currentZone = Zone.current;
        var /** @type {?} */ AsyncTestZoneSpec = ((Zone))['AsyncTestZoneSpec'];
        if (AsyncTestZoneSpec === undefined) {
            throw new Error('AsyncTestZoneSpec is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/dist/async-test.js');
        }
        var /** @type {?} */ ProxyZoneSpec = (((Zone))['ProxyZoneSpec']);
        if (ProxyZoneSpec === undefined) {
            throw new Error('ProxyZoneSpec is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/dist/proxy.js');
        }
        var /** @type {?} */ proxyZoneSpec = ProxyZoneSpec.get();
        ProxyZoneSpec.assertPresent();
        // We need to create the AsyncTestZoneSpec outside the ProxyZone.
        // If we do it in ProxyZone then we will get to infinite recursion.
        var /** @type {?} */ proxyZone = Zone.current.getZoneWith('ProxyZoneSpec');
        var /** @type {?} */ previousDelegate = proxyZoneSpec.getDelegate();
        proxyZone.parent.run(function () {
            var /** @type {?} */ testZoneSpec = new AsyncTestZoneSpec(function () {
                // Need to restore the original zone.
                currentZone.run(function () {
                    if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                        // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                        proxyZoneSpec.setDelegate(previousDelegate);
                    }
                    finishCallback();
                });
            }, function (error) {
                // Need to restore the original zone.
                currentZone.run(function () {
                    if (proxyZoneSpec.getDelegate() == testZoneSpec) {
                        // Only reset the zone spec if it's sill this one. Otherwise, assume it's OK.
                        proxyZoneSpec.setDelegate(previousDelegate);
                    }
                    failCallback(error);
                });
            }, 'test');
            proxyZoneSpec.setDelegate(testZoneSpec);
        });
        return Zone.current.runGuarded(fn);
    }

    /**
     * @param {?} fn
     * @return {?}
     */
    function scheduleMicroTask(fn) {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (token == null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return token.overriddenName;
        }
        if (token.name) {
            return token.name;
        }
        var /** @type {?} */ res = token.toString();
        var /** @type {?} */ newLineIndex = res.indexOf('\n');
        return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }

    /**
     * Fixture for debugging and testing a component.
     *
     * @stable
     */
    var ComponentFixture = (function () {
        /**
         * @param {?} componentRef
         * @param {?} ngZone
         * @param {?} _autoDetect
         */
        function ComponentFixture(componentRef, ngZone, _autoDetect) {
            var _this = this;
            this.componentRef = componentRef;
            this.ngZone = ngZone;
            this._autoDetect = _autoDetect;
            this._isStable = true;
            this._isDestroyed = false;
            this._promise = null;
            this._onUnstableSubscription = null;
            this._onStableSubscription = null;
            this._onMicrotaskEmptySubscription = null;
            this._onErrorSubscription = null;
            this.changeDetectorRef = componentRef.changeDetectorRef;
            this.elementRef = componentRef.location;
            this.debugElement = _angular_core.getDebugNode(this.elementRef.nativeElement);
            this.componentInstance = componentRef.instance;
            this.nativeElement = this.elementRef.nativeElement;
            this.componentRef = componentRef;
            this.ngZone = ngZone;
            if (ngZone != null) {
                this._onUnstableSubscription =
                    ngZone.onUnstable.subscribe({ next: function () { _this._isStable = false; } });
                this._onMicrotaskEmptySubscription = ngZone.onMicrotaskEmpty.subscribe({
                    next: function () {
                        if (_this._autoDetect) {
                            // Do a change detection run with checkNoChanges set to true to check
                            // there are no changes on the second run.
                            _this.detectChanges(true);
                        }
                    }
                });
                this._onStableSubscription = ngZone.onStable.subscribe({
                    next: function () {
                        _this._isStable = true;
                        // Check whether there is a pending whenStable() completer to resolve.
                        if (_this._promise !== null) {
                            // If so check whether there are no pending macrotasks before resolving.
                            // Do this check in the next tick so that ngZone gets a chance to update the state of
                            // pending macrotasks.
                            scheduleMicroTask(function () {
                                if (!_this.ngZone.hasPendingMacrotasks) {
                                    if (_this._promise !== null) {
                                        _this._resolve(true);
                                        _this._resolve = null;
                                        _this._promise = null;
                                    }
                                }
                            });
                        }
                    }
                });
                this._onErrorSubscription =
                    ngZone.onError.subscribe({ next: function (error) { throw error; } });
            }
        }
        /**
         * @param {?} checkNoChanges
         * @return {?}
         */
        ComponentFixture.prototype._tick = function (checkNoChanges) {
            this.changeDetectorRef.detectChanges();
            if (checkNoChanges) {
                this.checkNoChanges();
            }
        };
        /**
         *  Trigger a change detection cycle for the component.
         * @param {?=} checkNoChanges
         * @return {?}
         */
        ComponentFixture.prototype.detectChanges = function (checkNoChanges) {
            var _this = this;
            if (checkNoChanges === void 0) { checkNoChanges = true; }
            if (this.ngZone != null) {
                // Run the change detection inside the NgZone so that any async tasks as part of the change
                // detection are captured by the zone and can be waited for in isStable.
                this.ngZone.run(function () { _this._tick(checkNoChanges); });
            }
            else {
                // Running without zone. Just do the change detection.
                this._tick(checkNoChanges);
            }
        };
        /**
         *  Do a change detection run to make sure there were no changes.
         * @return {?}
         */
        ComponentFixture.prototype.checkNoChanges = function () { this.changeDetectorRef.checkNoChanges(); };
        /**
         *  Set whether the fixture should autodetect changes. * Also runs detectChanges once so that any existing change is detected.
         * @param {?=} autoDetect
         * @return {?}
         */
        ComponentFixture.prototype.autoDetectChanges = function (autoDetect) {
            if (autoDetect === void 0) { autoDetect = true; }
            if (this.ngZone == null) {
                throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
            }
            this._autoDetect = autoDetect;
            this.detectChanges();
        };
        /**
         *  Return whether the fixture is currently stable or has async tasks that have not been completed yet.
         * @return {?}
         */
        ComponentFixture.prototype.isStable = function () { return this._isStable && !this.ngZone.hasPendingMacrotasks; };
        /**
         *  Get a promise that resolves when the fixture is stable. * This can be used to resume testing after events have triggered asynchronous activity or asynchronous change detection.
         * @return {?}
         */
        ComponentFixture.prototype.whenStable = function () {
            var _this = this;
            if (this.isStable()) {
                return Promise.resolve(false);
            }
            else if (this._promise !== null) {
                return this._promise;
            }
            else {
                this._promise = new Promise(function (res) { _this._resolve = res; });
                return this._promise;
            }
        };
        /**
         *  Trigger component destruction.
         * @return {?}
         */
        ComponentFixture.prototype.destroy = function () {
            if (!this._isDestroyed) {
                this.componentRef.destroy();
                if (this._onUnstableSubscription != null) {
                    this._onUnstableSubscription.unsubscribe();
                    this._onUnstableSubscription = null;
                }
                if (this._onStableSubscription != null) {
                    this._onStableSubscription.unsubscribe();
                    this._onStableSubscription = null;
                }
                if (this._onMicrotaskEmptySubscription != null) {
                    this._onMicrotaskEmptySubscription.unsubscribe();
                    this._onMicrotaskEmptySubscription = null;
                }
                if (this._onErrorSubscription != null) {
                    this._onErrorSubscription.unsubscribe();
                    this._onErrorSubscription = null;
                }
                this._isDestroyed = true;
            }
        };
        ComponentFixture._tsickle_typeAnnotationsHelper = function () {
            /** The DebugElement associated with the root element of this component.
            @type {?} */
            ComponentFixture.prototype.debugElement;
            /** The instance of the root component class.
            @type {?} */
            ComponentFixture.prototype.componentInstance;
            /** The native element at the root of the component.
            @type {?} */
            ComponentFixture.prototype.nativeElement;
            /** The ElementRef for the element at the root of the component.
            @type {?} */
            ComponentFixture.prototype.elementRef;
            /** The ChangeDetectorRef for the component
            @type {?} */
            ComponentFixture.prototype.changeDetectorRef;
            /** @type {?} */
            ComponentFixture.prototype._isStable;
            /** @type {?} */
            ComponentFixture.prototype._isDestroyed;
            /** @type {?} */
            ComponentFixture.prototype._resolve;
            /** @type {?} */
            ComponentFixture.prototype._promise;
            /** @type {?} */
            ComponentFixture.prototype._onUnstableSubscription;
            /** @type {?} */
            ComponentFixture.prototype._onStableSubscription;
            /** @type {?} */
            ComponentFixture.prototype._onMicrotaskEmptySubscription;
            /** @type {?} */
            ComponentFixture.prototype._onErrorSubscription;
            /** @type {?} */
            ComponentFixture.prototype.componentRef;
            /** @type {?} */
            ComponentFixture.prototype.ngZone;
            /** @type {?} */
            ComponentFixture.prototype._autoDetect;
        };
        return ComponentFixture;
    }());

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var /** @type {?} */ FakeAsyncTestZoneSpec = ((Zone))['FakeAsyncTestZoneSpec'];
    var /** @type {?} */ ProxyZoneSpec = ((Zone))['ProxyZoneSpec'];
    var /** @type {?} */ _fakeAsyncTestZoneSpec = null;
    /**
     *  Clears out the shared fake async zone for a test. To be called in a global `beforeEach`. *
     * @return {?}
     */
    function resetFakeAsyncZone() {
        _fakeAsyncTestZoneSpec = null;
        ProxyZoneSpec.assertPresent().resetDelegate();
    }
    var /** @type {?} */ _inFakeAsyncCall = false;
    /**
     *  Wraps a function to be executed in the fakeAsync zone: - microtasks are manually executed by calling `flushMicrotasks()`, - timers are synchronous, `tick()` simulates the asynchronous passage of time. * If there are any pending timers at the end of the function, an exception will be thrown. * Can be used to wrap inject() calls. * ## Example * {@example testing/ts/fake_async.ts region='basic'} *
     * @param {?} fn undefined *
     * @return {?}
     */
    function fakeAsync(fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var /** @type {?} */ proxyZoneSpec = ProxyZoneSpec.assertPresent();
            if (_inFakeAsyncCall) {
                throw new Error('fakeAsync() calls can not be nested');
            }
            _inFakeAsyncCall = true;
            try {
                if (!_fakeAsyncTestZoneSpec) {
                    if (proxyZoneSpec.getDelegate() instanceof FakeAsyncTestZoneSpec) {
                        throw new Error('fakeAsync() calls can not be nested');
                    }
                    _fakeAsyncTestZoneSpec = new FakeAsyncTestZoneSpec();
                }
                var /** @type {?} */ res = void 0;
                var /** @type {?} */ lastProxyZoneSpec = proxyZoneSpec.getDelegate();
                proxyZoneSpec.setDelegate(_fakeAsyncTestZoneSpec);
                try {
                    res = fn.apply(void 0, args);
                    flushMicrotasks();
                }
                finally {
                    proxyZoneSpec.setDelegate(lastProxyZoneSpec);
                }
                if (_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length > 0) {
                    throw new Error((_fakeAsyncTestZoneSpec.pendingPeriodicTimers.length + " ") +
                        "periodic timer(s) still in the queue.");
                }
                if (_fakeAsyncTestZoneSpec.pendingTimers.length > 0) {
                    throw new Error(_fakeAsyncTestZoneSpec.pendingTimers.length + " timer(s) still in the queue.");
                }
                return res;
            }
            finally {
                _inFakeAsyncCall = false;
                resetFakeAsyncZone();
            }
        };
    }
    /**
     * @return {?}
     */
    function _getFakeAsyncZoneSpec() {
        if (_fakeAsyncTestZoneSpec == null) {
            throw new Error('The code should be running in the fakeAsync zone to call this function');
        }
        return _fakeAsyncTestZoneSpec;
    }
    /**
     *  Simulates the asynchronous passage of time for the timers in the fakeAsync zone. * The microtasks queue is drained at the very start of this function and after any timer callback has been executed. * ## Example * {@example testing/ts/fake_async.ts region='basic'} *
     * @param {?=} millis
     * @return {?}
     */
    function tick(millis) {
        if (millis === void 0) { millis = 0; }
        _getFakeAsyncZoneSpec().tick(millis);
    }
    /**
     *  Discard all remaining periodic tasks. *
     * @return {?}
     */
    function discardPeriodicTasks() {
        var /** @type {?} */ zoneSpec = _getFakeAsyncZoneSpec();
        var /** @type {?} */ pendingTimers = zoneSpec.pendingPeriodicTimers;
        zoneSpec.pendingPeriodicTimers.length = 0;
    }
    /**
     *  Flush any pending microtasks. *
     * @return {?}
     */
    function flushMicrotasks() {
        _getFakeAsyncZoneSpec().flushMicrotasks();
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
     */
    var AsyncTestCompleter = (function () {
        function AsyncTestCompleter() {
            var _this = this;
            this._promise = new Promise(function (res, rej) {
                _this._resolve = res;
                _this._reject = rej;
            });
        }
        /**
         * @param {?=} value
         * @return {?}
         */
        AsyncTestCompleter.prototype.done = function (value) { this._resolve(value); };
        /**
         * @param {?=} error
         * @param {?=} stackTrace
         * @return {?}
         */
        AsyncTestCompleter.prototype.fail = function (error, stackTrace) { this._reject(error); };
        Object.defineProperty(AsyncTestCompleter.prototype, "promise", {
            get: function () { return this._promise; },
            enumerable: true,
            configurable: true
        });
        AsyncTestCompleter._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            AsyncTestCompleter.prototype._resolve;
            /** @type {?} */
            AsyncTestCompleter.prototype._reject;
            /** @type {?} */
            AsyncTestCompleter.prototype._promise;
        };
        return AsyncTestCompleter;
    }());

    var __extends$1 = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * @license undefined Copyright Google Inc. All Rights Reserved. * Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license
     * @return {?}
     */
    function unimplemented() {
        throw new Error('unimplemented');
    }
    /**
     * @stable
     */
    var BaseError = (function (_super) {
        __extends$1(BaseError, _super);
        /**
         * @param {?} message
         */
        function BaseError(message) {
            // Errors don't use current this, instead they create a new instance.
            // We have to do forward all of our api to the nativeInstance.
            var nativeError = _super.call(this, message);
            this._nativeError = nativeError;
        }
        Object.defineProperty(BaseError.prototype, "message", {
            get: function () { return this._nativeError.message; },
            set: function (message) { this._nativeError.message = message; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseError.prototype, "name", {
            get: function () { return this._nativeError.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseError.prototype, "stack", {
            get: function () { return ((this._nativeError)).stack; },
            set: function (value) { ((this._nativeError)).stack = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BaseError.prototype.toString = function () { return this._nativeError.toString(); };
        BaseError._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            BaseError.prototype._nativeError;
        };
        return BaseError;
    }(Error));
    /**
     * @stable
     */
    var WrappedError = (function (_super) {
        __extends$1(WrappedError, _super);
        /**
         * @param {?} message
         * @param {?} error
         */
        function WrappedError(message, error) {
            _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
            this.originalError = error;
        }
        Object.defineProperty(WrappedError.prototype, "stack", {
            get: function () {
                return (((this.originalError instanceof Error ? this.originalError : this._nativeError)))
                    .stack;
            },
            enumerable: true,
            configurable: true
        });
        WrappedError._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            WrappedError.prototype.originalError;
        };
        return WrappedError;
    }(BaseError));

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    /**
     * Special interface to the compiler only used by testing
     *
     * @experimental
     */
    var TestingCompiler = (function (_super) {
        __extends(TestingCompiler, _super);
        function TestingCompiler() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(TestingCompiler.prototype, "injector", {
            get: function () { throw unimplemented(); },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} module
         * @param {?} overrides
         * @return {?}
         */
        TestingCompiler.prototype.overrideModule = function (module, overrides) {
            throw unimplemented();
        };
        /**
         * @param {?} directive
         * @param {?} overrides
         * @return {?}
         */
        TestingCompiler.prototype.overrideDirective = function (directive, overrides) {
            throw unimplemented();
        };
        /**
         * @param {?} component
         * @param {?} overrides
         * @return {?}
         */
        TestingCompiler.prototype.overrideComponent = function (component, overrides) {
            throw unimplemented();
        };
        /**
         * @param {?} directive
         * @param {?} overrides
         * @return {?}
         */
        TestingCompiler.prototype.overridePipe = function (directive, overrides) {
            throw unimplemented();
        };
        return TestingCompiler;
    }(_angular_core.Compiler));
    /**
     * A factory for creating a Compiler
     *
     * @experimental
     */
    var TestingCompilerFactory = (function () {
        function TestingCompilerFactory() {
        }
        /**
         * @abstract
         * @param {?=} options
         * @return {?}
         */
        TestingCompilerFactory.prototype.createTestingCompiler = function (options) { };
        return TestingCompilerFactory;
    }());

    var /** @type {?} */ UNDEFINED = new Object();
    /**
     * An abstract class for inserting the root test component element in a platform independent way.
     *
     * @experimental
     */
    var TestComponentRenderer = (function () {
        function TestComponentRenderer() {
        }
        /**
         * @param {?} rootElementId
         * @return {?}
         */
        TestComponentRenderer.prototype.insertRootElement = function (rootElementId) { };
        return TestComponentRenderer;
    }());
    var /** @type {?} */ _nextRootElementId = 0;
    /**
     * @experimental
     */
    var /** @type {?} */ ComponentFixtureAutoDetect = new _angular_core.OpaqueToken('ComponentFixtureAutoDetect');
    /**
     * @experimental
     */
    var /** @type {?} */ ComponentFixtureNoNgZone = new _angular_core.OpaqueToken('ComponentFixtureNoNgZone');
    /**
     * @whatItDoes Configures and initializes environment for unit testing and provides methods for
     * creating components and services in unit tests.
     * @description
     *
     * TestBed is the primary api for writing unit tests for Angular applications and libraries.
     *
     * @stable
     */
    var TestBed = (function () {
        function TestBed() {
            this._instantiated = false;
            this._compiler = null;
            this._moduleRef = null;
            this._moduleWithComponentFactories = null;
            this._compilerOptions = [];
            this._moduleOverrides = [];
            this._componentOverrides = [];
            this._directiveOverrides = [];
            this._pipeOverrides = [];
            this._providers = [];
            this._declarations = [];
            this._imports = [];
            this._schemas = [];
            this._activeFixtures = [];
            this.platform = null;
            this.ngModule = null;
        }
        /**
         *  Initialize the environment for testing with a compiler factory, a PlatformRef, and an angular module. These are common to every test in the suite. * This may only be called once, to set up the common providers for the current test suite on the current platform. If you absolutely need to change the providers, first use `resetTestEnvironment`. * Test modules and platforms for individual platforms are available from '@angular/<platform_name>/testing'. *
         * @param {?} ngModule
         * @param {?} platform
         * @return {?}
         */
        TestBed.initTestEnvironment = function (ngModule, platform) {
            var /** @type {?} */ testBed = getTestBed();
            testBed.initTestEnvironment(ngModule, platform);
            return testBed;
        };
        /**
         *  Reset the providers for the test injector. *
         * @return {?}
         */
        TestBed.resetTestEnvironment = function () { getTestBed().resetTestEnvironment(); };
        /**
         * @return {?}
         */
        TestBed.resetTestingModule = function () {
            getTestBed().resetTestingModule();
            return TestBed;
        };
        /**
         *  Allows overriding default compiler providers and settings which are defined in test_injector.js
         * @param {?} config
         * @return {?}
         */
        TestBed.configureCompiler = function (config) {
            getTestBed().configureCompiler(config);
            return TestBed;
        };
        /**
         *  Allows overriding default providers, directives, pipes, modules of the test injector, which are defined in test_injector.js
         * @param {?} moduleDef
         * @return {?}
         */
        TestBed.configureTestingModule = function (moduleDef) {
            getTestBed().configureTestingModule(moduleDef);
            return TestBed;
        };
        /**
         *  Compile components with a `templateUrl` for the test's NgModule. It is necessary to call this function as fetching urls is asynchronous.
         * @return {?}
         */
        TestBed.compileComponents = function () { return getTestBed().compileComponents(); };
        /**
         * @param {?} ngModule
         * @param {?} override
         * @return {?}
         */
        TestBed.overrideModule = function (ngModule, override) {
            getTestBed().overrideModule(ngModule, override);
            return TestBed;
        };
        /**
         * @param {?} component
         * @param {?} override
         * @return {?}
         */
        TestBed.overrideComponent = function (component, override) {
            getTestBed().overrideComponent(component, override);
            return TestBed;
        };
        /**
         * @param {?} directive
         * @param {?} override
         * @return {?}
         */
        TestBed.overrideDirective = function (directive, override) {
            getTestBed().overrideDirective(directive, override);
            return TestBed;
        };
        /**
         * @param {?} pipe
         * @param {?} override
         * @return {?}
         */
        TestBed.overridePipe = function (pipe, override) {
            getTestBed().overridePipe(pipe, override);
            return TestBed;
        };
        /**
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        TestBed.get = function (token, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = _angular_core.Injector.THROW_IF_NOT_FOUND; }
            return getTestBed().get(token, notFoundValue);
        };
        /**
         * @param {?} component
         * @return {?}
         */
        TestBed.createComponent = function (component) {
            return getTestBed().createComponent(component);
        };
        /**
         *  Initialize the environment for testing with a compiler factory, a PlatformRef, and an angular module. These are common to every test in the suite. * This may only be called once, to set up the common providers for the current test suite on the current platform. If you absolutely need to change the providers, first use `resetTestEnvironment`. * Test modules and platforms for individual platforms are available from '@angular/<platform_name>/testing'. *
         * @param {?} ngModule
         * @param {?} platform
         * @return {?}
         */
        TestBed.prototype.initTestEnvironment = function (ngModule, platform) {
            if (this.platform || this.ngModule) {
                throw new Error('Cannot set base providers because it has already been called');
            }
            this.platform = platform;
            this.ngModule = ngModule;
        };
        /**
         *  Reset the providers for the test injector. *
         * @return {?}
         */
        TestBed.prototype.resetTestEnvironment = function () {
            this.resetTestingModule();
            this.platform = null;
            this.ngModule = null;
        };
        /**
         * @return {?}
         */
        TestBed.prototype.resetTestingModule = function () {
            this._compiler = null;
            this._moduleOverrides = [];
            this._componentOverrides = [];
            this._directiveOverrides = [];
            this._pipeOverrides = [];
            this._moduleRef = null;
            this._moduleWithComponentFactories = null;
            this._compilerOptions = [];
            this._providers = [];
            this._declarations = [];
            this._imports = [];
            this._schemas = [];
            this._instantiated = false;
            this._activeFixtures.forEach(function (fixture) { return fixture.destroy(); });
            this._activeFixtures = [];
        };
        /**
         * @param {?} config
         * @return {?}
         */
        TestBed.prototype.configureCompiler = function (config) {
            this._assertNotInstantiated('TestBed.configureCompiler', 'configure the compiler');
            this._compilerOptions.push(config);
        };
        /**
         * @param {?} moduleDef
         * @return {?}
         */
        TestBed.prototype.configureTestingModule = function (moduleDef) {
            this._assertNotInstantiated('TestBed.configureTestingModule', 'configure the test module');
            if (moduleDef.providers) {
                (_a = this._providers).push.apply(_a, moduleDef.providers);
            }
            if (moduleDef.declarations) {
                (_b = this._declarations).push.apply(_b, moduleDef.declarations);
            }
            if (moduleDef.imports) {
                (_c = this._imports).push.apply(_c, moduleDef.imports);
            }
            if (moduleDef.schemas) {
                (_d = this._schemas).push.apply(_d, moduleDef.schemas);
            }
            var _a, _b, _c, _d;
        };
        /**
         * @return {?}
         */
        TestBed.prototype.compileComponents = function () {
            var _this = this;
            if (this._moduleWithComponentFactories || this._instantiated) {
                return Promise.resolve(null);
            }
            var /** @type {?} */ moduleType = this._createCompilerAndModule();
            return this._compiler.compileModuleAndAllComponentsAsync(moduleType)
                .then(function (moduleAndComponentFactories) {
                _this._moduleWithComponentFactories = moduleAndComponentFactories;
            });
        };
        /**
         * @return {?}
         */
        TestBed.prototype._initIfNeeded = function () {
            if (this._instantiated) {
                return;
            }
            if (!this._moduleWithComponentFactories) {
                try {
                    var /** @type {?} */ moduleType = this._createCompilerAndModule();
                    this._moduleWithComponentFactories =
                        this._compiler.compileModuleAndAllComponentsSync(moduleType);
                }
                catch (e) {
                    if (e.compType) {
                        throw new Error(("This test module uses the component " + stringify(e.compType) + " which is using a \"templateUrl\", but they were never compiled. ") +
                            "Please call \"TestBed.compileComponents\" before your test.");
                    }
                    else {
                        throw e;
                    }
                }
            }
            this._moduleRef =
                this._moduleWithComponentFactories.ngModuleFactory.create(this.platform.injector);
            this._instantiated = true;
        };
        /**
         * @return {?}
         */
        TestBed.prototype._createCompilerAndModule = function () {
            var _this = this;
            var /** @type {?} */ providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
            var /** @type {?} */ declarations = this._declarations;
            var /** @type {?} */ imports = [this.ngModule, this._imports];
            var /** @type {?} */ schemas = this._schemas;
            var DynamicTestModule = (function () {
                function DynamicTestModule() {
                }
                DynamicTestModule._tsickle_typeAnnotationsHelper = function () {
                    /** @type {?} */
                    DynamicTestModule.decorators;
                    /** @nocollapse
                    @type {?} */
                    DynamicTestModule.ctorParameters;
                };
                DynamicTestModule.decorators = [
                    { type: _angular_core.NgModule, args: [{ providers: providers, declarations: declarations, imports: imports, schemas: schemas },] },
                ];
                /** @nocollapse */
                DynamicTestModule.ctorParameters = [];
                return DynamicTestModule;
            }());
            var /** @type {?} */ compilerFactory = this.platform.injector.get(TestingCompilerFactory);
            this._compiler =
                compilerFactory.createTestingCompiler(this._compilerOptions.concat([{ useDebug: true }]));
            this._moduleOverrides.forEach(function (entry) { return _this._compiler.overrideModule(entry[0], entry[1]); });
            this._componentOverrides.forEach(function (entry) { return _this._compiler.overrideComponent(entry[0], entry[1]); });
            this._directiveOverrides.forEach(function (entry) { return _this._compiler.overrideDirective(entry[0], entry[1]); });
            this._pipeOverrides.forEach(function (entry) { return _this._compiler.overridePipe(entry[0], entry[1]); });
            return DynamicTestModule;
        };
        /**
         * @param {?} methodName
         * @param {?} methodDescription
         * @return {?}
         */
        TestBed.prototype._assertNotInstantiated = function (methodName, methodDescription) {
            if (this._instantiated) {
                throw new Error(("Cannot " + methodDescription + " when the test module has already been instantiated. ") +
                    ("Make sure you are not using `inject` before `" + methodName + "`."));
            }
        };
        /**
         * @param {?} token
         * @param {?=} notFoundValue
         * @return {?}
         */
        TestBed.prototype.get = function (token, notFoundValue) {
            if (notFoundValue === void 0) { notFoundValue = _angular_core.Injector.THROW_IF_NOT_FOUND; }
            this._initIfNeeded();
            if (token === TestBed) {
                return this;
            }
            // Tests can inject things from the ng module and from the compiler,
            // but the ng module can't inject things from the compiler and vice versa.
            var /** @type {?} */ result = this._moduleRef.injector.get(token, UNDEFINED);
            return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
        };
        /**
         * @param {?} tokens
         * @param {?} fn
         * @return {?}
         */
        TestBed.prototype.execute = function (tokens, fn) {
            var _this = this;
            this._initIfNeeded();
            var /** @type {?} */ params = tokens.map(function (t) { return _this.get(t); });
            return fn.apply(void 0, params);
        };
        /**
         * @param {?} ngModule
         * @param {?} override
         * @return {?}
         */
        TestBed.prototype.overrideModule = function (ngModule, override) {
            this._assertNotInstantiated('overrideModule', 'override module metadata');
            this._moduleOverrides.push([ngModule, override]);
        };
        /**
         * @param {?} component
         * @param {?} override
         * @return {?}
         */
        TestBed.prototype.overrideComponent = function (component, override) {
            this._assertNotInstantiated('overrideComponent', 'override component metadata');
            this._componentOverrides.push([component, override]);
        };
        /**
         * @param {?} directive
         * @param {?} override
         * @return {?}
         */
        TestBed.prototype.overrideDirective = function (directive, override) {
            this._assertNotInstantiated('overrideDirective', 'override directive metadata');
            this._directiveOverrides.push([directive, override]);
        };
        /**
         * @param {?} pipe
         * @param {?} override
         * @return {?}
         */
        TestBed.prototype.overridePipe = function (pipe, override) {
            this._assertNotInstantiated('overridePipe', 'override pipe metadata');
            this._pipeOverrides.push([pipe, override]);
        };
        /**
         * @param {?} component
         * @return {?}
         */
        TestBed.prototype.createComponent = function (component) {
            var _this = this;
            this._initIfNeeded();
            var /** @type {?} */ componentFactory = this._moduleWithComponentFactories.componentFactories.find(function (compFactory) { return compFactory.componentType === component; });
            if (!componentFactory) {
                throw new Error("Cannot create the component " + stringify(component) + " as it was not imported into the testing module!");
            }
            var /** @type {?} */ noNgZone = this.get(ComponentFixtureNoNgZone, false);
            var /** @type {?} */ autoDetect = this.get(ComponentFixtureAutoDetect, false);
            var /** @type {?} */ ngZone = noNgZone ? null : this.get(_angular_core.NgZone, null);
            var /** @type {?} */ testComponentRenderer = this.get(TestComponentRenderer);
            var /** @type {?} */ rootElId = "root" + _nextRootElementId++;
            testComponentRenderer.insertRootElement(rootElId);
            var /** @type {?} */ initComponent = function () {
                var /** @type {?} */ componentRef = componentFactory.create(_this, [], "#" + rootElId);
                return new ComponentFixture(componentRef, ngZone, autoDetect);
            };
            var /** @type {?} */ fixture = !ngZone ? initComponent() : ngZone.run(initComponent);
            this._activeFixtures.push(fixture);
            return fixture;
        };
        TestBed._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            TestBed.prototype._instantiated;
            /** @type {?} */
            TestBed.prototype._compiler;
            /** @type {?} */
            TestBed.prototype._moduleRef;
            /** @type {?} */
            TestBed.prototype._moduleWithComponentFactories;
            /** @type {?} */
            TestBed.prototype._compilerOptions;
            /** @type {?} */
            TestBed.prototype._moduleOverrides;
            /** @type {?} */
            TestBed.prototype._componentOverrides;
            /** @type {?} */
            TestBed.prototype._directiveOverrides;
            /** @type {?} */
            TestBed.prototype._pipeOverrides;
            /** @type {?} */
            TestBed.prototype._providers;
            /** @type {?} */
            TestBed.prototype._declarations;
            /** @type {?} */
            TestBed.prototype._imports;
            /** @type {?} */
            TestBed.prototype._schemas;
            /** @type {?} */
            TestBed.prototype._activeFixtures;
            /** @type {?} */
            TestBed.prototype.platform;
            /** @type {?} */
            TestBed.prototype.ngModule;
        };
        return TestBed;
    }());
    var /** @type {?} */ _testBed = null;
    /**
     * @return {?}
     */
    function getTestBed() {
        return _testBed = _testBed || new TestBed();
    }
    /**
     *  Allows injecting dependencies in `beforeEach()` and `it()`. * Example: * ``` beforeEach(inject([Dependency, AClass], (dep, object) => { // some code that uses `dep` and `object` // ... })); * it('...', inject([AClass], (object) => { object.doSomething(); expect(...); }) ``` * Notes: - inject is currently a function because of some Traceur limitation the syntax should eventually becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });` *
     * @param {?} tokens
     * @param {?} fn
     * @return {?}
     */
    function inject(tokens, fn) {
        var /** @type {?} */ testBed = getTestBed();
        if (tokens.indexOf(AsyncTestCompleter) >= 0) {
            return function () {
                // Return an async test method that returns a Promise if AsyncTestCompleter is one of
                // the
                // injected tokens.
                return testBed.compileComponents().then(function () {
                    var /** @type {?} */ completer = testBed.get(AsyncTestCompleter);
                    testBed.execute(tokens, fn);
                    return completer.promise;
                });
            };
        }
        else {
            return function () { return testBed.execute(tokens, fn); };
        }
    }
    /**
     * @experimental
     */
    var InjectSetupWrapper = (function () {
        /**
         * @param {?} _moduleDef
         */
        function InjectSetupWrapper(_moduleDef) {
            this._moduleDef = _moduleDef;
        }
        /**
         * @return {?}
         */
        InjectSetupWrapper.prototype._addModule = function () {
            var /** @type {?} */ moduleDef = this._moduleDef();
            if (moduleDef) {
                getTestBed().configureTestingModule(moduleDef);
            }
        };
        /**
         * @param {?} tokens
         * @param {?} fn
         * @return {?}
         */
        InjectSetupWrapper.prototype.inject = function (tokens, fn) {
            var _this = this;
            return function () {
                _this._addModule();
                return inject(tokens, fn)();
            };
        };
        InjectSetupWrapper._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            InjectSetupWrapper.prototype._moduleDef;
        };
        return InjectSetupWrapper;
    }());
    /**
     * @param {?} moduleDef
     * @param {?=} fn
     * @return {?}
     */
    function withModule(moduleDef, fn) {
        if (fn === void 0) { fn = null; }
        if (fn) {
            return function () {
                var /** @type {?} */ testBed = getTestBed();
                if (moduleDef) {
                    testBed.configureTestingModule(moduleDef);
                }
                return fn();
            };
        }
        return new InjectSetupWrapper(function () { return moduleDef; });
    }

    var /** @type {?} */ _global$2 = ((typeof window === 'undefined' ? global : window));
    // Reset the test providers and the fake async zone before each test.
    if (_global$2.beforeEach) {
        _global$2.beforeEach(function () {
            TestBed.resetTestingModule();
            resetFakeAsyncZone();
        });
    }
    // TODO(juliemr): remove this, only used because we need to export something to have compilation
    // work.
    var /** @type {?} */ __core_private_testing_placeholder__ = '';

    var MockAnimationPlayer = (function () {
        /**
         * @param {?=} startingStyles
         * @param {?=} keyframes
         * @param {?=} previousPlayers
         */
        function MockAnimationPlayer(startingStyles, keyframes, previousPlayers) {
            var _this = this;
            if (startingStyles === void 0) { startingStyles = {}; }
            if (keyframes === void 0) { keyframes = []; }
            if (previousPlayers === void 0) { previousPlayers = []; }
            this.startingStyles = startingStyles;
            this.keyframes = keyframes;
            this._onDoneFns = [];
            this._onStartFns = [];
            this._finished = false;
            this._destroyed = false;
            this._started = false;
            this.parentPlayer = null;
            this.previousStyles = {};
            this.log = [];
            previousPlayers.forEach(function (player) {
                if (player instanceof MockAnimationPlayer) {
                    var styles_1 = player._captureStyles();
                    Object.keys(styles_1).forEach(function (prop) { return _this.previousStyles[prop] = styles_1[prop]; });
                }
            });
        }
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype._onFinish = function () {
            if (!this._finished) {
                this._finished = true;
                this.log.push('finish');
                this._onDoneFns.forEach(function (fn) { return fn(); });
                this._onDoneFns = [];
            }
        };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.init = function () { this.log.push('init'); };
        /**
         * @param {?} fn
         * @return {?}
         */
        MockAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
        /**
         * @param {?} fn
         * @return {?}
         */
        MockAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.hasStarted = function () { return this._started; };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.play = function () {
            if (!this.hasStarted()) {
                this._onStartFns.forEach(function (fn) { return fn(); });
                this._onStartFns = [];
                this._started = true;
            }
            this.log.push('play');
        };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.pause = function () { this.log.push('pause'); };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.restart = function () { this.log.push('restart'); };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.finish = function () { this._onFinish(); };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.reset = function () {
            this.log.push('reset');
            this._destroyed = false;
            this._finished = false;
            this._started = false;
        };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.destroy = function () {
            if (!this._destroyed) {
                this._destroyed = true;
                this.finish();
                this.log.push('destroy');
            }
        };
        /**
         * @param {?} p
         * @return {?}
         */
        MockAnimationPlayer.prototype.setPosition = function (p) { };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype.getPosition = function () { return 0; };
        /**
         * @return {?}
         */
        MockAnimationPlayer.prototype._captureStyles = function () {
            var _this = this;
            var /** @type {?} */ captures = {};
            if (this.hasStarted()) {
                // when assembling the captured styles, it's important that
                // we build the keyframe styles in the following order:
                // {startingStyles, ... other styles within keyframes, ... previousStyles }
                Object.keys(this.startingStyles).forEach(function (prop) {
                    captures[prop] = _this.startingStyles[prop];
                });
                this.keyframes.forEach(function (kf) {
                    var offset = kf[0], styles = kf[1];
                    var /** @type {?} */ newStyles = {};
                    Object.keys(styles).forEach(function (prop) { captures[prop] = _this._finished ? styles[prop] : _angular_core.AUTO_STYLE; });
                });
            }
            Object.keys(this.previousStyles).forEach(function (prop) {
                captures[prop] = _this.previousStyles[prop];
            });
            return captures;
        };
        MockAnimationPlayer._tsickle_typeAnnotationsHelper = function () {
            /** @type {?} */
            MockAnimationPlayer.prototype._onDoneFns;
            /** @type {?} */
            MockAnimationPlayer.prototype._onStartFns;
            /** @type {?} */
            MockAnimationPlayer.prototype._finished;
            /** @type {?} */
            MockAnimationPlayer.prototype._destroyed;
            /** @type {?} */
            MockAnimationPlayer.prototype._started;
            /** @type {?} */
            MockAnimationPlayer.prototype.parentPlayer;
            /** @type {?} */
            MockAnimationPlayer.prototype.previousStyles;
            /** @type {?} */
            MockAnimationPlayer.prototype.log;
            /** @type {?} */
            MockAnimationPlayer.prototype.startingStyles;
            /** @type {?} */
            MockAnimationPlayer.prototype.keyframes;
        };
        return MockAnimationPlayer;
    }());

    var /** @type {?} */ __core_private_testing__ = {
        TestingCompiler: TestingCompiler,
        TestingCompilerFactory: TestingCompilerFactory,
        MockAnimationPlayer: MockAnimationPlayer
    };

    exports.async = async;
    exports.ComponentFixture = ComponentFixture;
    exports.resetFakeAsyncZone = resetFakeAsyncZone;
    exports.fakeAsync = fakeAsync;
    exports.tick = tick;
    exports.discardPeriodicTasks = discardPeriodicTasks;
    exports.flushMicrotasks = flushMicrotasks;
    exports.TestComponentRenderer = TestComponentRenderer;
    exports.ComponentFixtureAutoDetect = ComponentFixtureAutoDetect;
    exports.ComponentFixtureNoNgZone = ComponentFixtureNoNgZone;
    exports.TestBed = TestBed;
    exports.getTestBed = getTestBed;
    exports.inject = inject;
    exports.InjectSetupWrapper = InjectSetupWrapper;
    exports.withModule = withModule;
    exports.__core_private_testing_placeholder__ = __core_private_testing_placeholder__;
    exports.__core_private_testing__ = __core_private_testing__;

}));