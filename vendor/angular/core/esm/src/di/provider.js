goog.module('_angular$core$src$di$provider');
var lang_1 = goog.require('_angular$core$src$facade$lang');
var exceptions_1 = goog.require('_angular$core$src$facade$exceptions');
/**
 * Describes how the {@link Injector} should instantiate a given token.
 *
 * See {@link provide}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GNAyj6K6PfYg2NBzgwZ5?p%3Dpreview&p=preview))
 *
 * ```javascript
 * var injector = Injector.resolveAndCreate([
 *   new Provider("message", { useValue: 'Hello' })
 * ]);
 *
 * expect(injector.get("message")).toEqual('Hello');
 * ```
 * @ts2dart_const
 */
class Provider {
    /**
     * @param {?} token
     * @param {?} __1
     */
    constructor(token, { useClass, useValue, useExisting, useFactory, deps, multi }) {
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.dependencies = deps;
        this._multi = multi;
    }
    // TODO: Provide a full working example after alpha38 is released.
    /**
     * Creates multiple providers matching the same token (a multi-provider).
     *
     * Multi-providers are used for creating pluggable service, where the system comes
     * with some default providers, and the user can register additional providers.
     * The combination of the default providers and the additional providers will be
     * used to drive the behavior of the system.
     *
     * ### Example
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("Strings", { useValue: "String1", multi: true}),
     *   new Provider("Strings", { useValue: "String2", multi: true})
     * ]);
     *
     * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
     * ```
     *
     * Multi-providers and regular providers cannot be mixed. The following
     * will throw an exception:
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("Strings", { useValue: "String1", multi: true }),
     *   new Provider("Strings", { useValue: "String2"})
     * ]);
     * ```
     */
    get multi() { return lang_1.normalizeBool(this._multi); }
    static _tsickle_typeAnnotationsHelper() {
        /** Token used when retrieving this provider. Usually, it is a type {@link Type}.
        @type {?} */
        Provider.prototype.token;
        /** Binds a DI token to an implementation class. * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview)) * Because `useExisting` and `useClass` are often confused, the example contains both use cases for easy comparison. * ```typescript class Vehicle {} * class Car extends Vehicle {} * var injectorClass = Injector.resolveAndCreate([ Car, {provide: Vehicle,  useClass: Car } ]); var injectorAlias = Injector.resolveAndCreate([ Car, {provide: Vehicle,  useExisting: Car } ]); * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car)); expect(injectorClass.get(Vehicle) instanceof Car).toBe(true); * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car)); expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true); ```
        @type {?} */
        Provider.prototype.useClass;
        /** Binds a DI token to a value. * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview)) * ```javascript var injector = Injector.resolveAndCreate([ new Provider("message", { useValue: 'Hello' }) ]); * expect(injector.get("message")).toEqual('Hello'); ```
        @type {?} */
        Provider.prototype.useValue;
        /** Binds a DI token to an existing token. * {@link Injector} returns the same instance as if the provided token was used. This is in contrast to `useClass` where a separate instance of `useClass` is returned. * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview)) * Because `useExisting` and `useClass` are often confused the example contains both use cases for easy comparison. * ```typescript class Vehicle {} * class Car extends Vehicle {} * var injectorAlias = Injector.resolveAndCreate([ Car, {provide: Vehicle,  useExisting: Car } ]); var injectorClass = Injector.resolveAndCreate([ Car, {provide: Vehicle,  useClass: Car } ]); * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car)); expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true); * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car)); expect(injectorClass.get(Vehicle) instanceof Car).toBe(true); ```
        @type {?} */
        Provider.prototype.useExisting;
        /** Binds a DI token to a function which computes the value. * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview)) * ```typescript var injector = Injector.resolveAndCreate([ {provide: Number,  useFactory: () => { return 1+2; }}, new Provider(String, { useFactory: (value) => { return "Value: " + value; }, deps: [Number] }) ]); * expect(injector.get(Number)).toEqual(3); expect(injector.get(String)).toEqual('Value: 3'); ``` * Used in conjunction with dependencies.
        @type {?} */
        Provider.prototype.useFactory;
        /** Specifies a set of dependencies (as `token`s) which should be injected into the factory function. * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview)) * ```typescript var injector = Injector.resolveAndCreate([ {provide: Number,  useFactory: () => { return 1+2; }}, new Provider(String, { useFactory: (value) => { return "Value: " + value; }, deps: [Number] }) ]); * expect(injector.get(Number)).toEqual(3); expect(injector.get(String)).toEqual('Value: 3'); ``` * Used in conjunction with `useFactory`.
        @type {?} */
        Provider.prototype.dependencies;
        /** @internal
        @type {?} */
        Provider.prototype._multi;
    }
}
exports.Provider = Provider;
/**
 * See {@link Provider} instead.
 *
 * @deprecated
 * @ts2dart_const
 */
