goog.module('_angular$compiler$testing$schema__registry__mock');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var core_private_1 = goog.require('_angular$compiler$core__private');
class MockSchemaRegistry {
    /**
     * @param {?} existingProperties
     * @param {?} attrPropMapping
     */
    constructor(existingProperties, attrPropMapping) {
        this.existingProperties = existingProperties;
        this.attrPropMapping = attrPropMapping;
    }
    /**
     * @param {?} tagName
     * @param {?} property
     * @return {?}
     */
    hasProperty(tagName, property) {
        var /** @type {?} */ result = this.existingProperties[property];
        return lang_1.isPresent(result) ? result : true;
    }
    /**
     * @param {?} tagName
     * @param {?} property
     * @return {?}
     */
    securityContext(tagName, property) {
        return core_private_1.SecurityContext.NONE;
    }
    /**
     * @param {?} attrName
     * @return {?}
     */
    getMappedPropName(attrName) {
        var /** @type {?} */ result = this.attrPropMapping[attrName];
        return lang_1.isPresent(result) ? result : attrName;
    }
    static _tsickle_typeAnnotationsHelper() {
        /** @type {?} */
        MockSchemaRegistry.prototype.existingProperties;
        /** @type {?} */
        MockSchemaRegistry.prototype.attrPropMapping;
    }
}
exports.MockSchemaRegistry = MockSchemaRegistry;
//# sourceMappingURL=schema_registry_mock.js.map