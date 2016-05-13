"use strict";
var closure = require('google-closure-compiler');
var fs = require('fs');
var minimist = require('minimist');
var path = require('path');
var ts = require('typescript');
var tsickle = require('./tsickle');
/**
 * File name for the generated Closure externs.
 * This is never written to disk, but should be unique with respect to
 * the js files that may actually exist.
 */
var externsFileName = 'tsickle_externs.js';
function usage() {
    console.error("usage: tsickle [tsickle args] -- [tsc args]\n\nexample:\n  tsickle --output bundle.js -- -p src --noImplicitAny\n\ntsickle flags are:\n  --saveTemporaries  save intermediate .js files to disk\n  --output=PATH      write final Closure bundle to PATH\n");
}
/**
 * Parses the command-line arguments, extracting the tsickle settings and
 * the arguments to pass on to tsc.
 */
function loadSettingsFromArgs(args) {
    var settings = {
        saveTemporaries: null,
        outputPath: null
    };
    var parsedArgs = minimist(args);
    for (var _i = 0, _a = Object.keys(parsedArgs); _i < _a.length; _i++) {
        var flag = _a[_i];
        switch (flag) {
            case 'h':
            case 'help':
                usage();
                process.exit(0);
                break;
            case 'saveTemporaries':
                settings.saveTemporaries = true;
                break;
            case 'output':
                settings.outputPath = parsedArgs[flag];
                break;
            case '_':
                // This is part of the minimist API, and holds args after the '--'.
                break;
            default:
                console.error("unknown flag '--" + flag + "'");
                usage();
                process.exit(1);
        }
    }
    if (!settings.outputPath) {
        console.error('must specify --output path');
        usage();
        process.exit(1);
    }
    // Arguments after the '--' arg are arguments to tsc.
    var tscArgs = parsedArgs['_'];
    return { settings: settings, tscArgs: tscArgs };
}
/**
 * Loads the tsconfig.json from a directory.
 * Unfortunately there's a ton of logic in tsc.ts related to searching
 * for tsconfig.json etc. that we don't really want to replicate, e.g.
 * tsc appears to allow -p path/to/tsconfig.json while this only works
 * with -p path/to/containing/dir.
 *
 * @param args tsc command-line arguments.
 */
function loadTscConfig(args) {
    // Gather tsc options/input files from command line.
    var _a = ts.parseCommandLine(args), options = _a.options, fileNames = _a.fileNames, errors = _a.errors;
    if (errors.length > 0) {
        return { errors: errors };
    }
    // Read further settings from tsconfig.json.
    var projectDir = options.project || '.';
    var configFileName = path.join(projectDir, 'tsconfig.json');
    var _b = ts.readConfigFile(configFileName, function (path) { return fs.readFileSync(path, 'utf-8'); }), json = _b.config, error = _b.error;
    if (error) {
        return { errors: [error] };
    }
    (_c = ts.parseJsonConfigFileContent(json, ts.sys, projectDir, options, configFileName), options = _c.options, fileNames = _c.fileNames, errors = _c.errors, _c);
    if (errors.length > 0) {
        return { errors: errors };
    }
    return { options: options, fileNames: fileNames };
    var _c;
}
/**
 * Constructs a new ts.CompilerHost that overlays sources in substituteSource
 * over another ts.CompilerHost.
 *
 * @param substituteSource A map of source file name -> overlay source text.
 */
function createSourceReplacingCompilerHost(substituteSource, delegate) {
    return {
        getSourceFile: getSourceFile,
        getCancellationToken: delegate.getCancellationToken,
        getDefaultLibFileName: delegate.getDefaultLibFileName,
        writeFile: delegate.writeFile,
        getCurrentDirectory: delegate.getCurrentDirectory,
        getCanonicalFileName: delegate.getCanonicalFileName,
        useCaseSensitiveFileNames: delegate.useCaseSensitiveFileNames,
        getNewLine: delegate.getNewLine,
        fileExists: delegate.fileExists,
        readFile: delegate.readFile,
        directoryExists: delegate.directoryExists
    };
    function getSourceFile(fileName, languageVersion, onError) {
        var sourceText;
        if (substituteSource.hasOwnProperty(fileName)) {
            sourceText = substituteSource[fileName];
            return ts.createSourceFile(fileName, sourceText, languageVersion);
        }
        return delegate.getSourceFile(fileName, languageVersion, onError);
    }
}
/**
 * Compiles TypeScript code into Closure-compiler-ready JS.
 * Doesn't write any files to disk; all JS content is returned in a map.
 */
