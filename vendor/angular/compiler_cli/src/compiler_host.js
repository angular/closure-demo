"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var path = require('path');
var tsickle = require('tsickle');
var reflector_host_1 = require('./reflector_host');
/**
 * Implementation of CompilerHost that forwards all methods to another instance.
 * Useful for partial implementations to override only methods they care about.
 */
var DelegatingHost = (function () {
    function DelegatingHost(delegate) {
        var _this = this;
        this.delegate = delegate;
        this.getSourceFile = function (fileName, languageVersion, onError) {
            return _this.delegate.getSourceFile(fileName, languageVersion, onError);
        };
        this.getCancellationToken = function () { return _this.delegate.getCancellationToken(); };
        this.getDefaultLibFileName = function (options) {
            return _this.delegate.getDefaultLibFileName(options);
        };
        this.getDefaultLibLocation = function () { return _this.delegate.getDefaultLibLocation(); };
        this.writeFile = this.delegate.writeFile;
        this.getCurrentDirectory = function () { return _this.delegate.getCurrentDirectory(); };
        this.getCanonicalFileName = function (fileName) { return _this.delegate.getCanonicalFileName(fileName); };
        this.useCaseSensitiveFileNames = function () { return _this.delegate.useCaseSensitiveFileNames(); };
        this.getNewLine = function () { return _this.delegate.getNewLine(); };
        this.fileExists = function (fileName) { return _this.delegate.fileExists(fileName); };
        this.readFile = function (fileName) { return _this.delegate.readFile(fileName); };
        this.trace = function (s) { return _this.delegate.trace(s); };
        this.directoryExists = function (directoryName) { return _this.delegate.directoryExists(directoryName); };
    }
    return DelegatingHost;
}());
exports.DelegatingHost = DelegatingHost;
var TsickleHost = (function (_super) {
    __extends(TsickleHost, _super);
    function TsickleHost(delegate, options, ngOptions) {
        var _this = this;
        _super.call(this, delegate);
        this.options = options;
        this.ngOptions = ngOptions;
        // Additional diagnostics gathered by pre- and post-emit transformations.
        this.diagnostics = [];
        this.TSICKLE_SUPPORT = "\ninterface DecoratorInvocation {\n  type: Function;\n  args?: any[];\n}\n";
        this.getSourceFile = function (fileName, languageVersion, onError) {
            var originalContent = _this.delegate.readFile(fileName);
            if (/\.d\.ts$/.test(fileName)) {
                return ts.createSourceFile(fileName, originalContent, languageVersion, true);
            }
            else {
                var firstPass = originalContent;
                if (_this.ngOptions.googleClosureOutput) {
                    var annotateResult = tsickle.annotate(_this.program, _this.program.getSourceFile(fileName), { untyped: true });
                    if (annotateResult.diagnostics) {
                        (_a = _this.diagnostics).push.apply(_a, annotateResult.diagnostics);
                    }
                    firstPass = annotateResult.output;
                }
                var converted = tsickle.convertDecorators(fileName, firstPass);
                if (converted.diagnostics) {
                    (_b = _this.diagnostics).push.apply(_b, converted.diagnostics);
                }
                return ts.createSourceFile(fileName, converted.output + _this.TSICKLE_SUPPORT, languageVersion, true);
            }
            var _a, _b;
        };
        this.writeFile = function (fileName, data, writeByteOrderMark, onError, sourceFiles) {
            var toWrite = data;
            if (/\.js$/.test(fileName) && _this.ngOptions.googleClosureOutput) {
                var _a = tsickle.convertCommonJsToGoogModule(path.relative(_this.delegate.getCurrentDirectory(), fileName), data, TsickleHost.pathToGoogModuleName), output = _a.output, referencedModules = _a.referencedModules;
                toWrite = output;
            }
            return _this.delegate.writeFile(fileName, toWrite, writeByteOrderMark, onError, sourceFiles);
        };
    }
    /**
     * Massages file names into valid goog.module names:
     * - resolves relative paths to the given context
     * - replace resolved module path with module name
     * - replaces '/' with '$' to have a flat name.
     * - replace first char if non-alpha
     * - replace subsequent non-alpha numeric chars
     */
    TsickleHost.pathToGoogModuleName = function (context, importPath) {
        importPath = importPath.replace(/\.js$/, '');
        if (importPath[0] == '.') {
            // './foo' or '../foo'.
            // Resolve the path against the dirname of the current module.
            importPath = path.join(path.dirname(context), importPath);
        }
        var dist = /dist\/packages-dist\/([^\/]+)\/esm\/(.*)/;
        if (dist.test(importPath)) {
            importPath = importPath.replace(dist, function (match, pkg, impt) {
                return "@angular/" + pkg + "/" + impt;
            }).replace(/\/index$/, '');
        }
        var rxDist = /dist\/es6\/(.*)/;
        if (rxDist.test(importPath)) {
            importPath = importPath.replace(rxDist, "rxjs/$1");
        }
        // Replace characters not supported by goog.module.
        var moduleName = importPath.replace(/\//g, '$')
            .replace(/_/g, '__')
            .replace(/^[^a-zA-Z_$]/, '_')
            .replace(/[^a-zA-Z_0-9._$]/g, '_');
        return moduleName;
    };
    return TsickleHost;
}(DelegatingHost));
exports.TsickleHost = TsickleHost;
var IGNORED_FILES = /\.ngfactory\.js$|\.css\.js$|\.css\.shim\.js$/;
var MetadataWriterHost = (function (_super) {
    __extends(MetadataWriterHost, _super);
    function MetadataWriterHost(delegate, program, options, ngOptions) {
        var _this = this;
        _super.call(this, delegate);
        this.writeFile = function (fileName, data, writeByteOrderMark, onError, sourceFiles) {
            if (/\.d\.ts$/.test(fileName)) {
                // Let the original file be written first; this takes care of creating parent directories
                _this.delegate.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
                // TODO: remove this early return after https://github.com/Microsoft/TypeScript/pull/8412 is
                // released
                return;
            }
            if (IGNORED_FILES.test(fileName)) {
                return;
            }
            if (!sourceFiles) {
                throw new Error('Metadata emit requires the sourceFiles are passed to WriteFileCallback. ' +
                    'Update to TypeScript ^1.9.0-dev');
            }
            if (sourceFiles.length > 1) {
                throw new Error('Bundled emit with --out is not supported');
            }
            _this.reflectorHost.writeMetadata(fileName, sourceFiles[0]);
        };
        this.reflectorHost = new reflector_host_1.NodeReflectorHost(program, this, options, ngOptions);
    }
    return MetadataWriterHost;
}(DelegatingHost));
exports.MetadataWriterHost = MetadataWriterHost;
//# sourceMappingURL=compiler_host.js.map