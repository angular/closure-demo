"use strict";
var ts = require('typescript');
/**
 * A Rewriter manages iterating through a ts.SourceFile, copying input
 * to output while letting the subclass potentially alter some nodes
 * along the way by implementing maybeProcess().
 */
var Rewriter = (function () {
    function Rewriter(file) {
        this.file = file;
        this.output = [];
        /** Errors found while examining the code. */
        this.diagnostics = [];
        /**
         * The current level of recursion through TypeScript Nodes.  Used in formatting internal debug
         * print statements.
         */
        this.indent = 0;
    }
    Rewriter.prototype.getOutput = function () {
        if (this.indent !== 0) {
            throw new Error('visit() failed to track nesting');
        }
        return { output: this.output.join(''), diagnostics: this.diagnostics };
    };
    /**
     * visit traverses a Node, recursively writing all nodes not handled by this.maybeProcess.
     */
    Rewriter.prototype.visit = function (node) {
        // this.logWithIndent('node: ' + ts.SyntaxKind[node.kind]);
        this.indent++;
        if (!this.maybeProcess(node))
            this.writeNode(node);
        this.indent--;
    };
    /** writeNode writes a ts.Node, calling this.visit() on its children. */
    Rewriter.prototype.writeNode = function (node, skipComments) {
        if (skipComments === void 0) { skipComments = false; }
        if (node.getChildCount() === 0) {
            // Directly write complete tokens.
            if (skipComments) {
                // To skip comments, we skip all whitespace/comments preceding
                // the node.  But if there was anything skipped we should emit
                // a newline in its place so that the node remains separated
                // from the previous node.  TODO: don't skip anything here if
                // there wasn't any comment.
                if (node.getFullStart() < node.getStart()) {
                    this.emit('\n');
                }
                this.emit(node.getText());
            }
            else {
                this.emit(node.getFullText());
            }
            return;
        }
        if (skipComments) {
            throw new Error('skipComments unimplemented for complex Nodes');
        }
        var lastEnd = node.getFullStart();
        for (var _i = 0, _a = node.getChildren(); _i < _a.length; _i++) {
            var child = _a[_i];
            this.writeRange(lastEnd, child.getFullStart());
            this.visit(child);
            lastEnd = child.getEnd();
        }
        // Write any trailing text.
        this.writeRange(lastEnd, node.getEnd());
    };
    // Write a span of the input file as expressed by absolute offsets.
    // These offsets are found in attributes like node.getFullStart() and
    // node.getEnd().
    Rewriter.prototype.writeRange = function (from, to) {
        // getSourceFile().getText() is wrong here because it has the text of
        // the SourceFile node of the AST, which doesn't contain the comments
        // preceding that node.  Semantically these ranges are just offsets
        // into the original source file text, so slice from that.
        var text = this.file.text.slice(from, to);
        if (text)
            this.emit(text);
    };
    Rewriter.prototype.emit = function (str) { this.output.push(str); };
    /* tslint:disable: no-unused-variable */
    Rewriter.prototype.logWithIndent = function (message) {
        /* tslint:enable: no-unused-variable */
        var prefix = new Array(this.indent + 1).join('| ');
        console.log(prefix + message);
    };
    /**
     * Produces a compiler error that references the Node's kind.  This is useful for the "else"
     * branch of code that is attempting to handle all possible input Node types, to ensure all cases
     * covered.
     */
    Rewriter.prototype.errorUnimplementedKind = function (node, where) {
        this.error(node, ts.SyntaxKind[node.kind] + " not implemented in " + where);
    };
    Rewriter.prototype.error = function (node, messageText, start, length) {
        start = start || node.getStart();
        length = length || (node.getEnd() - start);
        this.diagnostics.push({
            file: this.file,
            start: start,
            length: length,
            messageText: messageText,
            category: ts.DiagnosticCategory.Error,
            code: undefined
        });
    };
    return Rewriter;
}());
exports.Rewriter = Rewriter;

//# sourceMappingURL=rewriter.js.map
