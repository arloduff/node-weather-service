var FileReader = require('./filereader');
var WeatherService = require('./WeatherService');
var OutputService = require('./OutputService');

var fileReader = new FileReader('data.txt');
var weatherService = new WeatherService();
var output = new OutputService();

var promises = [];
var lines = fileReader.readFileAsArray();

lines.forEach((line) => {
	if(/^[A-Za-z\W]+$/.test(line)) {
		promises.push(
			weatherService.getByCityName(line)
			.catch((err) => {
				console.error(err)
			})
		);
	} else if(/^\-?[0-9]{0,3}(\.[0-9]{0,3})*,\-?[0-9]{0,3}(\.[0-9]{0,3})*$/.test(line)) {
		let [lat, lon] = line.split(',');

		promises.push(
			weatherService.getByCoordinates(lat, lon)
				.catch((err) => {
					console.error(err)
				})
			);
	} else if(/^[0-9]{5},[A-Za-z]+$/.test(line)) {
		let [zip, country] = line.split(',');

		promises.push(
			weatherService.getByZipcode(zip, country)
				.catch((err) => {
					console.error(err)
				})
			);
	}
});

Promise.all(promises)
	.then((results) => {
		// Some requests may come back successfully (response code 200) but return a 404 code in their information
		results = results.filter(result => result.coord);
		results.sort((a, b) => {
			if(parseFloat(a.coord.lat) < parseFloat(b.coord.lat)) {
				return 1;
			} else if (parseFloat(a.coord.lat) > parseFloat(b.coord.lat)) {
				return -1;
			} else {
				return 0;
			}
		});

		results.forEach((result) => {
			output.printWeatherObject(result);
		});
});
