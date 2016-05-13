"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require('typescript');
var rewriter_1 = require('./rewriter');
// ClassRewriter rewrites a single "class Foo {...}" declaration.
// It's its own object because we collect decorators on the class and the ctor
// separately for each class we encounter.
var ClassRewriter = (function (_super) {
    __extends(ClassRewriter, _super);
    function ClassRewriter() {
        _super.apply(this, arguments);
    }
    /**
     * process is the main entry point, rewriting a single class node.
     */
    ClassRewriter.prototype.process = function (node) {
        if (node.decorators) {
            this.decorators = node.decorators.slice();
        }
        var pos = node.getFullStart();
        for (var _i = 0, _a = node.getChildren(); _i < _a.length; _i++) {
            var child = _a[_i];
            switch (child.kind) {
                case ts.SyntaxKind.CloseBraceToken:
                    // Before writing the close brace, dump the metadata.
                    this.writeRange(pos, child.getStart());
                    this.emitMetadata();
                    this.writeRange(child.getStart(), child.getEnd());
                    break;
                default:
                    this.writeRange(pos, child.getFullStart());
                    this.visit(child);
            }
            pos = child.getEnd();
        }
        return this.getOutput();
    };
    /**
     * gatherConstructor grabs the parameter list and decorators off the class
     * constructor, and emits nothing.
     */
    ClassRewriter.prototype.gatherConstructor = function (ctor) {
        var ctorParameters = [];
        var hasDecoratedParam = false;
        for (var _i = 0, _a = ctor.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var paramCtor = void 0;
            var decorators = void 0;
            if (param.decorators) {
                decorators = param.decorators.slice();
                hasDecoratedParam = true;
            }
            if (param.type) {
                switch (param.type.kind) {
                    case ts.SyntaxKind.TypeReference:
                        var typeRef = param.type;
                        // Type reference can be a bare name or a qualified name (foo.bar),
                        // possibly followed by type arguments (<X, Y>).
                        // We are making the assumption that a type reference is the same
                        // name as a ctor for that type, and it's simplest to just use the
                        // source text. We use `typeName` to avoid emitting type parameters.
                        paramCtor = typeRef.typeName.getText();
                        break;
                    default:
                }
            }
            if (paramCtor || decorators) {
                ctorParameters.push([paramCtor, decorators]);
            }
            else {
                ctorParameters.push(null);
            }
        }
        // Use the ctor parameter metadata only if the class or the ctor was decorated.
        if (this.decorators || hasDecoratedParam) {
            this.ctorParameters = ctorParameters;
        }
    };
    /**
     * gatherMethod grabs the decorators off a class method and emits nothing.
     */
    ClassRewriter.prototype.gatherMethodOrProperty = function (method) {
        if (!method.decorators)
            return;
        if (method.name.kind !== ts.SyntaxKind.Identifier) {
            // Method has a weird name, e.g.
            //   [Symbol.foo]() {...}
            this.error(method, "cannot process decorators on " + ts.SyntaxKind[method.name.kind]);
            return;
        }
        var name = method.name.text;
        var decorators = method.decorators.slice();
        if (!this.propDecorators)
            this.propDecorators = {};
        this.propDecorators[name] = decorators;
    };
    /**
     * maybeProcess is called by the traversal of the AST.
     * @return True if the node was handled, false to have the node emitted as normal.
     */
    ClassRewriter.prototype.maybeProcess = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                // Encountered a new class while processing this class; use a new separate
                // rewriter to gather+emit its metadata.
                var _a = new ClassRewriter(this.file).process(node), output = _a.output, diagnostics = _a.diagnostics;
                (_b = this.diagnostics).push.apply(_b, diagnostics);
                this.emit(output);
                return true;
            case ts.SyntaxKind.Constructor:
                this.gatherConstructor(node);
                return false; // Proceed with ordinary emit of the ctor.
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
                this.gatherMethodOrProperty(node);
                return false; // Proceed with ordinary emit of the method.
            case ts.SyntaxKind.Decorator:
                // Skip emit of all decorators, as they are specially handled.
                return true;
            default:
                return false;
        }
        var _b;
    };
    /**
     * emitMetadata emits the various gathered metadata, as static fields.
     */
    ClassRewriter.prototype.emitMetadata = function () {
        if (this.decorators) {
            this.emit("static decorators: DecoratorInvocation[] = [\n");
            for (var _i = 0, _a = this.decorators; _i < _a.length; _i++) {
                var annotation = _a[_i];
                this.emitDecorator(annotation);
                this.emit(',\n');
            }
            this.emit('];\n');
        }
        if (this.ctorParameters) {
            this.emit("/** @nocollapse */ static ctorParameters: {type: Function, decorators?: DecoratorInvocation[]}[] = [\n");
            for (var _b = 0, _c = this.ctorParameters; _b < _c.length; _b++) {
                var param = _c[_b];
                if (!param) {
                    this.emit('null,\n');
                    continue;
                }
                var ctor = param[0], decorators = param[1];
                this.emit("{type: " + ctor + ", ");
                if (decorators) {
                    this.emit('decorators: [');
                    for (var _d = 0, decorators_1 = decorators; _d < decorators_1.length; _d++) {
                        var decorator = decorators_1[_d];
                        this.emitDecorator(decorator);
                        this.emit(', ');
                    }
                    this.emit(']');
                }
                this.emit('},\n');
            }
            this.emit("];\n");
        }
        if (this.propDecorators) {
            this.emit('static propDecorators: {[key: string]: DecoratorInvocation[]} = {\n');
            for (var _e = 0, _f = Object.keys(this.propDecorators); _e < _f.length; _e++) {
                var name_1 = _f[_e];
                this.emit("'" + name_1 + "': [");
                for (var _g = 0, _h = this.propDecorators[name_1]; _g < _h.length; _g++) {
                    var decorator = _h[_g];
                    this.emitDecorator(decorator);
                    this.emit(',');
                }
                this.emit('],\n');
            }
            this.emit('};\n');
        }
    };
    ClassRewriter.prototype.emitDecorator = function (decorator) {
        this.emit('{ type: ');
        var expr = decorator.expression;
        switch (expr.kind) {
            case ts.SyntaxKind.Identifier:
                // The decorator was a plain @Foo.
                this.visit(expr);
                break;
            case ts.SyntaxKind.CallExpression:
                // The decorator was a call, like @Foo(bar).
                var call = expr;
                this.visit(call.expression);
                if (call.arguments.length) {
                    this.emit(', args: [');
                    for (var _i = 0, _a = call.arguments; _i < _a.length; _i++) {
                        var arg = _a[_i];
                        this.emit(arg.getText());
                        this.emit(', ');
                    }
                    this.emit(']');
                }
                break;
            default:
                this.errorUnimplementedKind(expr, 'gathering metadata');
                this.emit('undefined');
        }
        this.emit(' }');
    };
    return ClassRewriter;
}(rewriter_1.Rewriter));
var DecoratorRewriter = (function (_super) {
    __extends(DecoratorRewriter, _super);
    function DecoratorRewriter() {
        _super.apply(this, arguments);
    }
    DecoratorRewriter.prototype.process = function () {
        this.visit(this.file);
        return this.getOutput();
    };
    DecoratorRewriter.prototype.maybeProcess = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                var _a = new ClassRewriter(this.file).process(node), output = _a.output, diagnostics = _a.diagnostics;
                (_b = this.diagnostics).push.apply(_b, diagnostics);
                this.emit(output);
                return true;
            default:
                return false;
        }
        var _b;
    };
    return DecoratorRewriter;
}(rewriter_1.Rewriter));
function convertDecorators(fileName, sourceText) {
    var file = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.ES5, true);
    return new DecoratorRewriter(file).process();
}
exports.convertDecorators = convertDecorators;

//# sourceMappingURL=decorator-annotator.js.map
