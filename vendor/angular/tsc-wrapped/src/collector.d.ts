/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { ModuleMetadata } from './schema';
/**
 * Collect decorator metadata from a TypeScript module.
 */
export declare class MetadataCollector {
    constructor();
    /**
     * Returns a JSON.stringify friendly form describing the decorators of the exported classes from
     * the source file that is expected to correspond to a module.
     */
    getMetadata(sourceFile: ts.SourceFile, strict?: boolean): ModuleMetadata;
}
