"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var fetchData_1 = require("./utils/dist/fetchData");
var DropdownComponent_1 = require("./components/Dropdown/DropdownComponent");
function App() {
    var _a = react_1.useState([]), makes = _a[0], setMakes = _a[1];
    var _b = react_1.useState([]), models = _b[0], setModels = _b[1];
    var _c = react_1.useState([]), vehicles = _c[0], setVehicles = _c[1];
    var _d = react_1.useState(null), bodyType = _d[0], setBodyType = _d[1];
    var _e = react_1.useState(null), fuelType = _e[0], setFuelType = _e[1];
    var _f = react_1.useState(null), engineCapacity = _f[0], setEngineCapacity = _f[1];
    var _g = react_1.useState(null), enginePowerKW = _g[0], setEnginePowerKW = _g[1];
    var _h = react_1.useState(null), enginePowerPS = _h[0], setEnginePowerPS = _h[1];
    react_1.useEffect(function () {
        if (fetchData_1.fetchData)
            fetchData_1.fetchData("http://localhost:8080/api/makes").then(function (response) {
                return setMakes(response);
            });
    }, []);
    var makeSelected = function (selectedItem) {
        setModels([]);
        if (fetchData_1.fetchData)
            fetchData_1.fetchData("http://localhost:8080/api/models?make=" + selectedItem).then(function (response) {
                setModels(response.map(function (modelItem) { return ({
                    make: selectedItem,
                    value: modelItem
                }); }));
            });
    };
    var modelSelected = function (selectedItem) {
        setVehicles([]);
        var index = selectedItem.indexOf(" ");
        var model = [selectedItem.slice(0, index), selectedItem.slice(index + 1)];
        if (fetchData_1.fetchData) {
            fetchData_1.fetchData("http://localhost:8080/api/vehicles?make=" + model[0] + "&model=" + model[1]).then(function (response) {
                console.log(response);
                setVehicles(response.map(function (vehicleItem) { return ({
                    make: model[0],
                    model: model[1],
                    value: vehicleItem
                }); }));
            });
        }
    };
    var bodyTypeSelected = function (selectedItem) { return setBodyType(selectedItem); };
    var fuelTypeSelected = function (selectedItem) { return setFuelType(selectedItem); };
    var engineCapacitySelected = function (selectedItem) {
        return setEngineCapacity(selectedItem);
    };
    var enginePowerSelected = function (selectedItem) {
        var values = selectedItem.split(" ");
        console.log(values[values.indexOf("PS") - 1], values[values.indexOf("KW") - 1]);
        setEnginePowerPS(values[values.indexOf("PS") - 1]);
        setEnginePowerKW(values[values.indexOf("KW") - 1]);
    };
    var getBodyTypeList = function () {
        return vehicles
            .map(function (p) { return p.value.bodyType; })
            .filter(function (bodyType, index, arr) {
            return arr.indexOf(bodyType) === index;
        });
    };
    var getFuelTypeList = function () {
        return vehicles
            .filter(function (p) { return p.value.bodyType === bodyType; })
            .map(function (p) { return p.value.fuelType; })
            .filter(function (fuelType, index, arr) {
            return arr.indexOf(fuelType) === index;
        });
    };
    var getEngineCapacityList = function () {
        return vehicles
            .filter(function (p) {
            return p.value.bodyType === bodyType && p.value.fuelType === fuelType;
        })
            .map(function (p) { return p.value.engineCapacity.toString(); })
            .filter(function (fuelType, index, arr) {
            return arr.indexOf(fuelType) === index;
        });
    };
    var getEnginePowerList = function () {
        return vehicles
            .filter(function (p) {
            return p.value.bodyType === bodyType &&
                p.value.fuelType === fuelType &&
                p.value.engineCapacity === Number(engineCapacity);
        })
            .map(function (p) { return p.value.enginePowerPS + " PS " + p.value.enginePowerKW + " KW"; })
            .filter(function (fuelType, index, arr) {
            return arr.indexOf(fuelType) === index;
        });
    };
    // if (fetchData) {
    //   fetchData('http://localhost:8080/api/vehicles?make=Ford&model=Fiesta').then(response => { console.log(response) });
    // }
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(DropdownComponent_1.Dropdown, { list: makes, title: "Makes", onSelect: makeSelected }),
        react_1["default"].createElement(DropdownComponent_1.Dropdown, { list: models.map(function (model) { return model.make + " " + model.value; }), title: "Models", onSelect: modelSelected }),
        react_1["default"].createElement(DropdownComponent_1.Dropdown, { list: getBodyTypeList(), title: "Body Type", onSelect: bodyTypeSelected }),
        react_1["default"].createElement(DropdownComponent_1.Dropdown, { list: getFuelTypeList(), title: "Fuel Type", onSelect: fuelTypeSelected }),
        react_1["default"].createElement(DropdownComponent_1.Dropdown, { list: getEngineCapacityList(), title: "Engine Capacity", onSelect: engineCapacitySelected }),
        react_1["default"].createElement(DropdownComponent_1.Dropdown, { list: getEnginePowerList(), title: "Engine Power", onSelect: enginePowerSelected })));
}
exports["default"] = App;
