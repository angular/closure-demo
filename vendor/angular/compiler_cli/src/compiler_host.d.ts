import * as ts from 'typescript';
import { AngularCompilerOptions } from './codegen';
/**
 * Implementation of CompilerHost that forwards all methods to another instance.
 * Useful for partial implementations to override only methods they care about.
 */
export declare abstract class DelegatingHost implements ts.CompilerHost {
    protected delegate: ts.CompilerHost;
    constructor(delegate: ts.CompilerHost);
    getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) => ts.SourceFile;
    getCancellationToken: () => ts.CancellationToken;
    getDefaultLibFileName: (options: ts.CompilerOptions) => string;
    getDefaultLibLocation: () => string;
    writeFile: ts.WriteFileCallback;
    getCurrentDirectory: () => string;
    getCanonicalFileName: (fileName: string) => string;
    useCaseSensitiveFileNames: () => boolean;
    getNewLine: () => string;
    fileExists: (fileName: string) => boolean;
    readFile: (fileName: string) => string;
    trace: (s: string) => void;
    directoryExists: (directoryName: string) => boolean;
}
export declare class TsickleHost extends DelegatingHost {
    private options;
    private ngOptions;
    diagnostics: ts.Diagnostic[];
    program: ts.Program;
    private TSICKLE_SUPPORT;
    constructor(delegate: ts.CompilerHost, options: ts.CompilerOptions, ngOptions: AngularCompilerOptions);
    getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) => ts.SourceFile;
    /**
     * Massages file names into valid goog.module names:
     * - resolves relative paths to the given context
     * - replace resolved module path with module name
     * - replaces '/' with '$' to have a flat name.
     * - replace first char if non-alpha
     * - replace subsequent non-alpha numeric chars
     */
    static pathToGoogModuleName(context: string, importPath: string): string;
    writeFile: ts.WriteFileCallback;
}
export declare class MetadataWriterHost extends DelegatingHost {
    private reflectorHost;
    constructor(delegate: ts.CompilerHost, program: ts.Program, options: ts.CompilerOptions, ngOptions: AngularCompilerOptions);
    writeFile: ts.WriteFileCallback;
}
