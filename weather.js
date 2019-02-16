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

processor.processRequestPromises(promises)
	.then((results) => {
		results.forEach((result) => {
			output.printWeatherObject(result);
		});
});
