var FileReader = require('./filereader');
var WeatherService = require('./weatherservice');

var fileReader = new FileReader('data.txt');
var weatherService = new WeatherService();
var results = [];

var lines = fileReader.readFileAsArray();

lines.forEach((line) => {
	if(/^[A-Za-z]+$/.test(line)) {
		weatherService.getByCityName(line)
			.then((data) => {
				results.push(data);
			}).catch((err) => {
				console.error(err)
			});
	} else if(/^[0-9]{0,3},[0-9]{0,3}$/.test(line)) {
		let [lat, lon] = line.split(',');

		weatherService.getByCoordinates(lat, lon)
			.then((data) => {
				results.push(data);
			}).catch((err) => {
				console.error(err)
			});
	} else if(/^[0-9]{5},[A-Za-z]+$/.test(line)) {
		let {zip, country} = line.split(',');

		weatherService.getByZipcode(zip, country)
			.then((data) => {
				results.push(data);
			}).catch((err) => {
				console.error(err)
			});
	}
});

console.log(JSON.stringify(results, null, 2));