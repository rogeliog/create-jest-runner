import toTestResult from './toTestResult';
import type { Path } from './types';

interface Options {
  start: number;
  end: number;
  test: {
    title: string;
    path: Path;
  };
}

const skip = ({ start, end, test }: Options) =>
  toTestResult({
    stats: {
      failures: 0,
      pending: 1,
      passes: 0,
      todo: 0,
      start,
      end,
    },
    skipped: true,
    tests: [{ duration: end - start, ...test }],
    jestTestPath: test.path,
  });

export default skip;
