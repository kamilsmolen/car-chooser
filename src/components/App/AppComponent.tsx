import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";
import { Dropdown } from "../Dropdown";
import "./App.css";

export interface Vehicle {
  bodyType?: string;
  fuelType?: string;
  engineCapacity?: string | number;
  enginePowerKW?: string | number;
  enginePowerPS?: string | number;
}

export interface dropdownViewModel {
  modelEnabled: boolean;
  bodyTypeEnabled: boolean;
  fuelTypeEnabled: boolean;
  engineCapacityEnabled: boolean;
  enginePowerEnabled: boolean;
  buttonEnabled: boolean;
}

export function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleConfig, setVehicleConfig] = useState<Vehicle>();
  const [make, setMake] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  //View model to display dropdown windows

  const [dropdownViewModel, setDropdownViewModelModel] = useState<
    dropdownViewModel
  >({
    modelEnabled: false,
    bodyTypeEnabled: false,
    fuelTypeEnabled: false,
    engineCapacityEnabled: false,
    enginePowerEnabled: false,
    buttonEnabled: false
  });

  //State observer to update view model
  const updateViewModel = () =>
    setDropdownViewModelModel({
      ...dropdownViewModel,
      modelEnabled: make !== null,
      bodyTypeEnabled: model !== null,
      fuelTypeEnabled:
        vehicleConfig !== undefined && vehicleConfig.bodyType !== undefined,
      engineCapacityEnabled:
        vehicleConfig !== undefined && vehicleConfig.fuelType !== undefined,
      enginePowerEnabled:
        vehicleConfig !== undefined &&
        vehicleConfig.engineCapacity !== undefined,
      buttonEnabled:
        (vehicleConfig !== undefined &&
          vehicleConfig.enginePowerPS !== undefined) ||
        (vehicleConfig !== undefined &&
          vehicleConfig.enginePowerKW !== undefined)
    });

  useEffect(updateViewModel, [makes, models, vehicles, vehicleConfig]);

  //Initial fetch of data - makes

  useEffect(() => {
    if (fetchData)
      fetchData("http://localhost:8080/api/makes").then(
        (response: string[]) => {
          setMakes(response);
          setIsLoaded(true);
        }
      );
  }, []);

  //Dropodown onSelect functions (fetch data)

  const makeSelected = (selectedItem: string) => {
    setModels([]);
    setVehicles([]);
    setVehicleConfig({});
    console.log(selectedItem);

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
    setVehicleConfig({});
    if (fetchData) {
      fetchData(
        `http://localhost:8080/api/vehicles?make=${make}&model=${selectedItem}`
      ).then((response: Vehicle[]) => {
        setModel(selectedItem);
        setVehicles(response);
      });
    }
  };

  //Dropodown onSelect functions (no fetch data)

  const bodyTypeSelected = (selectedItem: string) =>
    setVehicleConfig({
      bodyType: selectedItem,
      fuelType: undefined,
      engineCapacity: undefined,
      enginePowerKW: undefined,
      enginePowerPS: undefined
    });

  const fuelTypeSelected = (selectedItem: string) =>
    setVehicleConfig({
      ...vehicleConfig,
      fuelType: selectedItem,
      engineCapacity: undefined,
      enginePowerKW: undefined,
      enginePowerPS: undefined
    });

  const engineCapacitySelected = (selectedItem: string) =>
    setVehicleConfig({
      ...vehicleConfig,
      engineCapacity: selectedItem,
      enginePowerKW: undefined,
      enginePowerPS: undefined
    });

  const enginePowerSelected = (selectedItem: string) => {
    const values = selectedItem.split(" ");
    setVehicleConfig({
      ...vehicleConfig,
      enginePowerKW: values[values.indexOf("PS") - 1],
      enginePowerPS: values[values.indexOf("KW") - 1]
    });
  };

  //Preparing function: 1. Filter by selected value. 2. Map to strings. 3. Get unique values. 4 Sort.

  const getVehiclePropertyValues = (
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

  //List getting functions

  const getBodyTypeList = () =>
    getVehiclePropertyValues(
      () => true,
      (vehicle: Vehicle) => vehicle.bodyType
    );

  const getFuelTypeList = () =>
    getVehiclePropertyValues(
      (vehicle: Vehicle) => vehicle.bodyType === vehicleConfig?.bodyType,
      (vehicle: Vehicle) => vehicle.fuelType
    );

  const getEngineCapacityList = () =>
    getVehiclePropertyValues(
      (vehicle: Vehicle) =>
        vehicle.bodyType === vehicleConfig?.bodyType &&
        vehicle.fuelType === vehicleConfig?.fuelType,
      (vehicle: Vehicle) =>
        vehicle.engineCapacity && vehicle.engineCapacity.toString()
    );

  const getEnginePowerList = () =>
    getVehiclePropertyValues(
      (vehicle: Vehicle) =>
        vehicle.bodyType === vehicleConfig?.bodyType &&
        vehicle.fuelType === vehicleConfig?.fuelType &&
        vehicle.engineCapacity === Number(vehicleConfig?.engineCapacity),
      (vehicle: Vehicle) =>
        `${vehicle.enginePowerPS} PS ${vehicle.enginePowerKW} KW`
    );

  // Component

  return (
    <div className="App">
      {!isLoaded && <div className="loading-header">Loading...</div>}
      {isLoaded && (
        <div>
          <div className="header-message">Select your car</div>
          <div className="dropdowns-group">
            <Dropdown
              list={makes}
              title={"Makes"}
              onSelect={makeSelected}
            ></Dropdown>
            {dropdownViewModel.modelEnabled && (
              <Dropdown
                list={models}
                title={"Models"}
                onSelect={modelSelected}
              ></Dropdown>
            )}

            {dropdownViewModel.bodyTypeEnabled && (
              <Dropdown
                list={getBodyTypeList()}
                title={"Body Type"}
                onSelect={bodyTypeSelected}
              ></Dropdown>
            )}

            {dropdownViewModel.fuelTypeEnabled && (
              <Dropdown
                list={getFuelTypeList()}
                title={"Fuel Type"}
                onSelect={fuelTypeSelected}
              ></Dropdown>
            )}

            {dropdownViewModel.engineCapacityEnabled && (
              <Dropdown
                list={getEngineCapacityList()}
                title={"Engine Capacity"}
                onSelect={engineCapacitySelected}
              ></Dropdown>
            )}

            {dropdownViewModel.enginePowerEnabled && (
              <Dropdown
                list={getEnginePowerList()}
                title={"Engine Power"}
                onSelect={enginePowerSelected}
              ></Dropdown>
            )}

            {dropdownViewModel.buttonEnabled && (
              <button className="apply-button">Select car</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
