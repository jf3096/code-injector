"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const injector_1 = require("./src/utils/injector");
const gulp = require("gulp");
const inject = require("gulp-inject");
const plumber = require("gulp-plumber");
const camelCase = require("camel-case");
const type_1 = require("./src/utils/type");
const invariant = require("invariant");
/**
 * 统一task名
 * @type {string}
 */
const TASK_NAME = `inject`;
//noinspection TsLint
/**
 * 执行所有generator function, 并将结果返回
 * @param generatorFunctions {function} 生成代码的函数
 * @param prefix {string} 标识在该前缀下才做相关处理
 * @returns {Promise<IGeneratorResults>}
 */
function executeGeneratorFunctions(generatorFunctions, prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.keys(generatorFunctions).reduce((generatorResultsPromise, key) => __awaiter(this, void 0, void 0, function* () {
            const generatorResults = yield generatorResultsPromise;
            /**
             * 判断所有的export变量是否以特定前缀开头, 如: generator,
             * 判断该变量是否是function
             */
            if (key.startsWith(prefix) && type_1.isFunction(generatorFunctions[key])) {
                /**
                 * 统一转换成camel case
                 * @type {string}
                 */
                const name = camelCase(key.slice(prefix.length));
                let generatorResult = yield generatorFunctions[key]();
                invariant(!type_1.isUndefined(generatorResult), `generator result的返回值不能为undefined`);
                if (!type_1.isNull(generatorResult)) {
                    invariant(!type_1.isReferenceType(generatorResult), `generator result的返回值不能为引用类型`);
                    /**
                     * 统一转换成string类型
                     * @type {String}
                     */
                    generatorResult = String(generatorResult);
                }
                /**
                 * 将结果赋值回结果变量中
                 * 结果的数据类型只能是string或者null
                 */
                generatorResults[name] = generatorResult;
            }
            return generatorResults;
        }), Promise.resolve({}));
    });
}
/**
 * 程序入口点
 * @returns {Promise<void>}
 */
function start(generatorConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const { prefix = `generator`, watchSrc } = generatorConfig, generatorFunctions = __rest(generatorConfig, ["prefix", "watchSrc"]);
        const generatorResult = yield executeGeneratorFunctions(generatorFunctions, prefix);
        gulp.task(TASK_NAME, (callback) => {
            /**
             * 由于时间关系直接使用了gulp-inject, 所以需要默认是需要一个数据源
             * 当前数据源直接使用当前文件即可
             * read:false只读模式, 提高加载速度
             */
            const sources = gulp.src(`./index.js`, { read: false });
            /**
             * 指定修改的数据
             * @type {NodeJS.WritableStream}
             */
            const target = gulp.src(watchSrc, { base: `./` }).pipe(plumber());
            /**
             * 为所有的generatorResult包裹成Injector并pipe如gulp流中
             * @type {NodeJS.WritableStream}
             */
            const injectedTarget = Object.keys(generatorResult)
                .map((key) => injector_1.createInjector(key, () => generatorResult[key]))
                .reduce((target, injector) => {
                return target.pipe(inject(sources, injector));
            }, target);
            /**
             * 写入同一文件并回调结束
             */
            injectedTarget.pipe(gulp.dest('.')).on('end', callback);
        });
        /**
         * 执行一次gulp task
         */
        gulp.start(TASK_NAME);
    });
}
exports.default = start;
//# sourceMappingURL=index.js.map