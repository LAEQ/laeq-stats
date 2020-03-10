# Library to perform statistical calculation, 
This library calculate common statistical computation like, mean, average, quartiles. You can also create discretization classes based on different algorithm quantile, jenks, equal amplitude ...

> Note: the standard derivation is not available for the 2.0 version. It will be fixed in a near future.

### Build status

| Branch | status |
| ------------- | ------------- |
| Master  |  ![build status](https://travis-ci.com/LAEQ/laeq-stats.svg?branch=master)|

Library to generate statistical classes (quantile, jenks, ...) from a list of values (integer, float).

```js
npm install
```

### Tests
```js
npm test
node_modules/mocha/bin/mocha --require @babel/register -g test_name
```

### How to use it
Please check the unit tests for some examples.
