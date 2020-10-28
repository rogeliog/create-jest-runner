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

const toTestResult = ({
  stats,
  skipped,
  errorMessage,
  tests,
  jestTestPath,
}: Options): TestResult => {
  return {
    failureMessage: errorMessage,
    leaks: false,
    numFailingTests: stats.failures,
    numPassingTests: stats.passes,
    numPendingTests: stats.pending,
    numTodoTests: stats.todo,
    openHandles: [],
    perfStats: {
      end: new Date(stats.end).getTime(),
      start: new Date(stats.start).getTime(),
      runtime: new Date(stats.end).getTime() - new Date(stats.start).getTime(),
      slow: false, // TODO: determine `slow`
    },
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
};

export default toTestResult;
