/**
 * Transform template html and css into executable code.
 * Intended to be used in a build step.
 */
import * as ts from 'typescript';
import * as compiler from '@angular/compiler';
import { StaticReflector } from './static_reflector';
import { CompileMetadataResolver } from './compiler_private';
import { NodeReflectorHost } from './reflector_host';
export interface AngularCompilerOptions {
    genDir: string;
    basePath: string;
    skipTemplateCodegen: boolean;
    skipMetadataEmit: boolean;
    legacyPackageLayout: boolean;
    trace: boolean;
    googleClosureOutput: boolean;
}
export declare class CodeGenerator {
    private options;
    private ngOptions;
    private program;
    host: ts.CompilerHost;
    private staticReflector;
    private resolver;
    private compiler;
    private reflectorHost;
    constructor(options: ts.CompilerOptions, ngOptions: AngularCompilerOptions, program: ts.Program, host: ts.CompilerHost, staticReflector: StaticReflector, resolver: CompileMetadataResolver, compiler: compiler.OfflineCompiler, reflectorHost: NodeReflectorHost);
    private generateSource(metadatas);
    private readComponents(absSourcePath);
    private calculateEmitPath(filePath);
    private generateStylesheet(filepath, shim);
    codegen(): Promise<any>;
    static create(ngOptions: AngularCompilerOptions, program: ts.Program, options: ts.CompilerOptions, compilerHost: ts.CompilerHost): CodeGenerator;
}
