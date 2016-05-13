import { ComponentResolver } from './component_resolver';
import { Type } from '../../src/facade/lang';
import { ComponentFactory } from './component_factory';
/**
 * Component resolver that can load components lazily
 */
export declare class SystemJsComponentResolver implements ComponentResolver {
    private _resolver;
    constructor(_resolver: ComponentResolver);
    resolveComponent(componentType: string | Type): Promise<ComponentFactory<any>>;
    clearCache(): void;
}
