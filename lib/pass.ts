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

const pass = ({ start, end, test }: Options) =>
  toTestResult({
    stats: {
      failures: 0,
      pending: 0,
      passes: 1,
      todo: 0,
      start,
      end,
    },
    skipped: false,
    tests: [{ duration: end - start, ...test }],
    jestTestPath: test.path,
  });

export default pass;
