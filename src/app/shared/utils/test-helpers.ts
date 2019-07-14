import { ReactTestInstance } from 'react-test-renderer';

type FindFunc = () => ReactTestInstance;

export const i18nMockedProps = {
  t: (key: any) => key,
  i18n: {} as any,
  tReady: true
};

export function shouldThrow(findFunc: FindFunc): boolean {
  try {
    findFunc();
  } catch (error) {
    return error.message === 'No instances found with node type: "undefined"';
  }

  return false;
}
