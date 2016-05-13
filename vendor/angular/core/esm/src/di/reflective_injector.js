goog.module('_angular$core$src$di$reflective__injector');
var collection_1 = goog.require('_angular$core$src$facade$collection');
var reflective_provider_1 = goog.require('_angular$core$src$di$reflective__provider');
var reflective_exceptions_1 = goog.require('_angular$core$src$di$reflective__exceptions');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
var reflective_key_1 = goog.require('_angular$core$src$di$reflective__key');
var metadata_1 = goog.require('_angular$core$src$di$metadata');
var injector_1 = goog.require('_angular$core$src$di$injector');
var /** @type {?} */ __unused; // avoid unused import when Type union types are erased
// Threshold for the dynamic version
const /** @type {?} */ _MAX_CONSTRUCTION_COUNTER = 10;
const /** @type {?} */ UNDEFINED = new Object();
class ReflectiveProtoInjectorInlineStrategy {
    /**
     * @param {?} protoEI
     * @param {?} providers
     */
    constructor(protoEI, providers) {
        this.provider0 = null;
        this.provider1 = null;
        this.provider2 = null;
        this.provider3 = null;
        this.provider4 = null;
        this.provider5 = null;
        this.provider6 = null;
        this.provider7 = null;
        this.provider8 = null;
        this.provider9 = null;
        this.keyId0 = null;
        this.keyId1 = null;
        this.keyId2 = null;
        this.keyId3 = null;
        this.keyId4 = null;
        this.keyId5 = null;
        this.keyId6 = null;
        this.keyId7 = null;
        this.keyId8 = null;
        this.keyId9 = null;
        var length = providers.length;
        if (length > 0) {
            this.provider0 = providers[0];
            this.keyId0 = providers[0].key.id;
        }
        if (length > 1) {
            this.provider1 = providers[1];
            this.keyId1 = providers[1].key.id;
        }
        if (length > 2) {
            this.provider2 = providers[2];
            this.keyId2 = providers[2].key.id;
        }
        if (length > 3) {
            this.provider3 = providers[3];
            this.keyId3 = providers[3].key.id;
        }
        if (length > 4) {
            this.provider4 = providers[4];
            this.keyId4 = providers[4].key.id;
        }
        if (length > 5) {
            this.provider5 = providers[5];
            this.keyId5 = providers[5].key.id;
        }
        if (length > 6) {
            this.provider6 = providers[6];
            this.keyId6 = providers[6].key.id;
        }
        if (length > 7) {
            this.provider7 = providers[7];
            this.keyId7 = providers[7].key.id;
        }
        if (length > 8) {
            this.provider8 = providers[8];
            this.keyId8 = providers[8].key.id;
        }
        if (length > 9) {
            this.provider9 = providers[9];
            this.keyId9 = providers[9].key.id;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        if (index == 0)
            return this.provider0;
        if (index == 1)
            return this.provider1;
        if (index == 2)
            return this.provider2;
        if (index == 3)
            return this.provider3;
        if (index == 4)
            return this.provider4;
        if (index == 5)
            return this.provider5;
        if (index == 6)
            return this.provider6;
        if (index == 7)
            return this.provider7;
        if (index == 8)
            return this.provider8;
        if (index == 9)
            return this.provider9;
        throw new reflective_exceptions_1.OutOfBoundsError(index);
    }
    /**
     * @param {?} injector
     * @return {?}
     */
    createInjectorStrategy(injector) {
        return new ReflectiveInjectorInlineStrategy(injector, this);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider0;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider1;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider2;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider3;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider4;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider5;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider6;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider7;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider8;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.provider9;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId0;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId1;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId2;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId3;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId4;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId5;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId6;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId7;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId8;
        /** @type {?} */
        ReflectiveProtoInjectorInlineStrategy.prototype.keyId9;
    }
}
exports.ReflectiveProtoInjectorInlineStrategy = ReflectiveProtoInjectorInlineStrategy;
class ReflectiveProtoInjectorDynamicStrategy {
    /**
     * @param {?} protoInj
     * @param {?} providers
     */
    constructor(protoInj, providers) {
        this.providers = providers;
        var len = providers.length;
        this.keyIds = collection_1.ListWrapper.createFixedSize(len);
        for (var i = 0; i < len; i++) {
            this.keyIds[i] = providers[i].key.id;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        if (index < 0 || index >= this.providers.length) {
            throw new reflective_exceptions_1.OutOfBoundsError(index);
        }
        return this.providers[index];
    }
    /**
     * @param {?} ei
     * @return {?}
     */
    createInjectorStrategy(ei) {
        return new ReflectiveInjectorDynamicStrategy(this, ei);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveProtoInjectorDynamicStrategy.prototype.keyIds;
        /** @type {?} */
        ReflectiveProtoInjectorDynamicStrategy.prototype.providers;
    }
}
exports.ReflectiveProtoInjectorDynamicStrategy = ReflectiveProtoInjectorDynamicStrategy;
class ReflectiveProtoInjector {
    /**
     * @param {?} providers
     */
    constructor(providers) {
        this.numberOfProviders = providers.length;
        this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ?
            new ReflectiveProtoInjectorDynamicStrategy(this, providers) :
            new ReflectiveProtoInjectorInlineStrategy(this, providers);
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    static fromResolvedProviders(providers) {
        return new ReflectiveProtoInjector(providers);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        return this._strategy.getProviderAtIndex(index);
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @internal
        @type {?} */
        ReflectiveProtoInjector.prototype._strategy;
        /** @type {?} */
        ReflectiveProtoInjector.prototype.numberOfProviders;
    }
}
exports.ReflectiveProtoInjector = ReflectiveProtoInjector;
class ReflectiveInjectorInlineStrategy {
    /**
     * @param {?} injector
     * @param {?} protoStrategy
     */
    constructor(injector, protoStrategy) {
        this.injector = injector;
        this.protoStrategy = protoStrategy;
        this.obj0 = UNDEFINED;
        this.obj1 = UNDEFINED;
        this.obj2 = UNDEFINED;
        this.obj3 = UNDEFINED;
        this.obj4 = UNDEFINED;
        this.obj5 = UNDEFINED;
        this.obj6 = UNDEFINED;
        this.obj7 = UNDEFINED;
        this.obj8 = UNDEFINED;
        this.obj9 = UNDEFINED;
    }
    /**
     * @return {?}
     */
    resetConstructionCounter() { this.injector._constructionCounter = 0; }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateProvider(provider) {
        return this.injector._new(provider);
    }
    /**
     * @param {?} keyId
     * @return {?}
     */
    getObjByKeyId(keyId) {
        var /** @type {?} */ p = this.protoStrategy;
        var /** @type {?} */ inj = this.injector;
        if (p.keyId0 === keyId) {
            if (this.obj0 === UNDEFINED) {
                this.obj0 = inj._new(p.provider0);
            }
            return this.obj0;
        }
        if (p.keyId1 === keyId) {
            if (this.obj1 === UNDEFINED) {
                this.obj1 = inj._new(p.provider1);
            }
            return this.obj1;
        }
        if (p.keyId2 === keyId) {
            if (this.obj2 === UNDEFINED) {
                this.obj2 = inj._new(p.provider2);
            }
            return this.obj2;
        }
        if (p.keyId3 === keyId) {
            if (this.obj3 === UNDEFINED) {
                this.obj3 = inj._new(p.provider3);
            }
            return this.obj3;
        }
        if (p.keyId4 === keyId) {
            if (this.obj4 === UNDEFINED) {
                this.obj4 = inj._new(p.provider4);
            }
            return this.obj4;
        }
        if (p.keyId5 === keyId) {
            if (this.obj5 === UNDEFINED) {
                this.obj5 = inj._new(p.provider5);
            }
            return this.obj5;
        }
        if (p.keyId6 === keyId) {
            if (this.obj6 === UNDEFINED) {
                this.obj6 = inj._new(p.provider6);
            }
            return this.obj6;
        }
        if (p.keyId7 === keyId) {
            if (this.obj7 === UNDEFINED) {
                this.obj7 = inj._new(p.provider7);
            }
            return this.obj7;
        }
        if (p.keyId8 === keyId) {
            if (this.obj8 === UNDEFINED) {
                this.obj8 = inj._new(p.provider8);
            }
            return this.obj8;
        }
        if (p.keyId9 === keyId) {
            if (this.obj9 === UNDEFINED) {
                this.obj9 = inj._new(p.provider9);
            }
            return this.obj9;
        }
        return UNDEFINED;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getObjAtIndex(index) {
        if (index == 0)
            return this.obj0;
        if (index == 1)
            return this.obj1;
        if (index == 2)
            return this.obj2;
        if (index == 3)
            return this.obj3;
        if (index == 4)
            return this.obj4;
        if (index == 5)
            return this.obj5;
        if (index == 6)
            return this.obj6;
        if (index == 7)
            return this.obj7;
        if (index == 8)
            return this.obj8;
        if (index == 9)
            return this.obj9;
        throw new reflective_exceptions_1.OutOfBoundsError(index);
    }
    /**
     * @return {?}
     */
    getMaxNumberOfObjects() { return _MAX_CONSTRUCTION_COUNTER; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj0;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj1;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj2;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj3;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj4;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj5;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj6;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj7;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj8;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.obj9;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.injector;
        /** @type {?} */
        ReflectiveInjectorInlineStrategy.prototype.protoStrategy;
    }
}
exports.ReflectiveInjectorInlineStrategy = ReflectiveInjectorInlineStrategy;
class ReflectiveInjectorDynamicStrategy {
    /**
     * @param {?} protoStrategy
     * @param {?} injector
     */
    constructor(protoStrategy, injector) {
        this.protoStrategy = protoStrategy;
        this.injector = injector;
        this.objs = collection_1.ListWrapper.createFixedSize(protoStrategy.providers.length);
        collection_1.ListWrapper.fill(this.objs, UNDEFINED);
    }
    /**
     * @return {?}
     */
    resetConstructionCounter() { this.injector._constructionCounter = 0; }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateProvider(provider) {
        return this.injector._new(provider);
    }
    /**
     * @param {?} keyId
     * @return {?}
     */
    getObjByKeyId(keyId) {
        var /** @type {?} */ p = this.protoStrategy;
        for (var /** @type {?} */ i = 0; i < p.keyIds.length; i++) {
            if (p.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this.injector._new(p.providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getObjAtIndex(index) {
        if (index < 0 || index >= this.objs.length) {
            throw new reflective_exceptions_1.OutOfBoundsError(index);
        }
        return this.objs[index];
    }
    /**
     * @return {?}
     */
    getMaxNumberOfObjects() { return this.objs.length; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveInjectorDynamicStrategy.prototype.objs;
        /** @type {?} */
        ReflectiveInjectorDynamicStrategy.prototype.protoStrategy;
        /** @type {?} */
        ReflectiveInjectorDynamicStrategy.prototype.injector;
    }
}
exports.ReflectiveInjectorDynamicStrategy = ReflectiveInjectorDynamicStrategy;
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 */
class ReflectiveInjector {
    /**
     *  Turns an array of provider definitions into an array of resolved providers. * A resolution is a process of flattening multiple nested arrays and converting individual providers into an array of {@link ResolvedReflectiveProvider}s. * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview)) * ```typescript
     * @Injectable() undefined class Engine { } *
     * @Injectable() undefined class Car { constructor(public engine:Engine) {} } * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]); * expect(providers.length).toEqual(2); * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true); expect(providers[0].key.displayName).toBe("Car"); expect(providers[0].dependencies.length).toEqual(1); expect(providers[0].factory).toBeDefined(); * expect(providers[1].key.displayName).toBe("Engine"); }); ``` * See {@link ReflectiveInjector#fromResolvedProviders} for more info.
     * @param {?} providers
     * @return {?}
     */
    static resolve(providers) {
        return reflective_provider_1.resolveReflectiveProviders(providers);
    }
    /**
     *  Resolves an array of providers and creates an injector from those providers. * The passed-in providers can be an array of `Type`, {@link Provider}, or a recursive array of more providers. * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview)) * ```typescript
     * @Injectable() undefined class Engine { } *
     * @Injectable() undefined class Car { constructor(public engine:Engine) {} } * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]); expect(injector.get(Car) instanceof Car).toBe(true); ``` * This function is slower than the corresponding `fromResolvedProviders` because it needs to resolve the passed-in providers first. See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static resolveAndCreate(providers, parent = null) {
        var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    }
    /**
     *  Creates an injector from previously resolved providers. * This API is the recommended way to construct injectors in performance-sensitive parts. * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview)) * ```typescript
     * @Injectable() undefined class Engine { } *
     * @Injectable() undefined class Car { constructor(public engine:Engine) {} } * var providers = ReflectiveInjector.resolve([Car, Engine]); var injector = ReflectiveInjector.fromResolvedProviders(providers); expect(injector.get(Car) instanceof Car).toBe(true); ```
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static fromResolvedProviders(providers, parent = null) {
        return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
    }
    /**
     * @deprecated
     * @param {?} providers
     * @return {?}
     */
    static fromResolvedBindings(providers) {
        return ReflectiveInjector.fromResolvedProviders(providers);
    }
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = ReflectiveInjector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     */
    get parent() { return exceptions_1.unimplemented(); }
    /**
     * @internal
     * @return {?}
     */
    debugContext() { return null; }
    /**
     *  Resolves an array of providers and creates a child injector from those providers. * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection. --> * The passed-in providers can be an array of `Type`, {@link Provider}, or a recursive array of more providers. * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview)) * ```typescript class ParentProvider {} class ChildProvider {} * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]); var child = parent.resolveAndCreateChild([ChildProvider]); * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true); expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true); expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider)); ``` * This function is slower than the corresponding `createChildFromResolved` because it needs to resolve the passed-in providers first. See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) {
        return exceptions_1.unimplemented();
    }
    /**
     *  Creates a child injector from previously resolved providers. * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection. --> * This API is the recommended way to construct injectors in performance-sensitive parts. * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview)) * ```typescript class ParentProvider {} class ChildProvider {} * var parentProviders = ReflectiveInjector.resolve([ParentProvider]); var childProviders = ReflectiveInjector.resolve([ChildProvider]); * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders); var child = parent.createChildFromResolved(childProviders); * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true); expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true); expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider)); ```
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) {
        return exceptions_1.unimplemented();
    }
    /**
     *  Resolves a provider and instantiates an object in the context of the injector. * The created object does not get cached by the injector. * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview)) * ```typescript
     * @Injectable() undefined class Engine { } *
     * @Injectable() undefined class Car { constructor(public engine:Engine) {} } * var injector = ReflectiveInjector.resolveAndCreate([Engine]); * var car = injector.resolveAndInstantiate(Car); expect(car.engine).toBe(injector.get(Engine)); expect(car).not.toBe(injector.resolveAndInstantiate(Car)); ```
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) { return exceptions_1.unimplemented(); }
    /**
     *  Instantiates an object using a resolved provider in the context of the injector. * The created object does not get cached by the injector. * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview)) * ```typescript
     * @Injectable() undefined class Engine { } *
     * @Injectable() undefined class Car { constructor(public engine:Engine) {} } * var injector = ReflectiveInjector.resolveAndCreate([Engine]); var carProvider = ReflectiveInjector.resolve([Car])[0]; var car = injector.instantiateResolved(carProvider); expect(car.engine).toBe(injector.get(Engine)); expect(car).not.toBe(injector.instantiateResolved(carProvider)); ```
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) { return exceptions_1.unimplemented(); }
}
exports.ReflectiveInjector = ReflectiveInjector;
class ReflectiveInjector_ {
    /**
     *  Private
     * @param {?} _proto
     * @param {?=} _parent
     * @param {?=} _debugContext
     */
    constructor(_proto /* ProtoInjector */, _parent = null, _debugContext = null) {
        this._debugContext = _debugContext;
        /** @internal */
        this._constructionCounter = 0;
        this._proto = _proto;
        this._parent = _parent;
        this._strategy = _proto._strategy.createInjectorStrategy(this);
    }
    /**
     * @internal
     * @return {?}
     */
    debugContext() { return this._debugContext(); }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = injector_1.THROW_IF_NOT_FOUND) {
        return this._getByKey(reflective_key_1.ReflectiveKey.get(token), null, null, notFoundValue);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getAt(index) { return this._strategy.getObjAtIndex(index); }
    get parent() { return this._parent; }
    /**
     * @internal
     * Internal. Do not use.
     * We return `any` not to export the InjectorStrategy type.
     */
    get internalStrategy() { return this._strategy; }
    /**
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) {
        var /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) {
        var /** @type {?} */ proto = new ReflectiveProtoInjector(providers);
        var /** @type {?} */ inj = new ReflectiveInjector_(proto);
        inj._parent = this;
        return inj;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) {
        return this._instantiateProvider(provider);
    }
    /**
     * @internal
     * @param {?} provider
     * @return {?}
     */
    _new(provider) {
        if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
            throw new reflective_exceptions_1.CyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    _instantiateProvider(provider) {
        if (provider.multiProvider) {
            var /** @type {?} */ res = collection_1.ListWrapper.createFixedSize(provider.resolvedFactories.length);
            for (var /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    }
    /**
     * @param {?} provider
     * @param {?} ResolvedReflectiveFactory
     * @return {?}
     */
    _instantiate(provider, ResolvedReflectiveFactory) {
        var /** @type {?} */ factory = ResolvedReflectiveFactory.factory;
        var /** @type {?} */ deps = ResolvedReflectiveFactory.dependencies;
        var /** @type {?} */ length = deps.length;
        var /** @type {?} */ d0;
        var /** @type {?} */ d1;
        var /** @type {?} */ d2;
        var /** @type {?} */ d3;
        var /** @type {?} */ d4;
        var /** @type {?} */ d5;
        var /** @type {?} */ d6;
        var /** @type {?} */ d7;
        var /** @type {?} */ d8;
        var /** @type {?} */ d9;
        var /** @type {?} */ d10;
        var /** @type {?} */ d11;
        var /** @type {?} */ d12;
        var /** @type {?} */ d13;
        var /** @type {?} */ d14;
        var /** @type {?} */ d15;
        var /** @type {?} */ d16;
        var /** @type {?} */ d17;
        var /** @type {?} */ d18;
        var /** @type {?} */ d19;
        try {
            d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
            d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
            d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
            d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
            d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
            d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
            d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
            d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
            d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
            d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
            d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
            d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
            d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
            d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
            d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
            d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
            d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
            d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
            d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
            d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
        }
        catch (e) {
            if (e instanceof reflective_exceptions_1.AbstractProviderError || e instanceof reflective_exceptions_1.InstantiationError) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        var /** @type {?} */ obj;
        try {
            switch (length) {
                case 0:
                    obj = factory();
                    break;
                case 1:
                    obj = factory(d0);
                    break;
                case 2:
                    obj = factory(d0, d1);
                    break;
                case 3:
                    obj = factory(d0, d1, d2);
                    break;
                case 4:
                    obj = factory(d0, d1, d2, d3);
                    break;
                case 5:
                    obj = factory(d0, d1, d2, d3, d4);
                    break;
                case 6:
                    obj = factory(d0, d1, d2, d3, d4, d5);
                    break;
                case 7:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6);
                    break;
                case 8:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                    break;
                case 9:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                    break;
                case 10:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                    break;
                case 11:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
                    break;
                case 12:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
                    break;
                case 13:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
                    break;
                case 14:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
                    break;
                case 15:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
                    break;
                case 16:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
                    break;
                case 17:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
                    break;
                case 18:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
                    break;
                case 19:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
                    break;
                case 20:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
                    break;
                default:
                    throw new exceptions_1.BaseException(`Cannot instantiate '${provider.key.displayName}' because it has more than 20 dependencies`);
            }
        }
        catch (e) {
            throw new reflective_exceptions_1.InstantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    }
    /**
     * @param {?} provider
     * @param {?} dep
     * @return {?}
     */
    _getByReflectiveDependency(provider, dep) {
        return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : injector_1.THROW_IF_NOT_FOUND);
    }
    /**
     * @param {?} key
     * @param {?} lowerBoundVisibility
     * @param {?} upperBoundVisibility
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKey(key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (upperBoundVisibility instanceof metadata_1.SelfMetadata) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
        }
    }
    /**
     * @internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _throwOrNull(key, notFoundValue) {
        if (notFoundValue !== injector_1.THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw new reflective_exceptions_1.NoProviderError(this, key);
        }
    }
    /**
     * @internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKeySelf(key, notFoundValue) {
        var /** @type {?} */ obj = this._strategy.getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    }
    /**
     * @internal
     * @param {?} key
     * @param {?} notFoundValue
     * @param {?} lowerBoundVisibility
     * @return {?}
     */
    _getByKeyDefault(key, notFoundValue, lowerBoundVisibility) {
        var /** @type {?} */ inj;
        if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            var /** @type {?} */ inj_ = (inj);
            var /** @type {?} */ obj = inj_._strategy.getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_._parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    }
    get displayName() {
        return `ReflectiveInjector(providers: [${_mapProviders(this, (b) => ` "${b.key.displayName}" `).join(", ")}])`;
    }
    /**
     * @return {?}
     */
    toString() { return this.displayName; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ReflectiveInjector_.prototype._strategy;
        /** @internal
        @type {?} */
        ReflectiveInjector_.prototype._constructionCounter;
        /** @internal
        @type {?} */
        ReflectiveInjector_.prototype._proto;
        /** @internal
        @type {?} */
        ReflectiveInjector_.prototype._parent;
        /** @type {?} */
        ReflectiveInjector_.prototype._debugContext;
    }
}
exports.ReflectiveInjector_ = ReflectiveInjector_;
var /** @type {?} */ INJECTOR_KEY = reflective_key_1.ReflectiveKey.get(injector_1.Injector);
/**
 * @param {?} injector
 * @param {?} fn
 * @return {?}
 */
function _mapProviders(injector, fn) {
    var /** @type {?} */ res = [];
    for (var /** @type {?} */ i = 0; i < injector._proto.numberOfProviders; ++i) {
        res.push(fn(injector._proto.getProviderAtIndex(i)));
    }
    return res;
}
//# sourceMappingURL=reflective_injector.js.map