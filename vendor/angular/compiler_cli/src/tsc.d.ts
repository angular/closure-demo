import * as ts from 'typescript';
import { AngularCompilerOptions } from './codegen';
import { TsickleHost } from './compiler_host';
/**
 * Our interface to the TypeScript standard compiler.
 * If you write an Angular compiler plugin for another build tool,
 * you should implement a similar interface.
 */
export interface CompilerInterface {
    readConfiguration(project: string, basePath: string): {
        parsed: ts.ParsedCommandLine;
        ngOptions: AngularCompilerOptions;
    };
    typeCheck(compilerHost: ts.CompilerHost, program: ts.Program): void;
    emit(compilerHost: ts.CompilerHost, program: ts.Program): number;
}
export declare function formatDiagnostics(diags: ts.Diagnostic[]): string;
export declare function check(diags: ts.Diagnostic[]): void;
export declare class Tsc implements CompilerInterface {
    ngOptions: AngularCompilerOptions;
    parsed: ts.ParsedCommandLine;
    private basePath;
    readConfiguration(project: string, basePath: string): {
        parsed: ts.ParsedCommandLine;
        ngOptions: AngularCompilerOptions;
    };
    typeCheck(compilerHost: ts.CompilerHost, oldProgram: ts.Program): void;
    emit(compilerHost: TsickleHost, oldProgram: ts.Program): number;
}
export declare var tsc: CompilerInterface;
