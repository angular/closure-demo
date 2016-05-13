goog.module('_angular$core$src$di');/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */

var metadata_1 = goog.require('_angular$core$src$di$metadata');
exports.InjectMetadata = metadata_1.InjectMetadata;
exports.OptionalMetadata = metadata_1.OptionalMetadata;
exports.InjectableMetadata = metadata_1.InjectableMetadata;
exports.SelfMetadata = metadata_1.SelfMetadata;
exports.HostMetadata = metadata_1.HostMetadata;
exports.SkipSelfMetadata = metadata_1.SkipSelfMetadata;
exports.DependencyMetadata = metadata_1.DependencyMetadata;
// we have to reexport * because Dart and TS export two different sets of types
var decorators_1 = goog.require('_angular$core$src$di$decorators');
exports.Inject = decorators_1.Inject;
exports.Optional = decorators_1.Optional;
exports.Injectable = decorators_1.Injectable;
exports.Self = decorators_1.Self;
exports.Host = decorators_1.Host;
exports.SkipSelf = decorators_1.SkipSelf;
var forward_ref_1 = goog.require('_angular$core$src$di$forward__ref');
exports.forwardRef = forward_ref_1.forwardRef;
exports.resolveForwardRef = forward_ref_1.resolveForwardRef;
var injector_1 = goog.require('_angular$core$src$di$injector');
exports.Injector = injector_1.Injector;
var reflective_injector_1 = goog.require('_angular$core$src$di$reflective__injector');
exports.ReflectiveInjector = reflective_injector_1.ReflectiveInjector;
var provider_1 = goog.require('_angular$core$src$di$provider');
exports.Binding = provider_1.Binding;
exports.ProviderBuilder = provider_1.ProviderBuilder;
exports.bind = provider_1.bind;
exports.Provider = provider_1.Provider;
exports.provide = provider_1.provide;
var reflective_provider_1 = goog.require('_angular$core$src$di$reflective__provider');
exports.ResolvedReflectiveFactory = reflective_provider_1.ResolvedReflectiveFactory;
exports.ReflectiveDependency = reflective_provider_1.ReflectiveDependency;
var reflective_key_1 = goog.require('_angular$core$src$di$reflective__key');
exports.ReflectiveKey = reflective_key_1.ReflectiveKey;
var reflective_exceptions_1 = goog.require('_angular$core$src$di$reflective__exceptions');
exports.NoProviderError = reflective_exceptions_1.NoProviderError;
exports.AbstractProviderError = reflective_exceptions_1.AbstractProviderError;
exports.CyclicDependencyError = reflective_exceptions_1.CyclicDependencyError;
exports.InstantiationError = reflective_exceptions_1.InstantiationError;
exports.InvalidProviderError = reflective_exceptions_1.InvalidProviderError;
exports.NoAnnotationError = reflective_exceptions_1.NoAnnotationError;
exports.OutOfBoundsError = reflective_exceptions_1.OutOfBoundsError;
var opaque_token_1 = goog.require('_angular$core$src$di$opaque__token');
exports.OpaqueToken = opaque_token_1.OpaqueToken;
//# sourceMappingURL=di.js.map