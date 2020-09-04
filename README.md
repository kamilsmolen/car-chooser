# Car chooser application

This is application to select car from a directory of registered cars. User has provided options and based on that goes to next steps of their selection.

## How to run app?

1. Clone repository.

2. Install dependencies:

   > `$ npm i`

3. Run server file:

   > `$ node apiserver/server.js`
   > Server will start listening on port `8080`.

4. Run application:
   > `$ npm run start`
   > App will be run on port `3000` -> `http://localhost:3000/`.

## Flow of the application

1. Initially application displays "Loading" message while makes are loaded from `GET http://localhost:8080/api/makes`.
2. When makes are loaded, "Loading" message goes away and "Makes" dropdown appear.
3. When make is selected, model request is running `GET http://localhost:8080/api/models?make=${make}`. When loaded - display available models dropdown.
4. When model is selected, vehicles request is running `GET http://localhost:8080/api/vehicles?make=${make}&model=${model}`.
5. For next dropdown - no api called. Data is filtered by selected vehicle configuration and sorted.
6. If already selected data is changed - dropdown selections after it are cleared.

## Additional information

1. If data fetch fails, retry fetch up to 10 times.
2. If no available dropdowns values for set up values (dropdown has no values) - display message there is no values.
3. Used npm version 6.13.4 and node version 12.14.1.

## Screenshots

![Loading mobile](https://github.com/kamilsmolen/car-chooser/blob/master/media/loading.png?raw=true "Loading mobile")

![Selection mobile](https://github.com/kamilsmolen/car-chooser/blob/master/media/selection.png?raw=true "Selection mobile")

![All selected mobile](https://github.com/kamilsmolen/car-chooser/blob/master/media/all_selected.png?raw=true "All selected mobile")

![Missing car mobile](https://github.com/kamilsmolen/car-chooser/blob/master/media/missing_car.png?raw=true "Missing car mobile")

![All selected desktop](https://github.com/kamilsmolen/car-chooser/blob/master/media/all_selected_desktop.png?raw=true "All selected desktop")

![Missing car desktop](https://github.com/kamilsmolen/car-chooser/blob/master/media/missing_car_desktop.png?raw=true "Missing car desktop")
