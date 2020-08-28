# Frontend Developer Candidate Assignment

Build a simple web app that allows a user to select their car from a directory of registered cars.
This data will be provided by the api server in this repo.
The api provides a list of available makes, models of each make and specific cars for each model with horsepower and engine capacity info.

# Requirements

- Make a mobile first and desktop-friendly UI.
- Build your own styles, don't use any CSS framework like Bootstrap.
- The app should work on the latest version of all major browsers

# Considerations

- Think of a user-friendly way to find and select a vehicle.
- Please focus on timeliness and completeness - if you have to choose between delivering 100% of the first feature + 0% of the second, and 50%-50%, please choose the first option.
- The API calls will not always return a successful result (200 OK), be aware of this! Do not modify the provided server.
- The provided API has only a fraction of the vehicles that we would have in a production server.
- Make it easy to build and run
- Think of this app as a real project where you need to consider maintainability.
- Only use 3rd party components if there is good reasoning for it. Please justify if not a basic library.
- Don't be afraid to surprise us!

# How to submit

1. Add your work to a git repository on [github](github.com) or [bitbucket](bitbucket.org).
2. Send us a link to your repo. We will review your work and contact you in **maximum 1 week**

# Running The Server

You will need node.js version 7.6 or higher

```bash
node apiserver/server.js
```

# API Endpoints

## http://localhost:8080/api/makes

Fetches the available car makes to choose from.

### Params

none

### Return value

An array of strings, each representing a unique car make.

### Example request

`GET http://localhost:8080/api/makes`

### Example response

```json
[
  "Ford",
  "Opel",
  ...
]
```

## http://localhost:8080/api/models

Fetches the available car models for the specified make.

### Params

- make: string _(required)_

### Return value

An array of strings, each representing a unique model of the specified make.

### Example Request

`GET http://localhost:8080/api/models?make=Ford`

### Example response

```json
[
  "Explorer",
  "Fiesta",
  ...
]
```

## http://localhost:8080/api/vehicles

Fetches the available registered cars for the specified make and model.

### Params

- make: string _(required)_
- model: string _(required)_

### Return value

An Array of objects with the following properties:

- make: string `// the make of the car`
- model: string `// the model of the car`
- enginePowerPS: number `// engine power in Horsepower units`
- enginePowerPW: number `// engine power in KiloWatts`
- fuelType: string `// fuel type`
- bodyType: string `// body type`
- engineCapacity: number `// engine capacity in cc`

### Example Request

`GET http://localhost:8080/api/vehicles?make=Ford&model=Fiesta`

### Example response

```json
[
  {
    "make": 'Ford',
    "model": 'Fiesta',
    "enginePowerPS": 54,
    "enginePowerKW": 40,
    "fuelType": 'Diesel',
    "bodyType": 'Limousine',
    "engineCapacity": 1119
  },
  ...
]
```
