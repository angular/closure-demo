goog.module('_angular$core$src$security');
exports.SecurityContext = {};
exports.SecurityContext.NONE = 0;
exports.SecurityContext.HTML = 1;
exports.SecurityContext.STYLE = 2;
exports.SecurityContext.SCRIPT = 3;
exports.SecurityContext.URL = 4;
exports.SecurityContext.RESOURCE_URL = 5;
exports.SecurityContext[exports.SecurityContext.NONE] = "NONE";
exports.SecurityContext[exports.SecurityContext.HTML] = "HTML";
exports.SecurityContext[exports.SecurityContext.STYLE] = "STYLE";
exports.SecurityContext[exports.SecurityContext.SCRIPT] = "SCRIPT";
exports.SecurityContext[exports.SecurityContext.URL] = "URL";
exports.SecurityContext[exports.SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
/**
 * SanitizationService is used by the views to sanitize potentially dangerous values. This is a
 * private API, use code should only refer to DomSanitizationService.
 */
class SanitizationService {
}
exports.SanitizationService = SanitizationService;
//# sourceMappingURL=security.js.map