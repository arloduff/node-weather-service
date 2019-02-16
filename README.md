# node-weather-service
Service to gather weather information from a text file via the weather API

## Installation

No installation should be necessary, as this should only utilize libraries that are included with node.js

## Running

Simply run

    $node weather

at the command prompt. This will default to using the file `data.txt` as the input file. Alternatively, you can
specify a different file as a third parameter:

    $node weather most-populous-cities.txt
    $node weather most-popular-travel-destinations.txt

## Specifying the API endpoint and key

The API endpoint and API key are customizable via the `package.json` file. Simply update the `api` and `apikey`
values, respectfully:

    "api": "https://api.openweathermap.org/data/2.5/weather",
    "apikey": "5c7f4642322911e9a7926f58a9c9b45b"


I did not receive any third-party help while writing this.
