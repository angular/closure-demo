"use strict";
var ts = require('typescript');
// Don't import from fs in general, that's the CompilerHost's job
var fs_1 = require('fs');
var path = require('path');
var DEBUG = false;
var SOURCE_EXTENSION = /\.[jt]s$/;
function debug(msg) {
    var o = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        o[_i - 1] = arguments[_i];
    }
    if (DEBUG)
        console.log.apply(console, [msg].concat(o));
}
function formatDiagnostics(diags) {
    return diags.map(function (d) {
        var res = ts.DiagnosticCategory[d.category];
        if (d.file) {
            res += ' at ' + d.file.fileName + ':';
            var _a = d.file.getLineAndCharacterOfPosition(d.start), line = _a.line, character = _a.character;
            res += (line + 1) + ':' + (character + 1) + ':';
        }
        res += ' ' + ts.flattenDiagnosticMessageText(d.messageText, '\n');
        return res;
    })
        .join('\n');
}
exports.formatDiagnostics = formatDiagnostics;
function check(diags) {
    if (diags && diags.length && diags[0]) {
        throw new Error(formatDiagnostics(diags));
    }
}
exports.check = check;
var Tsc = (function () {
    function Tsc() {
    }
    Tsc.prototype.readConfiguration = function (project, basePath) {
        this.basePath = basePath;
        // Allow a directory containing tsconfig.json as the project value
        if (fs_1.lstatSync(project).isDirectory()) {
            project = path.join(project, "tsconfig.json");
        }
        var _a = ts.readConfigFile(project, ts.sys.readFile), config = _a.config, error = _a.error;
        check([error]);
        this.parsed =
            ts.parseJsonConfigFileContent(config, { readDirectory: ts.sys.readDirectory }, basePath);
        check(this.parsed.errors);
        // Default codegen goes to the current directory
        // Parsed options are already converted to absolute paths
        this.ngOptions = config.angularCompilerOptions || {};
        this.ngOptions.genDir = path.join(basePath, this.ngOptions.genDir || '.');
        return { parsed: this.parsed, ngOptions: this.ngOptions };
    };
    Tsc.prototype.typeCheck = function (compilerHost, oldProgram) {
        // Create a new program since codegen files were created after making the old program
        var program = ts.createProgram(this.parsed.fileNames, this.parsed.options, compilerHost, oldProgram);
        debug("Checking global diagnostics...");
        check(program.getGlobalDiagnostics());
        var diagnostics = [];
        debug("Type checking...");
        for (var _i = 0, _a = program.getSourceFiles(); _i < _a.length; _i++) {
            var sf = _a[_i];
            diagnostics.push.apply(diagnostics, ts.getPreEmitDiagnostics(program, sf));
        }
        check(diagnostics);
    };
    Tsc.prototype.emit = function (compilerHost, oldProgram) {
        // Create a new program since the host may be different from the old program.
        var program = ts.createProgram(this.parsed.fileNames, this.parsed.options, compilerHost);
        debug("Emitting outputs...");
        var emitResult = program.emit();
        var diagnostics = [];
        diagnostics.push.apply(diagnostics, emitResult.diagnostics);
        check(compilerHost.diagnostics);
        return emitResult.emitSkipped ? 1 : 0;
    };
    return Tsc;
}());
exports.Tsc = Tsc;
exports.tsc = new Tsc();
//# sourceMappingURL=tsc.js.map