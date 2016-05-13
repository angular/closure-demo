goog.module('_angular$core$src$platform__common__providers');
var console_1 = goog.require('_angular$core$src$console');
var reflection_1 = goog.require('_angular$core$src$reflection$reflection');
var reflector_reader_1 = goog.require('_angular$core$src$reflection$reflector__reader');
var testability_1 = goog.require('_angular$core$src$testability$testability');
var application_ref_1 = goog.require('_angular$core$src$application__ref');
/**
 * @return {?}
 */
function _reflector() {
    return reflection_1.reflector;
}
var /** @type {?} */ __unused; // prevent missing use Dart warning.
/**
 * A default set of providers which should be included in any Angular platform.
 */
exports.PLATFORM_COMMON_PROVIDERS = [
    application_ref_1.PLATFORM_CORE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: reflection_1.Reflector, useFactory: _reflector, deps: [] },
    /*@ts2dart_Provider*/ { provide: reflector_reader_1.ReflectorReader, useExisting: reflection_1.Reflector },
    testability_1.TestabilityRegistry,
    console_1.Console
];
//# sourceMappingURL=platform_common_providers.js.map