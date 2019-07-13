import { ReactTestInstance } from 'react-test-renderer';

type FindFunc = () => ReactTestInstance;

export function expectFindToThrow(findFunc: FindFunc) {
  try {
    findFunc();
  } catch (error) {
    expect(error.message).toEqual('No instances found with node type: "undefined"');
  }
}
