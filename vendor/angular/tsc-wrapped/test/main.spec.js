"use strict";
var main_1 = require('../src/main');
var test_support_1 = require('./test_support');
var fs = require('fs');
var path = require('path');
describe('tsc-wrapped', function () {
    var basePath;
    var write;
    beforeEach(function () {
        basePath = test_support_1.makeTempDir();
        write = function (fileName, content) {
            fs.writeFileSync(path.join(basePath, fileName), content, { encoding: 'utf-8' });
        };
        write('test.ts', "\n      /** @Annotation */ let Component: Function;\n      \n      @Component({})\n      export class Comp {\n        method(x: string): void {}\n      }\n    ");
    });
    function readOut(ext) {
        return fs.readFileSync(path.join(basePath, 'built', "test." + ext), { encoding: 'utf-8' });
    }
    it('should report error if project not found', function () {
        main_1.main('not-exist', null)
            .then(function () { return fail('should report error'); })
            .catch(function (e) { return expect(e.message).toContain('ENOENT'); });
    });
    it('should pre-process sources', function (done) {
        write('tsconfig.json', "{\n      \"compilerOptions\": {\n        \"experimentalDecorators\": true,\n        \"types\": [],\n        \"outDir\": \"built\",\n        \"declaration\": true\n      },\n      \"angularCompilerOptions\": {\n        \"annotateForClosureCompiler\": true,\n        \"annotationsAs\": \"static fields\"\n      },\n      \"files\": [\"test.ts\"]\n    }");
        main_1.main(basePath, { basePath: basePath })
            .then(function () {
            var out = readOut('js');
            // No helpers since decorators were lowered
            expect(out).not.toContain('__decorate');
            // Annotated for Closure compiler
            expect(out).toContain('* @param {?} x');
            // Decorator is now an annotation
            expect(out).toMatch(/Comp.decorators = \[\s+\{ type: Component/);
            var decl = readOut('d.ts');
            expect(decl).toContain('declare class Comp');
            var metadata = readOut('metadata.json');
            expect(metadata).toContain('"Comp":{"__symbolic":"class"');
            done();
        })
            .catch(function (e) { return done.fail(e); });
    });
    it('should allow closure compiler annotations without decorator downleveling', function (done) {
        write('tsconfig.json', "{\n      \"compilerOptions\": {\n        \"experimentalDecorators\": true,\n        \"types\": [],\n        \"outDir\": \"built\",\n        \"declaration\": true\n      },\n      \"angularCompilerOptions\": {\n        \"annotateForClosureCompiler\": true\n      },\n      \"files\": [\"test.ts\"]\n    }");
        main_1.main(basePath, { basePath: basePath }).then(function () { return done(); }).catch(function (e) { return done.fail(e); });
    });
});
//# sourceMappingURL=main.spec.js.map