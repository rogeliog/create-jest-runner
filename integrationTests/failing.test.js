const runJest = require('./runJest');

it('Works when it has skipped tests', async () => {
  const resultString = await runJest('failing');
  expect(resultString).toEqual(expect.stringContaining('1 skipped, 1 total'));
});
