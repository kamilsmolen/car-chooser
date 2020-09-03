import React, { useState, useEffect } from "react";
import { fetchData } from "./utils/fetchData";
import { Dropdown } from "./components/Dropdown/DropdownComponent";

export interface Vehicle {
  bodyType?: string;
  fuelType?: string;
  engineCapacity?: string | number;
  enginePowerKW?: string | number;
  enginePowerPS?: string | number;
}

function App() {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
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

  const filterVehicles = (
    filterCallback: (vehicle: Vehicle) => boolean,
    mapCallback: (vehicle: Vehicle) => any
  ) =>
    vehicles
      .filter(filterCallback)
      .map(mapCallback)
      .filter(
        (item: string, index: number, arr: string[]) =>
          arr.indexOf(item) === index
      )
      .sort();

  const getBodyTypeList = () =>
    filterVehicles(
      () => true,
      (vehicle: Vehicle) => vehicle.bodyType
    );

  const getFuelTypeList = () =>
    filterVehicles(
      (vehicle: Vehicle) => vehicle.bodyType === bodyType,
      (vehicle: Vehicle) => vehicle.fuelType
    );

  const getEngineCapacityList = () =>
    filterVehicles(
      (vehicle: Vehicle) =>
        vehicle.bodyType === bodyType && vehicle.fuelType === fuelType,
      (vehicle: Vehicle) =>
        vehicle.engineCapacity && vehicle.engineCapacity.toString()
    );

  const getEnginePowerList = () =>
    filterVehicles(
      (vehicle: Vehicle) =>
        vehicle.bodyType === bodyType &&
        vehicle.fuelType === fuelType &&
        vehicle.engineCapacity === Number(engineCapacity),
      (vehicle: Vehicle) =>
        `${vehicle.enginePowerPS} PS ${vehicle.enginePowerKW} KW`
    );

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
