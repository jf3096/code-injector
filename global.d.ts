/**
 * 让TS兼容package.json
 */
declare module '*/package.json' {
    const version: string;
    export = {version};
}
