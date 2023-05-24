# WebdriverIO UI testing

This project contains automated tests written using WebDriverIO (wdio) for the an imaginary "ABC-Taxi" web application. It focuses on testing the user interface and functionality of "Order a taxi" feature.

## Setup

Before running the tests, make sure you have the following software installed:

- `Node.js`
- `npm` (Node Package Manager)

To install the project dependencies, clone the repository and navigate to the project directory in your terminal. Then, run the following command:

```
npm install
```

## Configuration

The tests are configured to run on the "ABC_TAXI" web application. To set the application URL, open the `wdio.conf.js` file located in the project's root directory. Look for the `baseUrl` property and update it with the URL of your Urban Grocers application.

By default the tests are running in `headless` mode on two browsers: `Chrome` and `Firefox`. This can be changed in `wdio.conf.js` by commenting out these lines of configurations.

## Running the Tests

To run all the tests, use the following command:

```
npm run wdio
```

## Test cases

1. Fill in the addresses for the order.
2. Select the "Supportive" taxi mode.
3. Add a phone number to the order.
4. Add a card payment method.
5. Add a message to the driver.
6. Add a blanket and handkerchiefs to the order.
7. Add 2 ice creams to the order.
8. Place the order.
9. Find a driver.

## Code Style

The code follows the following style conventions:

- Variable names are written in camelCase and are descriptive of their purpose.
- `const` is used for variables that do not change, and `let` is used for variables that are modified.
- Comments are used to explain important blocks of code.
- Code is organized in a modular manner, with reusable code blocks imported where necessary.
- No unnecessary logs printed to the console.
- No unnecessary `pause` wait functions that make the test run longer than it should.
- The test titles start with `should` and provide a clear description of the expected result.
- Comments are added to the important blocks of code to improve code understanding and maintainability.
- DRY principle is applied by reusing variables and functions across multiple blocks.