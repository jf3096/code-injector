"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * a useful function that could be used to generator any code you want
 * @type {[*]}
 */
function generatorStart() {
    return `console.time();`;
}
exports.generatorStart = generatorStart;
/**
 * a useful function that could be used to generator any code you want
 * @type {[*]}
 */
function generatorEnd() {
    return `console.timeEnd();`;
}
exports.generatorEnd = generatorEnd;
/**
 * required
 * the file you want to watch and compile
 */
exports.watchSrc = [`./test/index.ts`];
/**
 * default: generator
 * prefix used to indicate which function is going to be used
 * e.g. generatorTest
 */
exports.prefix = `generator`;
//# sourceMappingURL=generator.config.js.map