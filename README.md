# LAB - 13

## Authentication Server Bearer Token

### Author: Jeremy Lee

### Links and Resources
* [submission PR](https://github.com/jeremy-401-advanced-javascript/Lab11/pull/2)
* [travis]([![Build Status](https://www.travis-ci.com/jeremy-401-advanced-javascript/Lab11.svg?branch=master)](https://www.travis-ci.com/jeremy-401-advanced-javascript/Lab11))
 


#### Documentation
* [api docs](http://xyz.com) (API servers)
* [jsdoc](http://xyz.com) (Server assignments)
* [styleguide](http://xyz.com) (React assignments)

### Modules
#### `index.js`
#### `router.js`
#### `user.model.js`
#### `middleware.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples

###### `bar(array) -> array`
Usage Notes or examples

### Setup
#### `.env` requirements
* `PORT` - 30000
* `MONGODB_URI` - URL mongodb://localhost:27017/class13

#### Running the app
* `npm nodemon`
* Endpoint: `/signup`
  * Returns a JSON object with username and password and session token
* Endpoint: `/signin`
  * Returns a JSON object with username and password and session token
  
#### Tests
* How do you run tests?
`npm test`

* What assertions were made? 🤔
* What assertions need to be / should be made? 🤔

#### UML
<img src="./assets/images/lab-11.jpg" width="300">