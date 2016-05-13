import { StaticReflector } from './static_reflector';
export declare class StaticAndDynamicReflectionCapabilities {
    private staticDelegate;
    static install(staticDelegate: StaticReflector): void;
    private dynamicDelegate;
    constructor(staticDelegate: StaticReflector);
    isReflectionEnabled(): boolean;
    factory(type: any): Function;
    interfaces(type: any): any[];
    hasLifecycleHook(type: any, lcInterface: any, lcProperty: string): boolean;
    parameters(type: any): any[][];
    annotations(type: any): any[];
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    getter(name: string): (obj: any) => any;
    setter(name: string): (obj: any, value: any) => void;
    method(name: string): (obj: any, args: any[]) => any;
    importUri(type: any): string;
}
