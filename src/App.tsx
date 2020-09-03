import React, { useState, useEffect } from "react";
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

  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  useEffect(() => {
    if (fetchData)
      fetchData("http://localhost:8080/api/makes").then((response: any) =>
        setMakes(response)
      );
  }, []);

  const makeSelected = (selectedItem: string) => {
    setModels([]);
    setMake(selectedItem);

    if (fetchData)
      fetchData(`http://localhost:8080/api/models?make=${selectedItem}`).then(
        (response: any) => {
          console.log(response, selectedItem);
          setModels(response);
        }
      );
  };

  const modelSelected = (selectedItem: string) => {
    setVehicles([]);
    setModel(selectedItem);
    if (fetchData) {
      fetchData(
        `http://localhost:8080/api/vehicles?make=${make}&model=${selectedItem}`
      ).then((response: any) => {
        setVehicles(response);
      });
    }
  };

  const bodyTypeSelected = (selectedItem: string) => setBodyType(selectedItem);

  const fuelTypeSelected = (selectedItem: string) => setFuelType(selectedItem);

  const engineCapacitySelected = (selectedItem: string) =>
    setEngineCapacity(selectedItem);

  const enginePowerSelected = (selectedItem: string) => {
    const values = selectedItem.split(" ");
    setEnginePowerPS(values[values.indexOf("PS") - 1]);
    setEnginePowerKW(values[values.indexOf("KW") - 1]);
  };

  const getBodyTypeList = () =>
    vehicles
      .map((p: any) => p.bodyType)
      .filter(
        (bodyType: string, index: number, arr: string[]) =>
          arr.indexOf(bodyType) === index
      )
      .sort();

  const getFuelTypeList = () =>
    vehicles
      .filter((p: any) => p.bodyType === bodyType)
      .map((p: any) => p.fuelType)
      .filter(
        (fuelType: string, index: number, arr: string[]) =>
          arr.indexOf(fuelType) === index
      )
      .sort();

  const getEngineCapacityList = () =>
    vehicles
      .filter((p: any) => p.bodyType === bodyType && p.fuelType === fuelType)
      .map((p: any) => p.engineCapacity.toString())
      .filter(
        (fuelType: string, index: number, arr: string[]) =>
          arr.indexOf(fuelType) === index
      )
      .sort();

  const getEnginePowerList = () =>
    vehicles
      .filter(
        (p: any) =>
          p.bodyType === bodyType &&
          p.fuelType === fuelType &&
          p.engineCapacity === Number(engineCapacity)
      )
      .map((p: any) => `${p.enginePowerPS} PS ${p.enginePowerKW} KW`)
      .filter(
        (fuelType: string, index: number, arr: string[]) =>
          arr.indexOf(fuelType) === index
      )
      .sort();

  return (
    <div>
      <div>Select your car</div>
      <Dropdown list={makes} title={"Makes"} onSelect={makeSelected}></Dropdown>
      <Dropdown
        list={models}
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
