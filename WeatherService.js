var https = require('https');

const CONFIG = require('./package.json');
const API = CONFIG.api;
const API_KEY = CONFIG.apikey;

module.exports = class WeatherService {
	constructor () {}

	getByCityName (cityName) {
		return this.httpGetRequest(this.formCityUrl(cityName));
	}

	getByCoordinates (lat, lon) {
		return this.httpGetRequest(this.formCoordinatesUrl(lat, lon));
	}

	getByZipcode (zip, country) {
		return this.httpGetRequest(this.formZipcodeUrl(zip, country));
	}

	httpGetRequest (url) {
		return new Promise((resolve, reject) => {
			https.get(url, (resp) => {
				let data = '';

				resp.on('data', (chunk) => {
					data += chunk;
				});

				resp.on('end', () => {
					resolve(JSON.parse(data));
				});

				resp.on('error', (err) => {
					reject(err);
				});
			});
		});
	}

	formCityUrl (cityName) {
		return `${API}?q=${cityName}&appid=${API_KEY}`;
	}

	formCoordinatesUrl(lat, lon) {
		return `${API}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	}

	formZipcodeUrl(zip, country) {
		return `${API}?zip=${zip},${country}&appid=${API_KEY}`;
	}
}
