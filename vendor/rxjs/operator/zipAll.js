import { ZipOperator } from './zip';
/**
 * @owner Observable
 * @this {?}
 * @param {?=} project
 * @return {?}
 */
export function zipAll(project) {
    return this.lift(new ZipOperator(project));
}
