goog.module('_angular$compiler$src$compile__metadata');
var core_1 = goog.require('_angular$core');
var core_private_1 = goog.require('_angular$compiler$core__private');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var exceptions_1 = goog.require('_angular$compiler$src$facade$exceptions');
var collection_1 = goog.require('_angular$compiler$src$facade$collection');
var selector_1 = goog.require('_angular$compiler$src$selector');
var util_1 = goog.require('_angular$compiler$src$util');
var url_resolver_1 = goog.require('_angular$compiler$src$url__resolver');
// group 1: "property" from "[property]"
// group 2: "event" from "(event)"
var /** @type {?} */ HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
class CompileMetadataWithIdentifier {
    get identifier() { return (exceptions_1.unimplemented()); }
}
exports.CompileMetadataWithIdentifier = CompileMetadataWithIdentifier;
class CompileMetadataWithType extends CompileMetadataWithIdentifier {
    get type() { return (exceptions_1.unimplemented()); }
    get identifier() { return (exceptions_1.unimplemented()); }
}
exports.CompileMetadataWithType = CompileMetadataWithType;
/**
 * @param {?} data
 * @return {?}
 */
function metadataFromJson(data) {
    return _COMPILE_METADATA_FROM_JSON[data['class']](data);
}
exports.metadataFromJson = metadataFromJson;
class CompileIdentifierMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ runtime, name, moduleUrl, prefix, value } = {}) {
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.value = value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        let /** @type {?} */ value = lang_1.isArray(data['value']) ? _arrayFromJson(data['value'], metadataFromJson) :
            _objFromJson(data['value'], metadataFromJson);
        return new CompileIdentifierMetadata({ name: data['name'], prefix: data['prefix'], moduleUrl: data['moduleUrl'], value: value });
    }
    /**
     * @return {?}
     */
    toJson() {
        let /** @type {?} */ value = lang_1.isArray(this.value) ? _arrayToJson(this.value) : _objToJson(this.value);
        return {
            // Note: Runtime type can't be serialized...
            'class': 'Identifier',
            'name': this.name,
            'moduleUrl': this.moduleUrl,
            'prefix': this.prefix,
            'value': value
        };
    }
    get identifier() { return this; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileIdentifierMetadata.prototype.runtime;
        /** @type {?} */
        CompileIdentifierMetadata.prototype.name;
        /** @type {?} */
        CompileIdentifierMetadata.prototype.prefix;
        /** @type {?} */
        CompileIdentifierMetadata.prototype.moduleUrl;
        /** @type {?} */
        CompileIdentifierMetadata.prototype.value;
    }
}
exports.CompileIdentifierMetadata = CompileIdentifierMetadata;
class CompileDiDependencyMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ isAttribute, isSelf, isHost, isSkipSelf, isOptional, isValue, query, viewQuery, token, value } = {}) {
        this.isAttribute = lang_1.normalizeBool(isAttribute);
        this.isSelf = lang_1.normalizeBool(isSelf);
        this.isHost = lang_1.normalizeBool(isHost);
        this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
        this.isOptional = lang_1.normalizeBool(isOptional);
        this.isValue = lang_1.normalizeBool(isValue);
        this.query = query;
        this.viewQuery = viewQuery;
        this.token = token;
        this.value = value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileDiDependencyMetadata({
            token: _objFromJson(data['token'], CompileTokenMetadata.fromJson),
            query: _objFromJson(data['query'], CompileQueryMetadata.fromJson),
            viewQuery: _objFromJson(data['viewQuery'], CompileQueryMetadata.fromJson),
            value: data['value'],
            isAttribute: data['isAttribute'],
            isSelf: data['isSelf'],
            isHost: data['isHost'],
            isSkipSelf: data['isSkipSelf'],
            isOptional: data['isOptional'],
            isValue: data['isValue']
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'token': _objToJson(this.token),
            'query': _objToJson(this.query),
            'viewQuery': _objToJson(this.viewQuery),
            'value': this.value,
            'isAttribute': this.isAttribute,
            'isSelf': this.isSelf,
            'isHost': this.isHost,
            'isSkipSelf': this.isSkipSelf,
            'isOptional': this.isOptional,
            'isValue': this.isValue
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.isAttribute;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.isSelf;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.isHost;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.isSkipSelf;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.isOptional;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.isValue;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.query;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.viewQuery;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.token;
        /** @type {?} */
        CompileDiDependencyMetadata.prototype.value;
    }
}
exports.CompileDiDependencyMetadata = CompileDiDependencyMetadata;
class CompileProviderMetadata {
    /**
     * @param {?} __0
     */
    constructor({ token, useClass, useValue, useExisting, useFactory, deps, multi }) {
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.deps = lang_1.normalizeBlank(deps);
        this.multi = lang_1.normalizeBool(multi);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileProviderMetadata({
            token: _objFromJson(data['token'], CompileTokenMetadata.fromJson),
            useClass: _objFromJson(data['useClass'], CompileTypeMetadata.fromJson),
            useExisting: _objFromJson(data['useExisting'], CompileTokenMetadata.fromJson),
            useValue: _objFromJson(data['useValue'], CompileIdentifierMetadata.fromJson),
            useFactory: _objFromJson(data['useFactory'], CompileFactoryMetadata.fromJson),
            multi: data['multi'],
            deps: _arrayFromJson(data['deps'], CompileDiDependencyMetadata.fromJson)
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            // Note: Runtime type can't be serialized...
            'class': 'Provider',
            'token': _objToJson(this.token),
            'useClass': _objToJson(this.useClass),
            'useExisting': _objToJson(this.useExisting),
            'useValue': _objToJson(this.useValue),
            'useFactory': _objToJson(this.useFactory),
            'multi': this.multi,
            'deps': _arrayToJson(this.deps)
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileProviderMetadata.prototype.token;
        /** @type {?} */
        CompileProviderMetadata.prototype.useClass;
        /** @type {?} */
        CompileProviderMetadata.prototype.useValue;
        /** @type {?} */
        CompileProviderMetadata.prototype.useExisting;
        /** @type {?} */
        CompileProviderMetadata.prototype.useFactory;
        /** @type {?} */
        CompileProviderMetadata.prototype.deps;
        /** @type {?} */
        CompileProviderMetadata.prototype.multi;
    }
}
exports.CompileProviderMetadata = CompileProviderMetadata;
class CompileFactoryMetadata {
    /**
     * @param {?} __0
     */
    constructor({ runtime, name, moduleUrl, prefix, diDeps, value }) {
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.diDeps = _normalizeArray(diDeps);
        this.value = value;
    }
    get identifier() { return this; }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileFactoryMetadata({
            name: data['name'],
            prefix: data['prefix'],
            moduleUrl: data['moduleUrl'],
            value: data['value'],
            diDeps: _arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'class': 'Factory',
            'name': this.name,
            'prefix': this.prefix,
            'moduleUrl': this.moduleUrl,
            'value': this.value,
            'diDeps': _arrayToJson(this.diDeps)
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileFactoryMetadata.prototype.runtime;
        /** @type {?} */
        CompileFactoryMetadata.prototype.name;
        /** @type {?} */
        CompileFactoryMetadata.prototype.prefix;
        /** @type {?} */
        CompileFactoryMetadata.prototype.moduleUrl;
        /** @type {?} */
        CompileFactoryMetadata.prototype.value;
        /** @type {?} */
        CompileFactoryMetadata.prototype.diDeps;
    }
}
exports.CompileFactoryMetadata = CompileFactoryMetadata;
var /** @type {?} */ UNDEFINED = new Object();
class CompileTokenMetadata {
    /**
     * @param {?} __0
     */
    constructor({ value, identifier, identifierIsInstance }) {
        this._assetCacheKey = UNDEFINED;
        this.value = value;
        this.identifier = identifier;
        this.identifierIsInstance = lang_1.normalizeBool(identifierIsInstance);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileTokenMetadata({
            value: data['value'],
            identifier: _objFromJson(data['identifier'], CompileIdentifierMetadata.fromJson),
            identifierIsInstance: data['identifierIsInstance']
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'value': this.value,
            'identifier': _objToJson(this.identifier),
            'identifierIsInstance': this.identifierIsInstance
        };
    }
    get runtimeCacheKey() {
        if (lang_1.isPresent(this.identifier)) {
            return this.identifier.runtime;
        }
        else {
            return this.value;
        }
    }
    get assetCacheKey() {
        if (this._assetCacheKey === UNDEFINED) {
            if (lang_1.isPresent(this.identifier)) {
                if (lang_1.isPresent(this.identifier.moduleUrl) &&
                    lang_1.isPresent(url_resolver_1.getUrlScheme(this.identifier.moduleUrl))) {
                    var /** @type {?} */ uri = core_1.reflector.importUri({
                        'filePath': this.identifier.moduleUrl,
                        'name': this.identifier.name
                    });
                    this._assetCacheKey = `${this.identifier.name}|${uri}|${this.identifierIsInstance}`;
                }
                else {
                    this._assetCacheKey = null;
                }
            }
            else {
                this._assetCacheKey = this.value;
            }
        }
        return this._assetCacheKey;
    }
    /**
     * @param {?} token2
     * @return {?}
     */
    equalsTo(token2) {
        var /** @type {?} */ rk = this.runtimeCacheKey;
        var /** @type {?} */ ak = this.assetCacheKey;
        return (lang_1.isPresent(rk) && rk == token2.runtimeCacheKey) ||
            (lang_1.isPresent(ak) && ak == token2.assetCacheKey);
    }
    get name() {
        return lang_1.isPresent(this.value) ? util_1.sanitizeIdentifier(this.value) : this.identifier.name;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileTokenMetadata.prototype.value;
        /** @type {?} */
        CompileTokenMetadata.prototype.identifier;
        /** @type {?} */
        CompileTokenMetadata.prototype.identifierIsInstance;
        /** @type {?} */
        CompileTokenMetadata.prototype._assetCacheKey;
    }
}
exports.CompileTokenMetadata = CompileTokenMetadata;
class CompileTokenMap {
    constructor() {
        this._valueMap = new Map();
        this._values = [];
    }
    /**
     * @param {?} token
     * @param {?} value
     * @return {?}
     */
    add(token, value) {
        var /** @type {?} */ existing = this.get(token);
        if (lang_1.isPresent(existing)) {
            throw new exceptions_1.BaseException(`Can only add to a TokenMap! Token: ${token.name}`);
        }
        this._values.push(value);
        var /** @type {?} */ rk = token.runtimeCacheKey;
        if (lang_1.isPresent(rk)) {
            this._valueMap.set(rk, value);
        }
        var /** @type {?} */ ak = token.assetCacheKey;
        if (lang_1.isPresent(ak)) {
            this._valueMap.set(ak, value);
        }
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        var /** @type {?} */ rk = token.runtimeCacheKey;
        var /** @type {?} */ ak = token.assetCacheKey;
        var /** @type {?} */ result;
        if (lang_1.isPresent(rk)) {
            result = this._valueMap.get(rk);
        }
        if (lang_1.isBlank(result) && lang_1.isPresent(ak)) {
            result = this._valueMap.get(ak);
        }
        return result;
    }
    /**
     * @return {?}
     */
    values() { return this._values; }
    get size() { return this._values.length; }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileTokenMap.prototype._valueMap;
        /** @type {?} */
        CompileTokenMap.prototype._values;
    }
}
exports.CompileTokenMap = CompileTokenMap;
/**
 * Metadata regarding compilation of a type.
 */
class CompileTypeMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ runtime, name, moduleUrl, prefix, isHost, value, diDeps } = {}) {
        this.runtime = runtime;
        this.name = name;
        this.moduleUrl = moduleUrl;
        this.prefix = prefix;
        this.isHost = lang_1.normalizeBool(isHost);
        this.value = value;
        this.diDeps = _normalizeArray(diDeps);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileTypeMetadata({
            name: data['name'],
            moduleUrl: data['moduleUrl'],
            prefix: data['prefix'],
            isHost: data['isHost'],
            value: data['value'],
            diDeps: _arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
        });
    }
    get identifier() { return this; }
    get type() { return this; }
    /**
     * @return {?}
     */
    toJson() {
        return {
            // Note: Runtime type can't be serialized...
            'class': 'Type',
            'name': this.name,
            'moduleUrl': this.moduleUrl,
            'prefix': this.prefix,
            'isHost': this.isHost,
            'value': this.value,
            'diDeps': _arrayToJson(this.diDeps)
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileTypeMetadata.prototype.runtime;
        /** @type {?} */
        CompileTypeMetadata.prototype.name;
        /** @type {?} */
        CompileTypeMetadata.prototype.prefix;
        /** @type {?} */
        CompileTypeMetadata.prototype.moduleUrl;
        /** @type {?} */
        CompileTypeMetadata.prototype.isHost;
        /** @type {?} */
        CompileTypeMetadata.prototype.value;
        /** @type {?} */
        CompileTypeMetadata.prototype.diDeps;
    }
}
exports.CompileTypeMetadata = CompileTypeMetadata;
class CompileQueryMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ selectors, descendants, first, propertyName, read } = {}) {
        this.selectors = selectors;
        this.descendants = lang_1.normalizeBool(descendants);
        this.first = lang_1.normalizeBool(first);
        this.propertyName = propertyName;
        this.read = read;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileQueryMetadata({
            selectors: _arrayFromJson(data['selectors'], CompileTokenMetadata.fromJson),
            descendants: data['descendants'],
            first: data['first'],
            propertyName: data['propertyName'],
            read: _objFromJson(data['read'], CompileTokenMetadata.fromJson)
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'selectors': _arrayToJson(this.selectors),
            'descendants': this.descendants,
            'first': this.first,
            'propertyName': this.propertyName,
            'read': _objToJson(this.read)
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileQueryMetadata.prototype.selectors;
        /** @type {?} */
        CompileQueryMetadata.prototype.descendants;
        /** @type {?} */
        CompileQueryMetadata.prototype.first;
        /** @type {?} */
        CompileQueryMetadata.prototype.propertyName;
        /** @type {?} */
        CompileQueryMetadata.prototype.read;
    }
}
exports.CompileQueryMetadata = CompileQueryMetadata;
/**
 * Metadata regarding compilation of a template.
 */
class CompileTemplateMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ encapsulation, template, templateUrl, styles, styleUrls, ngContentSelectors } = {}) {
        this.encapsulation = lang_1.isPresent(encapsulation) ? encapsulation : core_1.ViewEncapsulation.Emulated;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = lang_1.isPresent(styles) ? styles : [];
        this.styleUrls = lang_1.isPresent(styleUrls) ? styleUrls : [];
        this.ngContentSelectors = lang_1.isPresent(ngContentSelectors) ? ngContentSelectors : [];
    }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileTemplateMetadata({
            encapsulation: lang_1.isPresent(data['encapsulation']) ?
                core_private_1.VIEW_ENCAPSULATION_VALUES[data['encapsulation']] :
                data['encapsulation'],
            template: data['template'],
            templateUrl: data['templateUrl'],
            styles: data['styles'],
            styleUrls: data['styleUrls'],
            ngContentSelectors: data['ngContentSelectors']
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'encapsulation': lang_1.isPresent(this.encapsulation) ? lang_1.serializeEnum(this.encapsulation) : this.encapsulation,
            'template': this.template,
            'templateUrl': this.templateUrl,
            'styles': this.styles,
            'styleUrls': this.styleUrls,
            'ngContentSelectors': this.ngContentSelectors
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileTemplateMetadata.prototype.encapsulation;
        /** @type {?} */
        CompileTemplateMetadata.prototype.template;
        /** @type {?} */
        CompileTemplateMetadata.prototype.templateUrl;
        /** @type {?} */
        CompileTemplateMetadata.prototype.styles;
        /** @type {?} */
        CompileTemplateMetadata.prototype.styleUrls;
        /** @type {?} */
        CompileTemplateMetadata.prototype.ngContentSelectors;
    }
}
exports.CompileTemplateMetadata = CompileTemplateMetadata;
/**
 * Metadata regarding compilation of a directive.
 */
class CompileDirectiveMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ type, isComponent, selector, exportAs, changeDetection, inputs, outputs, hostListeners, hostProperties, hostAttributes, lifecycleHooks, providers, viewProviders, queries, viewQueries, template } = {}) {
        this.type = type;
        this.isComponent = isComponent;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
        this.providers = _normalizeArray(providers);
        this.viewProviders = _normalizeArray(viewProviders);
        this.queries = _normalizeArray(queries);
        this.viewQueries = _normalizeArray(viewQueries);
        this.template = template;
    }
    /**
     * @param {?=} __0
     * @return {?}
     */
    static create({ type, isComponent, selector, exportAs, changeDetection, inputs, outputs, host, lifecycleHooks, providers, viewProviders, queries, viewQueries, template } = {}) {
        var /** @type {?} */ hostListeners = {};
        var /** @type {?} */ hostProperties = {};
        var /** @type {?} */ hostAttributes = {};
        if (lang_1.isPresent(host)) {
            collection_1.StringMapWrapper.forEach(host, (value, key) => {
                var /** @type {?} */ matches = lang_1.RegExpWrapper.firstMatch(HOST_REG_EXP, key);
                if (lang_1.isBlank(matches)) {
                    hostAttributes[key] = value;
                }
                else if (lang_1.isPresent(matches[1])) {
                    hostProperties[matches[1]] = value;
                }
                else if (lang_1.isPresent(matches[2])) {
                    hostListeners[matches[2]] = value;
                }
            });
        }
        var /** @type {?} */ inputsMap = {};
        if (lang_1.isPresent(inputs)) {
            inputs.forEach((bindConfig) => {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var /** @type {?} */ parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var /** @type {?} */ outputsMap = {};
        if (lang_1.isPresent(outputs)) {
            outputs.forEach((bindConfig) => {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var /** @type {?} */ parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            type: type,
            isComponent: lang_1.normalizeBool(isComponent),
            selector: selector,
            exportAs: exportAs,
            changeDetection: changeDetection,
            inputs: inputsMap,
            outputs: outputsMap,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            hostAttributes: hostAttributes,
            lifecycleHooks: lang_1.isPresent(lifecycleHooks) ? lifecycleHooks : [],
            providers: providers,
            viewProviders: viewProviders,
            queries: queries,
            viewQueries: viewQueries,
            template: template
        });
    }
    get identifier() { return this.type; }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompileDirectiveMetadata({
            isComponent: data['isComponent'],
            selector: data['selector'],
            exportAs: data['exportAs'],
            type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
            changeDetection: lang_1.isPresent(data['changeDetection']) ?
                core_private_1.CHANGE_DETECTION_STRATEGY_VALUES[data['changeDetection']] :
                data['changeDetection'],
            inputs: data['inputs'],
            outputs: data['outputs'],
            hostListeners: data['hostListeners'],
            hostProperties: data['hostProperties'],
            hostAttributes: data['hostAttributes'],
            lifecycleHooks: ((data['lifecycleHooks'])).map(hookValue => core_private_1.LIFECYCLE_HOOKS_VALUES[hookValue]),
            template: lang_1.isPresent(data['template']) ? CompileTemplateMetadata.fromJson(data['template']) :
                data['template'],
            providers: _arrayFromJson(data['providers'], metadataFromJson),
            viewProviders: _arrayFromJson(data['viewProviders'], metadataFromJson),
            queries: _arrayFromJson(data['queries'], CompileQueryMetadata.fromJson),
            viewQueries: _arrayFromJson(data['viewQueries'], CompileQueryMetadata.fromJson)
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'class': 'Directive',
            'isComponent': this.isComponent,
            'selector': this.selector,
            'exportAs': this.exportAs,
            'type': lang_1.isPresent(this.type) ? this.type.toJson() : this.type,
            'changeDetection': lang_1.isPresent(this.changeDetection) ? lang_1.serializeEnum(this.changeDetection) :
                this.changeDetection,
            'inputs': this.inputs,
            'outputs': this.outputs,
            'hostListeners': this.hostListeners,
            'hostProperties': this.hostProperties,
            'hostAttributes': this.hostAttributes,
            'lifecycleHooks': this.lifecycleHooks.map(hook => lang_1.serializeEnum(hook)),
            'template': lang_1.isPresent(this.template) ? this.template.toJson() : this.template,
            'providers': _arrayToJson(this.providers),
            'viewProviders': _arrayToJson(this.viewProviders),
            'queries': _arrayToJson(this.queries),
            'viewQueries': _arrayToJson(this.viewQueries)
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompileDirectiveMetadata.prototype.type;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.isComponent;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.selector;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.exportAs;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.changeDetection;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.inputs;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.outputs;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.hostListeners;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.hostProperties;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.hostAttributes;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.lifecycleHooks;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.providers;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.viewProviders;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.queries;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.viewQueries;
        /** @type {?} */
        CompileDirectiveMetadata.prototype.template;
    }
}
exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
/**
 *  Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
 * @param {?} componentType
 * @param {?} componentSelector
 * @return {?}
 */
function createHostComponentMeta(componentType, componentSelector) {
    var /** @type {?} */ template = selector_1.CssSelector.parse(componentSelector)[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        type: new CompileTypeMetadata({
            runtime: Object,
            name: `${componentType.name}_Host`,
            moduleUrl: componentType.moduleUrl,
            isHost: true
        }),
        template: new CompileTemplateMetadata({ template: template, templateUrl: '', styles: [], styleUrls: [], ngContentSelectors: [] }),
        changeDetection: core_1.ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        lifecycleHooks: [],
        isComponent: true,
        selector: '*',
        providers: [],
        viewProviders: [],
        queries: [],
        viewQueries: []
    });
}
exports.createHostComponentMeta = createHostComponentMeta;
class CompilePipeMetadata {
    /**
     * @param {?=} __0
     */
    constructor({ type, name, pure, lifecycleHooks } = {}) {
        this.type = type;
        this.name = name;
        this.pure = lang_1.normalizeBool(pure);
        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
    }
    get identifier() { return this.type; }
    /**
     * @param {?} data
     * @return {?}
     */
    static fromJson(data) {
        return new CompilePipeMetadata({
            type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
            name: data['name'],
            pure: data['pure']
        });
    }
    /**
     * @return {?}
     */
    toJson() {
        return {
            'class': 'Pipe',
            'type': lang_1.isPresent(this.type) ? this.type.toJson() : null,
            'name': this.name,
            'pure': this.pure
        };
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        CompilePipeMetadata.prototype.type;
        /** @type {?} */
        CompilePipeMetadata.prototype.name;
        /** @type {?} */
        CompilePipeMetadata.prototype.pure;
        /** @type {?} */
        CompilePipeMetadata.prototype.lifecycleHooks;
    }
}
exports.CompilePipeMetadata = CompilePipeMetadata;
var /** @type {?} */ _COMPILE_METADATA_FROM_JSON = {
    'Directive': CompileDirectiveMetadata.fromJson,
    'Pipe': CompilePipeMetadata.fromJson,
    'Type': CompileTypeMetadata.fromJson,
    'Provider': CompileProviderMetadata.fromJson,
    'Identifier': CompileIdentifierMetadata.fromJson,
    'Factory': CompileFactoryMetadata.fromJson
};
/**
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function _arrayFromJson(obj, fn) {
    return lang_1.isBlank(obj) ? null : obj.map(o => _objFromJson(o, fn));
}
/**
 * @param {?} obj
 * @return {?}
 */
function _arrayToJson(obj) {
    return lang_1.isBlank(obj) ? null : obj.map(_objToJson);
}
/**
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function _objFromJson(obj, fn) {
    if (lang_1.isArray(obj))
        return _arrayFromJson(obj, fn);
    if (lang_1.isString(obj) || lang_1.isBlank(obj) || lang_1.isBoolean(obj) || lang_1.isNumber(obj))
        return obj;
    return fn(obj);
}
/**
 * @param {?} obj
 * @return {?}
 */
function _objToJson(obj) {
    if (lang_1.isArray(obj))
        return _arrayToJson(obj);
    if (lang_1.isString(obj) || lang_1.isBlank(obj) || lang_1.isBoolean(obj) || lang_1.isNumber(obj))
        return obj;
    return obj.toJson();
}
/**
 * @param {?} obj
 * @return {?}
 */
function _normalizeArray(obj) {
    return lang_1.isPresent(obj) ? obj : [];
}
//# sourceMappingURL=compile_metadata.js.map