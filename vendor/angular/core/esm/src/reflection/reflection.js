goog.module('_angular$core$src$reflection$reflection');
var reflector_1 = goog.require('_angular$core$src$reflection$reflector');
var reflector_2 = reflector_1;
exports.Reflector = reflector_2.Reflector;
exports.ReflectionInfo = reflector_2.ReflectionInfo;
var reflection_capabilities_1 = goog.require('_angular$core$src$reflection$reflection__capabilities');
/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
exports.reflector = new reflector_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities());
//# sourceMappingURL=reflection.js.map