class Binding extends Provider {
    /**
     * @param {?} token
     * @param {?} __1
     */
    constructor(token, { toClass, toValue, toAlias, toFactory, deps, multi }) {
        super(token, {
            useClass: toClass,
            useValue: toValue,
            useExisting: toAlias,
            useFactory: toFactory,
            deps: deps,
            multi: multi
        });
    }
    /**
     * @deprecated
     */
    get toClass() { return this.useClass; }
    /**
     * @deprecated
     */
    get toAlias() { return this.useExisting; }
    /**
     * @deprecated
     */
    get toFactory() { return this.useFactory; }
    /**
     * @deprecated
     */
    get toValue() { return this.useValue; }
}
exports.Binding = Binding;
/**
 *  Creates a {@link Provider}. * To construct a {@link Provider}, bind a `token` to either a class, a value, a factory function, or to an existing `token`. See {@link ProviderBuilder} for more details. * The `token` is most commonly a class or {@link OpaqueToken-class.html}. *
 * @deprecated
 * @param {?} token
 * @return {?}
 */
function bind(token) {
    return new ProviderBuilder(token);
}
exports.bind = bind;
/**
 * Helper class for the {@link bind} function.
 */
class ProviderBuilder {
    /**
     * @param {?} token
     */
    constructor(token) {
        this.token = token;
    }
    /**
     *  Binds a DI token to a class. * ### Example ([live demo](http://plnkr.co/edit/ZpBCSYqv6e2ud5KXLdxQ?p=preview)) * Because `toAlias` and `toClass` are often confused, the example contains both use cases for easy comparison. * ```typescript class Vehicle {} * class Car extends Vehicle {} * var injectorClass = Injector.resolveAndCreate([ Car, provide(Vehicle, {useClass: Car}) ]); var injectorAlias = Injector.resolveAndCreate([ Car, provide(Vehicle, {useExisting: Car}) ]); * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car)); expect(injectorClass.get(Vehicle) instanceof Car).toBe(true); * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car)); expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true); ```
     * @param {?} type
     * @return {?}
     */
    toClass(type) {
        if (!lang_1.isType(type)) {
            throw new exceptions_1.BaseException(`Trying to create a class provider but "${lang_1.stringify(type)}" is not a class!`);
        }
        return new Provider(this.token, { useClass: type });
    }
    /**
     *  Binds a DI token to a value. * ### Example ([live demo](http://plnkr.co/edit/G024PFHmDL0cJFgfZK8O?p=preview)) * ```typescript var injector = Injector.resolveAndCreate([ provide('message', {useValue: 'Hello'}) ]); * expect(injector.get('message')).toEqual('Hello'); ```
     * @param {?} value
     * @return {?}
     */
    toValue(value) { return new Provider(this.token, { useValue: value }); }
    /**
     *  Binds a DI token to an existing token. * Angular will return the same instance as if the provided token was used. (This is in contrast to `useClass` where a separate instance of `useClass` will be returned.) * ### Example ([live demo](http://plnkr.co/edit/uBaoF2pN5cfc5AfZapNw?p=preview)) * Because `toAlias` and `toClass` are often confused, the example contains both use cases for easy comparison. * ```typescript class Vehicle {} * class Car extends Vehicle {} * var injectorAlias = Injector.resolveAndCreate([ Car, provide(Vehicle, {useExisting: Car}) ]); var injectorClass = Injector.resolveAndCreate([ Car, provide(Vehicle, {useClass: Car}) ]); * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car)); expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true); * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car)); expect(injectorClass.get(Vehicle) instanceof Car).toBe(true); ```
     * @param {?} aliasToken
     * @return {?}
     */
    toAlias(aliasToken) {
        if (lang_1.isBlank(aliasToken)) {
            throw new exceptions_1.BaseException(`Can not alias ${lang_1.stringify(this.token)} to a blank value!`);
        }
        return new Provider(this.token, { useExisting: aliasToken });
    }
    /**
     *  Binds a DI token to a function which computes the value. * ### Example ([live demo](http://plnkr.co/edit/OejNIfTT3zb1iBxaIYOb?p=preview)) * ```typescript var injector = Injector.resolveAndCreate([ provide(Number, {useFactory: () => { return 1+2; }}), provide(String, {useFactory: (v) => { return "Value: " + v; }, deps: [Number]}) ]); * expect(injector.get(Number)).toEqual(3); expect(injector.get(String)).toEqual('Value: 3'); ```
     * @param {?} factory
     * @param {?=} dependencies
     * @return {?}
     */
    toFactory(factory, dependencies) {
        if (!lang_1.isFunction(factory)) {
            throw new exceptions_1.BaseException(`Trying to create a factory provider but "${lang_1.stringify(factory)}" is not a function!`);
        }
        return new Provider(this.token, { useFactory: factory, deps: dependencies });
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        ProviderBuilder.prototype.token;
    }
}
exports.ProviderBuilder = ProviderBuilder;
/**
 *  Creates a {@link Provider}. * See {@link Provider} for more details. * <!-- TODO: improve the docs -->
 * @param {?} token
 * @param {?} __1
 * @return {?}
 */
function provide(token, { useClass, useValue, useExisting, useFactory, deps, multi }) {
    return new Provider(token, {
        useClass: useClass,
        useValue: useValue,
        useExisting: useExisting,
        useFactory: useFactory,
        deps: deps,
        multi: multi
    });
}
exports.provide = provide;
//# sourceMappingURL=provider.js.map