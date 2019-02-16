let WeatherService = require('./WeatherService');
let weatherService = new WeatherService();

module.exports = class DataFileProcessor {
	constructor () {}

	processData (line) {
		let promise;

		if(this.isCityNameFormat(line)) {
			promise = weatherService.getByCityName(line)
				.catch((err) => {
					console.error(err)
				});
		} else if(this.isCoordinatesFormat(line)) {
			let [lat, lon] = line.split(',');

			promise = weatherService.getByCoordinates(lat, lon)
				.catch((err) => {
					console.error(err)
				});
		} else if(this.isZipcodeFormat(line)) {
			let [zip, country] = line.split(',');

			promise = weatherService.getByZipcode(zip, country)
				.catch((err) => {
					console.error(err)
				});
		}

		return promise;
	}

	processRequestPromises (promises) {
		return Promise.all(promises)
			.then((results) => {
				// Some requests may come back successfully (response code 200) but return a 404 code in their
				// information
				results = results.filter(result => result && result.coord);
				results.sort((a, b) => {
					if(parseFloat(a.coord.lat) < parseFloat(b.coord.lat)) {
						return 1;
					} else if (parseFloat(a.coord.lat) > parseFloat(b.coord.lat)) {
						return -1;
					} else {
						return 0;
					}
				});

				return results;
			});
	}

	isCityNameFormat (line) {
		return /^[A-Za-z\W]+$/.test(line);
	}

	isCoordinatesFormat (line) {
		return /^\-?[0-9]{0,3}(\.[0-9]{0,3})*,\-?[0-9]{0,3}(\.[0-9]{0,3})*$/.test(line);
	}

	isZipcodeFormat (line) {
		return /^[0-9]{5},[A-Za-z]+$/.test(line);
	}
}
