module.exports = class OutPutService {
	constructor () {}

	printWeatherObject (cityObject) {
		console.log(`${cityObject.name} ${cityObject.coord.lat},${cityObject.coord.lon} ${cityObject.weather[0].description}`);
	}	
}
