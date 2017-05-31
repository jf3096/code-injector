#!/usr/bin/env node

import * as program from 'commander';
import * as path from 'path';
import start from '../index';
import pkg = require('../package.json');

/**
 * 获取package.json版本
 */
const {version} = pkg;

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
function getConfigPath(configPath: string): string {
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
const configPath: string = getConfigPath(program[PROGRAM_CONFIG_PATH]);

(async () => {
    /**
     * 开始执行程序
     */
    await start(require(configPath));
})();
