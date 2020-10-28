import toTestResult from './toTestResult';
import type { TestDetail } from './types';

interface Options {
  start: number;
  end: number;
  test: TestDetail;
}

export default function skip({ start, end, test }: Options) {
  return toTestResult({
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
}
