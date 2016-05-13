goog.module('_angular$compiler$compiler');
/**
 * @module
 * @description
 * Starting point to import all compiler APIs.
 */
var element_schema_registry_1 = goog.require('_angular$compiler$src$schema$element__schema__registry');
exports.ElementSchemaRegistry = element_schema_registry_1.ElementSchemaRegistry;
var compiler_1 = goog.require('_angular$compiler$src$compiler');
exports.COMPILER_PROVIDERS = compiler_1.COMPILER_PROVIDERS;
exports.TEMPLATE_TRANSFORMS = compiler_1.TEMPLATE_TRANSFORMS;
exports.CompilerConfig = compiler_1.CompilerConfig;
exports.RenderTypes = compiler_1.RenderTypes;
exports.UrlResolver = compiler_1.UrlResolver;
exports.DEFAULT_PACKAGE_URL_PROVIDER = compiler_1.DEFAULT_PACKAGE_URL_PROVIDER;
exports.createOfflineCompileUrlResolver = compiler_1.createOfflineCompileUrlResolver;
exports.XHR = compiler_1.XHR;
exports.ViewResolver = compiler_1.ViewResolver;
exports.DirectiveResolver = compiler_1.DirectiveResolver;
exports.PipeResolver = compiler_1.PipeResolver;
exports.SourceModule = compiler_1.SourceModule;
exports.NormalizedComponentWithViewDirectives = compiler_1.NormalizedComponentWithViewDirectives;
exports.OfflineCompiler = compiler_1.OfflineCompiler;
exports.RuntimeCompiler = compiler_1.RuntimeCompiler;
exports.CompileMetadataWithIdentifier = compiler_1.CompileMetadataWithIdentifier;
exports.CompileMetadataWithType = compiler_1.CompileMetadataWithType;
exports.CompileIdentifierMetadata = compiler_1.CompileIdentifierMetadata;
exports.CompileDiDependencyMetadata = compiler_1.CompileDiDependencyMetadata;
exports.CompileProviderMetadata = compiler_1.CompileProviderMetadata;
exports.CompileFactoryMetadata = compiler_1.CompileFactoryMetadata;
exports.CompileTokenMetadata = compiler_1.CompileTokenMetadata;
exports.CompileTypeMetadata = compiler_1.CompileTypeMetadata;
exports.CompileQueryMetadata = compiler_1.CompileQueryMetadata;
exports.CompileTemplateMetadata = compiler_1.CompileTemplateMetadata;
exports.CompileDirectiveMetadata = compiler_1.CompileDirectiveMetadata;
exports.CompilePipeMetadata = compiler_1.CompilePipeMetadata;
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
//# sourceMappingURL=compiler.js.map