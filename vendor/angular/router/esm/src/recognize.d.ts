import { UrlTree, RouteTree } from './segments';
import { Type } from './facade/lang';
import { ComponentResolver } from '@angular/core';
export declare function recognize(componentResolver: ComponentResolver, rootComponent: Type, url: UrlTree, existingTree: RouteTree): Promise<RouteTree>;
