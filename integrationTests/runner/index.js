// eslint-disable-next-line import/no-unresolved -- ignore unresolved build artifact
const { createJestRunner } = require('../..');

module.exports = createJestRunner(require.resolve('./run'));
