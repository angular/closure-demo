import { ReflectorReader } from './core_private';
/**
 * The host of the static resolver is expected to be able to provide module metadata in the form of
 * ModuleMetadata. Angular 2 CLI will produce this metadata for a module whenever a .d.ts files is
 * produced and the module has exported variables or classes with decorators. Module metadata can
 * also be produced directly from TypeScript sources by using MetadataCollector in tools/metadata.
 */
export interface StaticReflectorHost {
    /**
     * Return a ModuleMetadata for the given module.
     *
     * @param modulePath is a string identifier for a module as an absolute path.
     * @returns the metadata for the given module.
     */
    getMetadataFor(modulePath: string): {
        [key: string]: any;
    };
    /**
     * Resolve a symbol from an import statement form, to the file where it is declared.
     * @param module the location imported from
     * @param containingFile for relative imports, the path of the file containing the import
     */
    findDeclaration(modulePath: string, symbolName: string, containingFile?: string): StaticSymbol;
    getStaticSymbol(declarationFile: string, name: string): StaticSymbol;
    angularImportLocations(): {
        coreDecorators: string;
        diDecorators: string;
        diMetadata: string;
        provider: string;
    };
}
/**
 * A token representing the a reference to a static type.
 *
 * This token is unique for a filePath and name and can be used as a hash table key.
 */
export declare class StaticSymbol {
    filePath: string;
    name: string;
    constructor(filePath: string, name: string);
}
/**
 * A static reflector implements enough of the Reflector API that is necessary to compile
 * templates statically.
 */
export declare class StaticReflector implements ReflectorReader {
    private host;
    private annotationCache;
    private propertyCache;
    private parameterCache;
    private metadataCache;
    private conversionMap;
    constructor(host: StaticReflectorHost);
    importUri(typeOrFunc: StaticSymbol): string;
    annotations(type: StaticSymbol): any[];
    propMetadata(type: StaticSymbol): {
        [key: string]: any;
    };
    parameters(type: StaticSymbol): any[];
    hasLifecycleHook(type: any, lcInterface: any, lcProperty: string): boolean;
    private registerDecoratorOrConstructor(type, ctor);
    private initializeConversionMap();
    /** @internal */
    simplify(context: StaticSymbol, value: any): any;
    /**
     * @param module an absolute path to a module file.
     */
    getModuleMetadata(module: string): {
        [key: string]: any;
    };
    private getTypeMetadata(type);
}
