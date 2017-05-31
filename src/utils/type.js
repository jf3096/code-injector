"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 判断input是否是函数
 * @param input {*}
 * @returns {boolean}
 */
function isFunction(input) {
    return typeof input === `function`;
}
exports.isFunction = isFunction;
/**
 * 判断是否是object或者array
 * @param input {*}
 * @returns {boolean}
 */
function isObjectOrArray(input) {
    return typeof input === `object`;
}
exports.isObjectOrArray = isObjectOrArray;
/**
 * 判断是否是symbol
 * @param input {*}
 * @returns {boolean}
 */
function isSymbol(input) {
    return typeof input === `symbol`;
}
exports.isSymbol = isSymbol;
/**
 * 判断是否是undefined
 * @param input {*}
 * @returns {boolean}
 */
function isUndefined(input) {
    return typeof input === `undefined`;
}
exports.isUndefined = isUndefined;
/**
 * 判断是否是null
 * @param input {*}
 * @returns {boolean}
 */
function isNull(input) {
    return input === null;
}
exports.isNull = isNull;
/**
 * 判断是否是引用类型
 * @param input
 * @returns {boolean}
 */
function isReferenceType(input) {
    return isObjectOrArray(input) || isFunction(input) || isSymbol(input);
}
exports.isReferenceType = isReferenceType;
//# sourceMappingURL=type.js.map