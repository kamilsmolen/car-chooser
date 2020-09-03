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

export interface ViewModel {
  modelEnabled: boolean;
  bodyTypeEnabled: boolean;
  fuelTypeEnabled: boolean;
  engineCapacityEnabled: boolean;
  enginePowerEnabled: boolean;
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

  const [viewModel, setViewModel] = useState<ViewModel>({
    modelEnabled: false,
    bodyTypeEnabled: false,
    fuelTypeEnabled: false,
    engineCapacityEnabled: false,
    enginePowerEnabled: false
  });

  const updateViewModel = () =>
    setViewModel({
      modelEnabled: make !== null,
      bodyTypeEnabled: model !== null,
      fuelTypeEnabled: bodyType !== null,
      engineCapacityEnabled: fuelType !== null,
      enginePowerEnabled: engineCapacity !== null
    });

  useEffect(updateViewModel, [
    makes,
    models,
    vehicles,
    bodyType,
    fuelType,
    engineCapacity
  ]);

  useEffect(() => {
    if (fetchData)
      fetchData("http://localhost:8080/api/makes").then((response: string[]) =>
        setMakes(response)
      );
  }, []);

  const makeSelected = (selectedItem: string) => {
    setModels([]);

    if (fetchData)
      fetchData(`http://localhost:8080/api/models?make=${selectedItem}`).then(
        (response: string[]) => {
          setMake(selectedItem);
          setModels(response);
        }
      );
  };

  const modelSelected = (selectedItem: string) => {
    setVehicles([]);
    if (fetchData) {
      fetchData(
        `http://localhost:8080/api/vehicles?make=${make}&model=${selectedItem}`
      ).then((response: Vehicle[]) => {
        setModel(selectedItem);
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
      {viewModel.modelEnabled && (
        <Dropdown
          list={models}
          title={"Models"}
          onSelect={modelSelected}
        ></Dropdown>
      )}

      {viewModel.bodyTypeEnabled && (
        <Dropdown
          list={getBodyTypeList()}
          title={"Body Type"}
          onSelect={bodyTypeSelected}
        ></Dropdown>
      )}

      {viewModel.fuelTypeEnabled && (
        <Dropdown
          list={getFuelTypeList()}
          title={"Fuel Type"}
          onSelect={fuelTypeSelected}
        ></Dropdown>
      )}

      {viewModel.engineCapacityEnabled && (
        <Dropdown
          list={getEngineCapacityList()}
          title={"Engine Capacity"}
          onSelect={engineCapacitySelected}
        ></Dropdown>
      )}

      {viewModel.enginePowerEnabled && (
        <Dropdown
          list={getEnginePowerList()}
          title={"Engine Power"}
          onSelect={enginePowerSelected}
        ></Dropdown>
      )}
    </div>
  );
}

export default App;
