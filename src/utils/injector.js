"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function createInjector(name, transform) {
    //noinspection SpellCheckingInspection
    return {
        endtag: constants_1.END_TAG,
        name,
        starttag: constants_1.START_TAG,
        transform
    };
}
exports.createInjector = createInjector;
//# sourceMappingURL=injector.js.map