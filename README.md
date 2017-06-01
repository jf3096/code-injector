# Code Injector

A library used to generate code and inject them in target code block so that you could feel like make use of NodeJS in 
browser side. 

People nowadays use webpack more frequently than gulp. However, webpack, most of the time, makes use of babel to transform (compile)
code in memory or build files in production stage. These transformed codes are invisible as we cannot see or use them directly. Therefore, 
babel plugins sometimes may be misleading and that's the reason why I choose gulp rather than webpack or babel to achieve the purpose of code injection.

## Quick Start

```sh
npm install code-injector -g #use yarn if you want to

code-injector # wait a moment brefore you do this
```

#### Command
  Usage: index [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -c, --config-path  config file, default path is generator.config.js

## Config File

Before you run the <b>code-injector</b> command, you will need to prepare a config file at the root of your project and 
named it <b>generator.config.js</b>.

A few rules you need to code and understand in this file:

```javascript
/**
* a useful function that could be used to generator any code you want
* @type {[*]}
*/
export function generatorStart() {
    return `console.time();`;
}
/**
* a useful function that could be used to generator any code you want
* @type {[*]}
*/
export function generatorEnd() {
    return `console.timeEnd();`;
}
/**
* required
* the file you want to watch and compile
*/
export const watchSrc = [`./test/index.js`];
/**
* default: generator
* prefix used to indicate which function is going to be used
* e.g. generatorTest
*/
export const prefix = `generator`;
```

## Code Block

The previous part has defined <b>generatorStart</b> and <b>generatorEnd</b>. 
So `start` represents its function return value `console.time()`, 
whereas
`end` represents its function return value `console.endTime()`,
so you could define the <b>code block</b> like this,

```javascript
/* inject:start */
/* end-inject */

// WRITE YOU OWN CODE HERE

/* inject:end */
/* end-inject */
```

## Start Now
Now you can run the command: 

```sh
code-injector
```

## TODO List

- [ ] only compile the when the code block changed
- [ ] remove the package dependency of gulp-inject

## License

MIT
