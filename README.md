# Pets Auctions Web App

### Welcome my Pet Auctions Web App here you'll find all the documentation you need to get up and running with it.

<br>

## Introduction

Pets Auction app allows users bid on certain pet with certain amount of money.

##### The available features:

* Add a new bid
* List all bids for pet owner

<br>

## Used Tools

* #### Node.js: The whole server is developed using Node.js as a runtime environment.

* #### Express.js: Express is the Node.js framework used in this project.

* #### MongoDB: Column based Database used for this project.

* #### Mongoose: ODM for MongoDB as it provides a straightforward, schema-based solution to model application data.

* #### Babel: Babel helps to compile ES6 code to a compatible JavaScript code.

* #### Mocha: JavaScript test framework running on Node.js.

* #### ESLint: A tool for patterns reporting in ECMAScript/JavaScript code and making code more consistent.

<br>

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any debug errors in the console.

### `npm build`

Builds the app for production to the `build` folder.<br />
Your app is ready to be deployed!

### `npm start`

Calls `npm build` first then Runs the app in the production mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner

### `npm run coverage`

Launches the test runner with the NYC code coverage tool to get information about how well app tests cover app code.

<br>

## Authentication

User api_key should be included in the header of all user requests as "header["api_key"]" to verify authentication with the app.

<br>

## Request

#### GET/ list all bid of certain pet for pet owner

Request base URL: <code>{base-url}/bid/{petId}</code> , and <code>headers['api_key']={pet owner api_key}</code> should be included with the request to get the write response.
<br>
Request example: <code>http://localhost:3000/bid/61df17aacb5dd9d8f002ee92</code>
<br>
The response:
<pre>
<code>[
        {
          "_id": "61df1965ced02e16c5e2bf3f",
          "petId": "61df17aacb5dd9d8f002ee92",
          "userId": "61df1696c836e66c818d962d",
          "name": "Mary",
          "value": 320,
          "__v": 0
        },
        {
          "_id": "61df198aced02e16c5e2bf42",
          "petId": "61df17aacb5dd9d8f002ee92",
          "userId": "61df1696c836e66c818d962e",
          "name": "Sam",
          "value": 320,
          "__v": 0
        }
]</code>
</pre>

###### The return is an array with 2 entries (bids) of pet with id "61df17aacb5dd9d8f002ee92"
<br>

<hr>

#### POST / add a new bid for a certain pet

Request base URL: <code>{base-url}/bid/{petId}</code> , and <code>headers['api_key']= current user api_key</code> should be included with the request to be able to add a bid.
<br>
Request example: <code>http://localhost:3000/bid/61df17aacb5dd9d8f002ee92</code>, request body: <code>{value:500}</code>
<br>
The response:
<br>

<pre>
<code>{
        "petId": "61df17aacb5dd9d8f002ee92",
        "userId": "61df1696c836e66c818d962b",
        "name": "Amr",
        "value": 500,
        "_id": "61df19c8ced02e16c5e2bf48",
        "__v": 0
}</code>
</pre>


## Bad Request responses

* incase of not adding api_key header with your request you will get response with status code ***401*** and msg **"Unauthorized request, api_key header is required"**.

* incase of not adding api_key header with your request you will get response with status code ***401*** and msg **"Unauthorized request, api_key header is required"**.

* incase of trying to access pet bids and you're not the owner you will get response with status code ***401*** and msg **"Unauthorized request, not an owner"**.

* incase of entering wrong value you will get response with status code ***405*** and msg **"Invalid input"**.
