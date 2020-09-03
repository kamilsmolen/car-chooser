"use strict";
exports.__esModule = true;
exports.Dropdown = void 0;
var react_1 = require("react");
exports.Dropdown = function (props) {
    var myRef = react_1.useRef(null);
    var _a = react_1.useState(null), selected = _a[0], setSelected = _a[1];
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var handleApply = function () {
        if (!isOpen && null !== selected) {
            props.onSelect(selected);
        }
    };
    react_1.useEffect(handleApply, [isOpen]);
    var handleClickInside = function () { return setIsOpen(!isOpen); };
    var handleClickOutside = function (e) {
        if (null !== myRef && null !== myRef.current) {
            if (!myRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
    };
    var toggleItem = function (value) {
        setSelected(value);
        setIsOpen(false);
    };
    react_1.useEffect(function () {
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    });
    var getTitle = function () {
        var label = props.title ? props.title : "item";
        return null === selected ? "Select " + label : selected;
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { ref: myRef },
            react_1["default"].createElement("div", { onClick: handleClickInside }, getTitle()),
            isOpen && (react_1["default"].createElement("ul", null, props.list.map(function (item, key) { return (react_1["default"].createElement("li", { key: key, onClick: function () { return toggleItem(item); } }, item)); }))))));
};
