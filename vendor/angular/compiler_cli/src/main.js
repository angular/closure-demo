#!/usr/bin/env node
"use strict";
require('reflect-metadata');
var fs = require('fs');
var path = require('path');
var ts = require('typescript');
var tsc_1 = require('./tsc');
var compiler_host_1 = require('./compiler_host');
var DEBUG = false;
function debug(msg) {
    var o = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        o[_i - 1] = arguments[_i];
    }
    if (DEBUG)
        console.log.apply(console, [msg].concat(o));
}
function main(project, basePath) {
    try {
        var projectDir = project;
        if (fs.lstatSync(project).isFile()) {
            projectDir = path.dirname(project);
        }
        // file names in tsconfig are resolved relative to this absolute path
        basePath = path.join(process.cwd(), basePath || projectDir);
        // read the configuration options from wherever you store them
        var _a = tsc_1.tsc.readConfiguration(project, basePath), parsed_1 = _a.parsed, ngOptions_1 = _a.ngOptions;
        ngOptions_1.basePath = basePath;
        var host_1 = ts.createCompilerHost(parsed_1.options, true);
        var codegenStep = void 0;
        var program_1 = ts.createProgram(parsed_1.fileNames, parsed_1.options, host_1);
        var errors = program_1.getOptionsDiagnostics();
        tsc_1.check(errors);
        var doCodegen = ngOptions_1.skipTemplateCodegen ?
            Promise.resolve(null) :
            null;
        return doCodegen.then(function () {
            tsc_1.tsc.typeCheck(host_1, program_1);
            // Emit *.js with Decorators lowered to Annotations, and also *.js.map
            var tsicklePreProcessor = new compiler_host_1.TsickleHost(host_1, parsed_1.options, ngOptions_1);
            tsicklePreProcessor.program = program_1;
            tsc_1.tsc.emit(tsicklePreProcessor, program_1);
            if (!ngOptions_1.skipMetadataEmit) {
                // Emit *.metadata.json and *.d.ts
                // Not in the same emit pass with above, because tsickle erases
                // decorators which we want to read or document.
                // Do this emit second since TypeScript will create missing directories for us
                // in the standard emit.
                var metadataWriter = new compiler_host_1.MetadataWriterHost(host_1, program_1, parsed_1.options, ngOptions_1);
                tsc_1.tsc.emit(metadataWriter, program_1);
            }
        });
    }
    catch (e) {
        return Promise.reject(e);
    }
}
exports.main = main;
// CLI entry point
if (require.main === module) {
    var args = require('minimist')(process.argv.slice(2));
    main(args.p || args.project || '.', args.basePath)
        .then(function (exitCode) { return process.exit(exitCode); })
        .catch(function (e) {
        console.error(e.stack);
        console.error("Compilation failed");
        process.exit(1);
    });
}
//# sourceMappingURL=main.js.map