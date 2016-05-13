goog.module('_angular$compiler$testing$test__component__builder');
var core_1 = goog.require('_angular$core');
var index_1 = goog.require('_angular$compiler');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var async_1 = goog.require('_angular$compiler$src$facade$async');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var testing_1 = goog.require('_angular$core$testing');
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 */
class TestComponentRenderer {
    /**
     * @param {?} rootElementId
     * @return {?}
     */
    insertRootElement(rootElementId) { }
}
exports.TestComponentRenderer = TestComponentRenderer;
exports.ComponentFixtureAutoDetect = new core_1.OpaqueToken("ComponentFixtureAutoDetect");
exports.ComponentFixtureNoNgZone = new core_1.OpaqueToken("ComponentFixtureNoNgZone");
/**
 * Fixture for debugging and testing a component.
 */
class ComponentFixture {
    /**
     * @param {?} componentRef
     * @param {?} ngZone
     * @param {?} autoDetect
     */
    constructor(componentRef, ngZone, autoDetect) {
        this._isStable = true;
        this._completer = null;
        this._onUnstableSubscription = null;
        this._onStableSubscription = null;
        this._onMicrotaskEmptySubscription = null;
        this._onErrorSubscription = null;
        this.changeDetectorRef = componentRef.changeDetectorRef;
        this.elementRef = componentRef.location;
        this.debugElement = core_1.getDebugNode(this.elementRef.nativeElement);
        this.componentInstance = componentRef.instance;
        this.nativeElement = this.elementRef.nativeElement;
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        this._autoDetect = autoDetect;
        if (ngZone != null) {
            this._onUnstableSubscription =
                async_1.ObservableWrapper.subscribe(ngZone.onUnstable, (_) => { this._isStable = false; });
            this._onMicrotaskEmptySubscription =
                async_1.ObservableWrapper.subscribe(ngZone.onMicrotaskEmpty, (_) => {
                    if (this._autoDetect) {
                        // Do a change detection run with checkNoChanges set to true to check
                        // there are no changes on the second run.
                        this.detectChanges(true);
                    }
                });
            this._onStableSubscription = async_1.ObservableWrapper.subscribe(ngZone.onStable, (_) => {
                this._isStable = true;
                // Check whether there are no pending macrotasks in a microtask so that ngZone gets a chance
                // to update the state of pending macrotasks.
                lang_1.scheduleMicroTask(() => {
                    if (!this.ngZone.hasPendingMacrotasks) {
                        if (this._completer != null) {
                            this._completer.resolve(true);
                            this._completer = null;
                        }
                    }
                });
            });
            this._onErrorSubscription = async_1.ObservableWrapper.subscribe(ngZone.onError, (error) => { throw error.error; });
        }
    }
    /**
     * @param {?} checkNoChanges
     * @return {?}
     */
    _tick(checkNoChanges) {
        this.changeDetectorRef.detectChanges();
        if (checkNoChanges) {
            this.checkNoChanges();
        }
    }
    /**
     *  Trigger a change detection cycle for the component.
     * @param {?=} checkNoChanges
     * @return {?}
     */
    detectChanges(checkNoChanges = true) {
        if (this.ngZone != null) {
            // Run the change detection inside the NgZone so that any async tasks as part of the change
            // detection are captured by the zone and can be waited for in isStable.
            this.ngZone.run(() => { this._tick(checkNoChanges); });
        }
        else {
            // Running without zone. Just do the change detection.
            this._tick(checkNoChanges);
        }
    }
    /**
     *  Do a change detection run to make sure there were no changes.
     * @return {?}
     */
    checkNoChanges() { this.changeDetectorRef.checkNoChanges(); }
    /**
     *  Set whether the fixture should autodetect changes. * Also runs detectChanges once so that any existing change is detected.
     * @param {?=} autoDetect
     * @return {?}
     */
    autoDetectChanges(autoDetect = true) {
        if (this.ngZone == null) {
            throw new exceptions_1.BaseException('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
        }
        this._autoDetect = autoDetect;
        this.detectChanges();
    }
    /**
     *  Return whether the fixture is currently stable or has async tasks that have not been completed yet.
     * @return {?}
     */
    isStable() { return this._isStable && !this.ngZone.hasPendingMacrotasks; }
    /**
     *  Get a promise that resolves when the fixture is stable. * This can be used to resume testing after events have triggered asynchronous activity or asynchronous change detection.
     * @return {?}
     */
    whenStable() {
        if (this.isStable()) {
            return async_1.PromiseWrapper.resolve(false);
        }
        else if (this._completer !== null) {
            return this._completer.promise;
        }
        else {
            this._completer = new async_1.PromiseCompleter();
            return this._completer.promise;
        }
    }
    /**
     *  Trigger component destruction.
     * @return {?}
     */
    destroy() {
        this.componentRef.destroy();
        if (this._onUnstableSubscription != null) {
            async_1.ObservableWrapper.dispose(this._onUnstableSubscription);
            this._onUnstableSubscription = null;
        }
        if (this._onStableSubscription != null) {
            async_1.ObservableWrapper.dispose(this._onStableSubscription);
            this._onStableSubscription = null;
        }
        if (this._onMicrotaskEmptySubscription != null) {
            async_1.ObservableWrapper.dispose(this._onMicrotaskEmptySubscription);
            this._onMicrotaskEmptySubscription = null;
        }
        if (this._onErrorSubscription != null) {
            async_1.ObservableWrapper.dispose(this._onErrorSubscription);
            this._onErrorSubscription = null;
        }
    }
    static _tsickle_typeAnnotationsHelper() {
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
        /** The ComponentRef for the component
        @type {?} */
        ComponentFixture.prototype.componentRef;
        /** The ChangeDetectorRef for the component
        @type {?} */
        ComponentFixture.prototype.changeDetectorRef;
        /** The NgZone in which this component was instantiated.
        @type {?} */
        ComponentFixture.prototype.ngZone;
        /** @type {?} */
        ComponentFixture.prototype._autoDetect;
        /** @type {?} */
        ComponentFixture.prototype._isStable;
        /** @type {?} */
        ComponentFixture.prototype._completer;
        /** @type {?} */
        ComponentFixture.prototype._onUnstableSubscription;
        /** @type {?} */
        ComponentFixture.prototype._onStableSubscription;
        /** @type {?} */
        ComponentFixture.prototype._onMicrotaskEmptySubscription;
        /** @type {?} */
        ComponentFixture.prototype._onErrorSubscription;
    }
}
exports.ComponentFixture = ComponentFixture;
var /** @type {?} */ _nextRootElementId = 0;
class TestComponentBuilder {
    /**
     * @param {?} _injector
     */
    constructor(_injector) {
        this._injector = _injector;
        /** @internal */
        this._bindingsOverrides = new Map();
        /** @internal */
        this._directiveOverrides = new Map();
        /** @internal */
        this._templateOverrides = new Map();
        /** @internal */
        this._viewBindingsOverrides = new Map();
        /** @internal */
        this._viewOverrides = new Map();
    }
    /**
     * @internal
     * @return {?}
     */
    _clone() {
        let /** @type {?} */ clone = new TestComponentBuilder(this._injector);
        clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
        clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
        clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
        clone._bindingsOverrides = collection_1.MapWrapper.clone(this._bindingsOverrides);
        clone._viewBindingsOverrides = collection_1.MapWrapper.clone(this._viewBindingsOverrides);
        return clone;
    }
    /**
     *  Overrides only the html of a {@link ComponentMetadata}. All the other properties of the component's {@link ViewMetadata} are preserved.
     * @param {?} componentType
     * @param {?} template
     * @return {?}
     */
    overrideTemplate(componentType, template) {
        let /** @type {?} */ clone = this._clone();
        clone._templateOverrides.set(componentType, template);
        return clone;
    }
    /**
     *  Overrides a component's {@link ViewMetadata}.
     * @param {?} componentType
     * @param {?} view
     * @return {?}
     */
    overrideView(componentType, view) {
        let /** @type {?} */ clone = this._clone();
        clone._viewOverrides.set(componentType, view);
        return clone;
    }
    /**
     *  Overrides the directives from the component {@link ViewMetadata}.
     * @param {?} componentType
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    overrideDirective(componentType, from, to) {
        let /** @type {?} */ clone = this._clone();
        let /** @type {?} */ overridesForComponent = clone._directiveOverrides.get(componentType);
        if (!lang_1.isPresent(overridesForComponent)) {
            clone._directiveOverrides.set(componentType, new Map());
            overridesForComponent = clone._directiveOverrides.get(componentType);
        }
        overridesForComponent.set(from, to);
        return clone;
    }
    /**
     *  Overrides one or more injectables configured via `providers` metadata property of a directive or component. Very useful when certain providers need to be mocked out. * The providers specified via this method are appended to the existing `providers` causing the duplicated providers to be overridden.
     * @param {?} type
     * @param {?} providers
     * @return {?}
     */
    overrideProviders(type, providers) {
        let /** @type {?} */ clone = this._clone();
        clone._bindingsOverrides.set(type, providers);
        return clone;
    }
    /**
     * @deprecated
     * @param {?} type
     * @param {?} providers
     * @return {?}
     */
    overrideBindings(type, providers) {
        return this.overrideProviders(type, providers);
    }
    /**
     *  Overrides one or more injectables configured via `providers` metadata property of a directive or component. Very useful when certain providers need to be mocked out. * The providers specified via this method are appended to the existing `providers` causing the duplicated providers to be overridden.
     * @param {?} type
     * @param {?} providers
     * @return {?}
     */
    overrideViewProviders(type, providers) {
        let /** @type {?} */ clone = this._clone();
        clone._viewBindingsOverrides.set(type, providers);
        return clone;
    }
    /**
     * @deprecated
     * @param {?} type
     * @param {?} providers
     * @return {?}
     */
    overrideViewBindings(type, providers) {
        return this.overrideViewProviders(type, providers);
    }
    /**
     * @param {?} ngZone
     * @param {?} componentFactory
     * @return {?}
     */
    _create(ngZone, componentFactory) {
        let /** @type {?} */ rootElId = `root${_nextRootElementId++}`;
        var /** @type {?} */ testComponentRenderer = this._injector.get(TestComponentRenderer);
        testComponentRenderer.insertRootElement(rootElId);
        var /** @type {?} */ componentRef = componentFactory.create(this._injector, [], `#${rootElId}`);
        let /** @type {?} */ autoDetect = this._injector.get(exports.ComponentFixtureAutoDetect, false);
        return new ComponentFixture(componentRef, ngZone, autoDetect);
    }
    /**
     *  Builds and returns a ComponentFixture.
     * @param {?} rootComponentType
     * @return {?}
     */
    createAsync(rootComponentType) {
        let /** @type {?} */ noNgZone = lang_1.IS_DART || this._injector.get(exports.ComponentFixtureNoNgZone, false);
        let /** @type {?} */ ngZone = noNgZone ? null : this._injector.get(core_1.NgZone, null);
        let /** @type {?} */ initComponent = () => {
            let /** @type {?} */ mockDirectiveResolver = this._injector.get(index_1.DirectiveResolver);
            let /** @type {?} */ mockViewResolver = this._injector.get(index_1.ViewResolver);
            this._viewOverrides.forEach((view, type) => mockViewResolver.setView(type, view));
            this._templateOverrides.forEach((template, type) => mockViewResolver.setInlineTemplate(type, template));
            this._directiveOverrides.forEach((overrides, component) => {
                overrides.forEach((to, from) => { mockViewResolver.overrideViewDirective(component, from, to); });
            });
            this._bindingsOverrides.forEach((bindings, type) => mockDirectiveResolver.setBindingsOverride(type, bindings));
            this._viewBindingsOverrides.forEach((bindings, type) => mockDirectiveResolver.setViewBindingsOverride(type, bindings));
            let /** @type {?} */ promise = this._injector.get(core_1.ComponentResolver).resolveComponent(rootComponentType);
            return promise.then(componentFactory => this._create(ngZone, componentFactory));
        };
        return ngZone == null ? initComponent() : ngZone.run(initComponent);
    }
    /**
     * @param {?} rootComponentType
     * @return {?}
     */
    createFakeAsync(rootComponentType) {
        let /** @type {?} */ result;
        let /** @type {?} */ error;
        async_1.PromiseWrapper.then(this.createAsync(rootComponentType), (_result) => { result = _result; }, (_error) => { error = _error; });
        testing_1.tick();
        if (lang_1.isPresent(error)) {
            throw error;
        }
        return result;
    }
    /**
     * @param {?} componentFactory
     * @return {?}
     */
    createSync(componentFactory) {
        let /** @type {?} */ noNgZone = lang_1.IS_DART || this._injector.get(exports.ComponentFixtureNoNgZone, false);
        let /** @type {?} */ ngZone = noNgZone ? null : this._injector.get(core_1.NgZone, null);
        let /** @type {?} */ initComponent = () => this._create(ngZone, componentFactory);
        return ngZone == null ? initComponent() : ngZone.run(initComponent);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        TestComponentBuilder.prototype._bindingsOverrides;
        /** @internal
        @type {?} */
        TestComponentBuilder.prototype._directiveOverrides;
        /** @internal
        @type {?} */
        TestComponentBuilder.prototype._templateOverrides;
        /** @internal
        @type {?} */
        TestComponentBuilder.prototype._viewBindingsOverrides;
        /** @internal
        @type {?} */
        TestComponentBuilder.prototype._viewOverrides;
        /** @type {?} */
        TestComponentBuilder.prototype._injector;
    }
}
TestComponentBuilder.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */ TestComponentBuilder.ctorParameters = [
    { type: core_1.Injector, },
];
exports.TestComponentBuilder = TestComponentBuilder;
//# sourceMappingURL=test_component_builder.js.map