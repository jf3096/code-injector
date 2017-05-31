/**
 * 判断input是否是函数
 * @param input {*}
 * @returns {boolean}
 */
export function isFunction(input: any): boolean {
    return typeof input === `function`;
}

/**
 * 判断是否是object或者array
 * @param input {*}
 * @returns {boolean}
 */
export function isObjectOrArray(input: any): boolean {
    return typeof input === `object`;
}

/**
 * 判断是否是symbol
 * @param input {*}
 * @returns {boolean}
 */
export function isSymbol(input: any): boolean {
    return typeof input === `symbol`;
}

/**
 * 判断是否是undefined
 * @param input {*}
 * @returns {boolean}
 */
export function isUndefined(input: any): boolean {
    return typeof input === `undefined`;
}

/**
 * 判断是否是null
 * @param input {*}
 * @returns {boolean}
 */
export function isNull(input: any): boolean {
    return input === null;
}

/**
 * 判断是否是引用类型
 * @param input
 * @returns {boolean}
 */
export function isReferenceType(input: any): boolean {
    return isObjectOrArray(input) || isFunction(input) || isSymbol(input);
}
