import type { TestResult } from '@jest/test-result';
import type { Milliseconds } from './types';

interface Options {
  stats: {
    failures: number;
    passes: number;
    pending: number;
    todo: number;
    start: number;
    end: number;
  };
  skipped: boolean;
  errorMessage?: string | null;
  tests: Array<{
    duration?: Milliseconds | null;
    errorMessage?: string;
    testPath?: string;
    title?: string;
  }>;
  jestTestPath: string;
}

function getPerfStats({ stats }: Options): TestResult['perfStats'] {
  const start = new Date(stats.start).getTime();
  const end = new Date(stats.end).getTime();
  const runtime = end - start;
  // TODO: determine `slow` by using `runtime / 1000 > config.slowTestThreshold`
  // See: https://github.com/facebook/jest/blob/acd7c83c8365140f4ecf44a456ff7366ffa31fa2/packages/jest-runner/src/runTest.ts#L287
  const slow = false;
  return { start, end, runtime, slow };
}

export default function toTestResult(options: Options): TestResult {
  const { stats, skipped, errorMessage, tests, jestTestPath } = options;
  return {
    failureMessage: errorMessage,
    leaks: false,
    numFailingTests: stats.failures,
    numPassingTests: stats.passes,
    numPendingTests: stats.pending,
    numTodoTests: stats.todo,
    openHandles: [],
    perfStats: getPerfStats(options),
    skipped,
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      uncheckedKeys: [],
      unmatched: 0,
      updated: 0,
    },
    testFilePath: jestTestPath,
    testResults: tests.map(test => {
      return {
        ancestorTitles: [],
        duration: test.duration,
        failureDetails: [],
        failureMessages:
          errorMessage || test.errorMessage
            ? [(errorMessage || test.errorMessage) as string]
            : [],
        fullName: jestTestPath || test.testPath || '',
        numPassingAsserts: test.errorMessage ? 1 : 0,
        status: test.errorMessage ? 'failed' : 'passed',
        title: test.title || '',
      };
    }),
  };
}
