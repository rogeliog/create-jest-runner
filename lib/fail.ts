import toTestResult from './toTestResult';
import type { Path } from './types';

interface Options {
  start: number;
  end: number;
  test: {
    title: string;
    path: Path;
    errorMessage?: string;
  };
  errorMessage?: string;
}

const fail = ({ start, end, test, errorMessage }: Options) =>
  toTestResult({
    errorMessage: errorMessage || test.errorMessage,
    stats: {
      failures: 1,
      pending: 0,
      passes: 0,
      todo: 0,
      start,
      end,
    },
    skipped: false,
    tests: [{ duration: end - start, ...test }],
    jestTestPath: test.path,
  });

export default fail;
