"use strict";
exports.__esModule = true;
exports.fetchData = void 0;
var fetchError_1 = require("./fetchError");
var processResponse = function (response) {
    var responseBody = response.json();
    if (!response.ok) {
        throw new fetchError_1.FetchError(response.status, response.statusText);
    }
    return responseBody;
};
exports.fetchData = function (url) { return fetch(url).then(processResponse); };
