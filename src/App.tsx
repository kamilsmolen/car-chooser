import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./utils/dist/fetchData";
import { Dropdown } from "./components/Dropdown/DropdownComponent";

function App() {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [engineCapacity, setEngineCapacity] = useState<string | null>(null);
  const [enginePowerKW, setEnginePowerKW] = useState<string | null>(null);
  const [enginePowerPS, setEnginePowerPS] = useState<string | null>(null);

  useEffect(() => {
    if (fetchData)
      fetchData("http://localhost:8080/api/makes").then((response: any) =>
        setMakes(response)
      );
  }, []);

  const makeSelected = (selectedItem: string) => {
    setModels([]);

    if (fetchData)
      fetchData(`http://localhost:8080/api/models?make=${selectedItem}`).then(
        (response: any) => {
          setModels(
            response.map((modelItem: string) => ({
              make: selectedItem,
              value: modelItem
            }))
          );
        }
      );
  };

  const modelSelected = (selectedItem: string) => {
    setVehicles([]);
    const index = selectedItem.indexOf(" ");
    const model = [selectedItem.slice(0, index), selectedItem.slice(index + 1)];
    if (fetchData) {
      fetchData(
        `http://localhost:8080/api/vehicles?make=${model[0]}&model=${model[1]}`
      ).then((response: any) => {
        console.log(response);
        setVehicles(
          response.map((vehicleItem: string) => ({
            make: model[0],
            model: model[1],
            value: vehicleItem
          }))
        );
      });
    }
  };

  const bodyTypeSelected = (selectedItem: string) => setBodyType(selectedItem);

  const fuelTypeSelected = (selectedItem: string) => setFuelType(selectedItem);

  const engineCapacitySelected = (selectedItem: string) =>
    setEngineCapacity(selectedItem);

  const enginePowerSelected = (selectedItem: string) => {
    const values = selectedItem.split(" ");
    console.log(
      values[values.indexOf("PS") - 1],
      values[values.indexOf("KW") - 1]
    );
    setEnginePowerPS(values[values.indexOf("PS") - 1]);
    setEnginePowerKW(values[values.indexOf("KW") - 1]);
  };

  const getBodyTypeList = () =>
    vehicles
      .map((p: any) => p.value.bodyType)
      .filter(
        (bodyType: string, index: number, arr: string[]) =>
          arr.indexOf(bodyType) === index
      );

  const getFuelTypeList = () =>
    vehicles
      .filter((p: any) => p.value.bodyType === bodyType)
      .map((p: any) => p.value.fuelType)
      .filter(
        (fuelType: string, index: number, arr: string[]) =>
          arr.indexOf(fuelType) === index
      );
  const getEngineCapacityList = () =>
    vehicles
      .filter(
        (p: any) =>
          p.value.bodyType === bodyType && p.value.fuelType === fuelType
      )
      .map((p: any) => p.value.engineCapacity.toString())
      .filter(
        (fuelType: string, index: number, arr: string[]) =>
          arr.indexOf(fuelType) === index
      );
  const getEnginePowerList = () =>
    vehicles
      .filter(
        (p: any) =>
          p.value.bodyType === bodyType &&
          p.value.fuelType === fuelType &&
          p.value.engineCapacity === Number(engineCapacity)
      )
      .map(
        (p: any) => `${p.value.enginePowerPS} PS ${p.value.enginePowerKW} KW`
      )
      .filter(
        (fuelType: string, index: number, arr: string[]) =>
          arr.indexOf(fuelType) === index
      );
  // if (fetchData) {
  //   fetchData('http://localhost:8080/api/vehicles?make=Ford&model=Fiesta').then(response => { console.log(response) });
  // }
  return (
    <div className="App">
      <Dropdown list={makes} title={"Makes"} onSelect={makeSelected}></Dropdown>
      <Dropdown
        list={models.map((model: any) => `${model.make} ${model.value}`)}
        title={"Models"}
        onSelect={modelSelected}
      ></Dropdown>
      <Dropdown
        list={getBodyTypeList()}
        title={"Body Type"}
        onSelect={bodyTypeSelected}
      ></Dropdown>
      <Dropdown
        list={getFuelTypeList()}
        title={"Fuel Type"}
        onSelect={fuelTypeSelected}
      ></Dropdown>
      <Dropdown
        list={getEngineCapacityList()}
        title={"Engine Capacity"}
        onSelect={engineCapacitySelected}
      ></Dropdown>
      <Dropdown
        list={getEnginePowerList()}
        title={"Engine Power"}
        onSelect={enginePowerSelected}
      ></Dropdown>
    </div>
  );
}

export default App;
