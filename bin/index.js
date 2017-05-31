#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const index_1 = require("../index");
const pkg = require("../package.json");
/**
 * 获取package.json版本
 */
const { version } = pkg;
const PROGRAM_CONFIG_PATH = `config-path`;
program
    .version(version)
    .option(`-c, --${PROGRAM_CONFIG_PATH}`, '配置文件，默认为根目录下generator.config.js')
    .parse(process.argv);
/**
 * 获取配置文件路径
 * @param configPath {string} 配置文件路径（未加工）
 * @returns {string}
 */
function getConfigPath(configPath) {
    const workingDirectory = process.cwd();
    configPath = configPath || `generator.config.js`;
    /**
     * 如果是绝对路径直接使用
     * 反之拼接当前的working directory
     */
    return path.isAbsolute(configPath) ? configPath : path.resolve(workingDirectory, configPath);
}
/**
 * 获取配置文件路径
 * @type {string}
 */
const configPath = getConfigPath(program[PROGRAM_CONFIG_PATH]);
(() => __awaiter(this, void 0, void 0, function* () {
    /**
     * 开始执行程序
     */
    yield index_1.default(require(configPath));
}))();
//# sourceMappingURL=index.js.map