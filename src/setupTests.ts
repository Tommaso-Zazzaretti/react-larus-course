// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { testMockServer } from './Test/ mocks/server';

// Start the Http mock server before to execute tests
beforeAll(()=>{ testMockServer.listen({ onUnhandledRequest: 'error' }); })
// Clean up pending requests between tests in order to not affect next texts
afterEach(()=>{testMockServer.resetHandlers(); })
// Close the Http mock server after tests executions
afterAll (()=>{testMockServer.close()})
