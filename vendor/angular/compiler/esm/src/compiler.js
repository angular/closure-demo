goog.module('_angular$compiler$src$compiler');
var core_1 = goog.require('_angular$core');
var lang_1 = goog.require('_angular$compiler$src$facade$lang');
var template_ast_1 = goog.require('_angular$compiler$src$template__ast');
exports.TextAst = template_ast_1.TextAst;
exports.BoundTextAst = template_ast_1.BoundTextAst;
exports.AttrAst = template_ast_1.AttrAst;
exports.BoundElementPropertyAst = template_ast_1.BoundElementPropertyAst;
exports.BoundEventAst = template_ast_1.BoundEventAst;
exports.ReferenceAst = template_ast_1.ReferenceAst;
exports.VariableAst = template_ast_1.VariableAst;
exports.ElementAst = template_ast_1.ElementAst;
exports.EmbeddedTemplateAst = template_ast_1.EmbeddedTemplateAst;
exports.BoundDirectivePropertyAst = template_ast_1.BoundDirectivePropertyAst;
exports.DirectiveAst = template_ast_1.DirectiveAst;
exports.ProviderAst = template_ast_1.ProviderAst;
exports.ProviderAstType = template_ast_1.ProviderAstType;
exports.NgContentAst = template_ast_1.NgContentAst;
exports.PropertyBindingType = template_ast_1.PropertyBindingType;
exports.templateVisitAll = template_ast_1.templateVisitAll;
var template_parser_1 = goog.require('_angular$compiler$src$template__parser');
exports.TEMPLATE_TRANSFORMS = template_parser_1.TEMPLATE_TRANSFORMS;
var config_1 = goog.require('_angular$compiler$src$config');
exports.CompilerConfig = config_1.CompilerConfig;
exports.RenderTypes = config_1.RenderTypes;
var compile_metadata_1 = goog.require('_angular$compiler$src$compile__metadata');
exports.CompileMetadataWithIdentifier = compile_metadata_1.CompileMetadataWithIdentifier;
exports.CompileMetadataWithType = compile_metadata_1.CompileMetadataWithType;
exports.metadataFromJson = compile_metadata_1.metadataFromJson;
exports.CompileIdentifierMetadata = compile_metadata_1.CompileIdentifierMetadata;
exports.CompileDiDependencyMetadata = compile_metadata_1.CompileDiDependencyMetadata;
exports.CompileProviderMetadata = compile_metadata_1.CompileProviderMetadata;
exports.CompileFactoryMetadata = compile_metadata_1.CompileFactoryMetadata;
exports.CompileTokenMetadata = compile_metadata_1.CompileTokenMetadata;
exports.CompileTokenMap = compile_metadata_1.CompileTokenMap;
exports.CompileTypeMetadata = compile_metadata_1.CompileTypeMetadata;
exports.CompileQueryMetadata = compile_metadata_1.CompileQueryMetadata;
exports.CompileTemplateMetadata = compile_metadata_1.CompileTemplateMetadata;
exports.CompileDirectiveMetadata = compile_metadata_1.CompileDirectiveMetadata;
exports.createHostComponentMeta = compile_metadata_1.createHostComponentMeta;
exports.CompilePipeMetadata = compile_metadata_1.CompilePipeMetadata;
var offline_compiler_1 = goog.require('_angular$compiler$src$offline__compiler');
exports.SourceModule = offline_compiler_1.SourceModule;
exports.StyleSheetSourceWithImports = offline_compiler_1.StyleSheetSourceWithImports;
exports.NormalizedComponentWithViewDirectives = offline_compiler_1.NormalizedComponentWithViewDirectives;
exports.OfflineCompiler = offline_compiler_1.OfflineCompiler;
var runtime_compiler_1 = goog.require('_angular$compiler$src$runtime__compiler');
exports.RuntimeCompiler = runtime_compiler_1.RuntimeCompiler;
var url_resolver_1 = goog.require('_angular$compiler$src$url__resolver');
exports.createUrlResolverWithoutPackagePrefix = url_resolver_1.createUrlResolverWithoutPackagePrefix;
exports.createOfflineCompileUrlResolver = url_resolver_1.createOfflineCompileUrlResolver;
exports.DEFAULT_PACKAGE_URL_PROVIDER = url_resolver_1.DEFAULT_PACKAGE_URL_PROVIDER;
exports.UrlResolver = url_resolver_1.UrlResolver;
exports.getUrlScheme = url_resolver_1.getUrlScheme;
var xhr_1 = goog.require('_angular$compiler$src$xhr');
exports.XHR = xhr_1.XHR;
var view_resolver_1 = goog.require('_angular$compiler$src$view__resolver');
exports.ViewResolver = view_resolver_1.ViewResolver;
var directive_resolver_1 = goog.require('_angular$compiler$src$directive__resolver');
exports.DirectiveResolver = directive_resolver_1.DirectiveResolver;
var pipe_resolver_1 = goog.require('_angular$compiler$src$pipe__resolver');
exports.PipeResolver = pipe_resolver_1.PipeResolver;
var template_parser_2 = template_parser_1;
var html_parser_1 = goog.require('_angular$compiler$src$html__parser');
var directive_normalizer_1 = goog.require('_angular$compiler$src$directive__normalizer');
var metadata_resolver_1 = goog.require('_angular$compiler$src$metadata__resolver');
var style_compiler_1 = goog.require('_angular$compiler$src$style__compiler');
var view_compiler_1 = goog.require('_angular$compiler$src$view__compiler$view__compiler');
var config_2 = config_1;
var runtime_compiler_2 = runtime_compiler_1;
var element_schema_registry_1 = goog.require('_angular$compiler$src$schema$element__schema__registry');
var dom_element_schema_registry_1 = goog.require('_angular$compiler$src$schema$dom__element__schema__registry');
var url_resolver_2 = url_resolver_1;
var parser_1 = goog.require('_angular$compiler$src$expression__parser$parser');
var lexer_1 = goog.require('_angular$compiler$src$expression__parser$lexer');
var view_resolver_2 = view_resolver_1;
var directive_resolver_2 = directive_resolver_1;
var pipe_resolver_2 = pipe_resolver_1;
/**
 * @return {?}
 */
function _createCompilerConfig() {
    return new config_2.CompilerConfig(lang_1.assertionsEnabled(), false, true);
}
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
exports.COMPILER_PROVIDERS = 
/*@ts2dart_const*/ [
    lexer_1.Lexer,
    parser_1.Parser,
    html_parser_1.HtmlParser,
    template_parser_2.TemplateParser,
    directive_normalizer_1.DirectiveNormalizer,
    metadata_resolver_1.CompileMetadataResolver,
    url_resolver_2.DEFAULT_PACKAGE_URL_PROVIDER,
    style_compiler_1.StyleCompiler,
    view_compiler_1.ViewCompiler,
    /*@ts2dart_Provider*/ { provide: config_2.CompilerConfig, useFactory: _createCompilerConfig, deps: [] },
    runtime_compiler_2.RuntimeCompiler,
    /*@ts2dart_Provider*/ { provide: core_1.ComponentResolver, useExisting: runtime_compiler_2.RuntimeCompiler },
    dom_element_schema_registry_1.DomElementSchemaRegistry,
    /*@ts2dart_Provider*/ { provide: element_schema_registry_1.ElementSchemaRegistry, useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry },
    url_resolver_2.UrlResolver,
    view_resolver_2.ViewResolver,
    directive_resolver_2.DirectiveResolver,
    pipe_resolver_2.PipeResolver
];
//# sourceMappingURL=compiler.js.map