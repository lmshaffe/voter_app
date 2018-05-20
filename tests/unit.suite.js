process.env.NODE_LOG_LEVEL = process.env.NODE_LOG_LEVEL || 'fatal';

const tests = [
  './unit/apis/api.test',
];

tests.map((test) => {
  describe(`Running test suite ${test}`, () => { require(test); });
});