function toClosureJS(options, fileNames) {
    // Parse and load the program without tsickle processing.
    // This is so:
    // - error messages point at the original source text
    // - tsickle can use the result of typechecking for annotation
    var program = ts.createProgram(fileNames, options);
    var errors = ts.getPreEmitDiagnostics(program);
    if (errors.length > 0) {
        return { errors: errors };
    }
    // TODO(evanm): let the user configure tsickle options via the command line.
    // Or, better, just make tsickle always work without needing any options.
    var tsickleOptions = {
        untyped: true
    };
    // Process each input file with tsickle and save the output.
    var tsickleOutput = {};
    var tsickleExterns = '';
    for (var _i = 0, fileNames_1 = fileNames; _i < fileNames_1.length; _i++) {
        var fileName = fileNames_1[_i];
        var _a = tsickle.annotate(program, program.getSourceFile(fileName), tsickleOptions), output = _a.output, externs = _a.externs, diagnostics_1 = _a.diagnostics;
        if (diagnostics_1.length > 0) {
            return { errors: diagnostics_1 };
        }
        tsickleOutput[fileName] = output;
        if (externs) {
            tsickleExterns += externs;
        }
    }
    // Reparse and reload the program, inserting the tsickle output in
    // place of the original source.
    var host = createSourceReplacingCompilerHost(tsickleOutput, ts.createCompilerHost(options));
    program = ts.createProgram(fileNames, options, host);
    errors = ts.getPreEmitDiagnostics(program);
    if (errors.length > 0) {
        return { errors: errors };
    }
    // Emit, creating a map of fileName => generated JS source.
    var jsFiles = (_b = {},
        _b[externsFileName] = tsickleExterns,
        _b
    );
    function writeFile(fileName, data) { jsFiles[fileName] = data; }
    var diagnostics = program.emit(undefined, writeFile).diagnostics;
    if (diagnostics.length > 0) {
        return { errors: diagnostics };
    }
    // Postprocess generated JS.
    function pathToModuleName(context, fileName) {
        // TODO(evanm): something more sophisticated here?
        return fileName.replace('/', '.');
    }
    for (var _c = 0, _d = Object.keys(jsFiles); _c < _d.length; _c++) {
        var fileName = _d[_c];
        var output = tsickle.convertCommonJsToGoogModule(fileName, jsFiles[fileName], pathToModuleName).output;
        jsFiles[fileName] = output;
    }
    return { jsFiles: jsFiles };
    var _b;
}
function closureCompile(jsFiles, outFile, callback) {
    var closureOptions = {
        // Read input files from stdin as JSON.
        'json_streams': 'IN',
        // Write output file to disk.
        'js_output_file': outFile,
        'warning_level': 'VERBOSE',
        'language_in': 'ECMASCRIPT6_STRICT',
        'compilation_level': 'ADVANCED_OPTIMIZATIONS'
    };
    var compiler = new closure.compiler(closureOptions);
    var process = compiler.run(function (exitCode, stdout, stderr) { callback(exitCode, stderr); });
    var jsonInput = [];
    for (var _i = 0, _a = Object.keys(jsFiles); _i < _a.length; _i++) {
        var fileName = _a[_i];
        jsonInput.push({
            path: fileName,
            src: jsFiles[fileName]
        });
    }
    process.stdin.end(JSON.stringify(jsonInput));
}
function main(args) {
    var _a = loadSettingsFromArgs(args), settings = _a.settings, tscArgs = _a.tscArgs;
    var _b = loadTscConfig(tscArgs), options = _b.options, fileNames = _b.fileNames, errors = _b.errors;
    if (errors && errors.length > 0) {
        console.error(tsickle.formatDiagnostics(errors));
        process.exit(1);
    }
    // Run tsickle+TSC to convert inputs to Closure JS files.
    var jsFiles;
    (_c = toClosureJS(options, fileNames), jsFiles = _c.jsFiles, errors = _c.errors, _c);
    if (errors && errors.length > 0) {
        console.error(tsickle.formatDiagnostics(errors));
        process.exit(1);
    }
    if (Object.keys(jsFiles).length === 0) {
        console.error('no js files');
        process.exit(1);
    }
    if (settings.saveTemporaries) {
        for (var _i = 0, _d = Object.keys(jsFiles); _i < _d.length; _i++) {
            var fileName = _d[_i];
            fs.writeFileSync(fileName, jsFiles[fileName]);
        }
    }
    // Run Closure compiiler to convert JS files to output bundle.
    closureCompile(jsFiles, settings.outputPath, function (exitCode, output) {
        if (output)
            console.error(output);
        process.exit(exitCode);
    });
    var _c;
}
// CLI entry point
if (require.main === module) {
    main(process.argv.splice(2));
}

//# sourceMappingURL=main.js.map
