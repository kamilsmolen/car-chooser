"use strict";
exports.__esModule = true;
exports.fetchData = void 0;
var fetchError_1 = require("./fetchError");
exports.fetchData = function (url, retries) {
    if (retries === void 0) { retries = 5; }
    return fetch(url)
        .then(function (response) {
        var responseBody = response.json();
        if (!response.ok) {
            if (retries > 0)
                return exports.fetchData(url, retries - 1);
            else
                throw new fetchError_1.FetchError(response.status, response.statusText);
        }
        else
            return responseBody;
    })["catch"](function () {
        if (retries > 0)
            return exports.fetchData(url, retries - 1);
        //else throw new FetchError(response.status, response.statusText);
    });
};
