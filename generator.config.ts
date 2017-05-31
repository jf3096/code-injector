/**
 * a useful function that could be used to generator any code you want
 * @type {[*]}
 */
export function generatorStart(): string {
    return `console.time();`;
}
/**
 * a useful function that could be used to generator any code you want
 * @type {[*]}
 */
export function generatorEnd(): string {
    return `console.timeEnd();`;
}
/**
 * required
 * the file you want to watch and compile
 */
export const watchSrc = [`./test/index.ts`];
/**
 * default: generator
 * prefix used to indicate which function is going to be used
 * e.g. generatorTest
 */
export const prefix = `generator`;
