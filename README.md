## DVLA VRT UK Vehicle registration lookup

Get information about vehicle history based on its registration
Look up the potential cost to import and tax the vehicle in Ireland

Uses

* `dvla-uk-vehicle-lookup` - Is an opensource package I created to scrape vehicle history information.
* VRTme.ie - Integrates with an API service I created that calculates the import charges and road tax charges for any vehicle

This is a fullstack server rendering Javascript example application showing how easy it is to integrate with vrtme.ie

#### Example reg's

* BX14UFB
* AO13KZJ
* TK04KAL
* OE12EYX

### Stack

* [React] - HTML enhanced for web apps!
* [Redux] - for app state management
* [Node] - for app state management
* [express] - for app state management
* [mongodb] - for app state management
* [ava] - Unit test runner & coverage tool
* [nyc] - for app state management
* [Webpack] - Bundling all of our modules and assets for a nice build

### Prerequisites

* [Node.js](https://nodejs.org/) >= v4.
* [MongoDB](https://www.mongodb.com/)

### Installation

```sh
$ npm i
```

For production builds

```sh
$ npm i
$ npm run build
$ npm run build:server
```

To build and start server on production

```sh
$ npm run bs
```

### Development

(Local development)

```sh
$ npm start
```

Run test and get nyc coverage report

```sh
$ npm test
```

#### Author

Gearoid Collins <mailto:gearoid@collins.ie>

## License

Release under the [MIT License](http://www.opensource.org/licenses/MIT).
