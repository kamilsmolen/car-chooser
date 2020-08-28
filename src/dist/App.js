"use strict";
exports.__esModule = true;
var react_1 = require("react");
var logo_svg_1 = require("./logo.svg");
require("./App.css");
var fetchData_1 = require("./utils/dist/fetchData");
function App() {
    if (fetchData_1.fetchData) {
        fetchData_1.fetchData('http://localhost:8080/api/makes').then(function (response) { console.log(response); });
        fetchData_1.fetchData('http://localhost:8080/api/models?make=Ford').then(function (response) { console.log(response); });
        fetchData_1.fetchData('http://localhost:8080/api/vehicles?make=Ford&model=Fiesta').then(function (response) { console.log(response); });
    }
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement("header", { className: "App-header" },
            react_1["default"].createElement("img", { src: logo_svg_1["default"], className: "App-logo", alt: "logo" }),
            react_1["default"].createElement("p", null,
                "Edit ",
                react_1["default"].createElement("code", null, "src/App.tsx"),
                " and save to reload."),
            react_1["default"].createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"))));
}
exports["default"] = App;
