"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Dropdown = function (_a) {
    var _b = _a.list, list = _b === void 0 ? [] : _b;
    var _c = react_1.useState([]), selected = _c[0], setSelected = _c[1];
    var _d = react_1.useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var handleClick = function () { return setIsOpen(!isOpen); };
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { tabIndex: 0, onClick: function () { return setIsOpen(!isOpen); } },
            "'BBBBBB'",
            isOpen && 'aaaa'));
};
Dropdown;
