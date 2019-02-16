let FileReader = require('./FileReader');
let DataFileProcessor = require('./DataFileProcessor');
let OutputService = require('./OutputService');

let filename = process.argv[2] || 'data.txt';

let fileReader = new FileReader(filename);
let processor = new DataFileProcessor();
let output = new OutputService();

let promises = [];

try {
	var lines = fileReader.readFileAsArray();
} catch (e) {
	console.error("Your file was not found");
	process.exit();
}

lines.forEach((line) => {
	promises.push(processor.processData(line));
});

Promise.all(promises)
	.then((results) => {
		// Some requests may come back successfully (response code 200) but return a 404 code in their information
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

		results.forEach((result) => {
			output.printWeatherObject(result);
		});
});
