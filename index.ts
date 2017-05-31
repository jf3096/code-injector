import {createInjector} from './src/utils/injector';
import * as gulp from 'gulp';
import * as inject from 'gulp-inject';
import * as plumber from 'gulp-plumber';
import camelCase = require('camel-case');
import {isFunction, isNull, isReferenceType, isUndefined} from './src/utils/type';
import * as invariant from 'invariant';

interface IGeneratorResults {
    [key: string]: string;
}

interface IGeneratorFunctions {
    [key: string]: () => string;
}

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
async function executeGeneratorFunctions(generatorFunctions: IGeneratorFunctions, prefix: string): Promise<IGeneratorResults> {
    return Object.keys(generatorFunctions).reduce(async (generatorResultsPromise: Promise<IGeneratorResults>, key) => {
        const generatorResults = await generatorResultsPromise;
        /**
         * 判断所有的export变量是否以特定前缀开头, 如: generator,
         * 判断该变量是否是function
         */
        if (key.startsWith(prefix) && isFunction(generatorFunctions[key])) {
            /**
             * 统一转换成camel case
             * @type {string}
             */
            const name = camelCase(key.slice(prefix.length));
            let generatorResult = await generatorFunctions[key]();
            invariant(!isUndefined(generatorResult), `generator result的返回值不能为undefined`);
            if (!isNull(generatorResult)) {
                invariant(!isReferenceType(generatorResult), `generator result的返回值不能为引用类型`);
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
    }, Promise.resolve({}));
}

/**
 * 程序入口点
 * @returns {Promise<void>}
 */
export default async function start(generatorConfig): Promise<void> {
    const {
        prefix = `generator`,
        watchSrc,
        ...generatorFunctions
    } = generatorConfig;

    const generatorResult: IGeneratorResults = await executeGeneratorFunctions(
        generatorFunctions as IGeneratorFunctions,
        prefix
    );
    gulp.task(TASK_NAME, (callback: () => void) => {
        /**
         * 由于时间关系直接使用了gulp-inject, 所以需要默认是需要一个数据源
         * 当前数据源直接使用当前文件即可
         * read:false只读模式, 提高加载速度
         */
        const sources = gulp.src(`./index.js`, {read: false});
        /**
         * 指定修改的数据
         * @type {NodeJS.WritableStream}
         */
        const target = gulp.src(watchSrc, {base: `./`}).pipe(plumber());
        /**
         * 为所有的generatorResult包裹成Injector并pipe如gulp流中
         * @type {NodeJS.WritableStream}
         */
        const injectedTarget =
            Object.keys(generatorResult)
                .map((key) => createInjector(key, () => generatorResult[key]))
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
}
