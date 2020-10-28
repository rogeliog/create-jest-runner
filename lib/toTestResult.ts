import type { TestResult } from '@jest/test-result';
import type { Milliseconds } from './types';

interface ToTestResultOptions {
  stats: {
    failures: number;
    passes: number;
    pending: number;
    todo: number;
    end: number;
    start: number;
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
}: ToTestResultOptions): TestResult => {
  return {
    console: null,
    failureMessage: errorMessage,
    numFailingTests: stats.failures,
    numPassingTests: stats.passes,
    numPendingTests: stats.pending,
    numTodoTests: stats.todo,
    perfStats: {
      end: new Date(stats.end).getTime(),
      start: new Date(stats.start).getTime(),
    },
    skipped,
    snapshot: {
      added: 0,
      fileDeleted: false,
      matched: 0,
      unchecked: 0,
      unmatched: 0,
      updated: 0,
    },
    sourceMaps: {},
    testExecError: null,
    testFilePath: jestTestPath,
    testResults: tests.map(test => {
      return {
        ancestorTitles: [],
        duration: test.duration,
        failureMessages: test.errorMessage ? [test.errorMessage] : [],
        fullName: test.testPath,
        numPassingAsserts: test.errorMessage ? 1 : 0,
        status: test.errorMessage ? 'failed' : 'passed',
        title: test.title || '',
      };
    }),
  };
};

export default toTestResult;
