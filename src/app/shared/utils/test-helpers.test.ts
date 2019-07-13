import sinon from 'sinon';

import { shouldThrow } from './test-helpers';

describe('TestHelpers', () => {
  describe('shouldThrow', () => {
    it('proper error is thrown', () => {
      const component = {
        root: {
          findByType: sinon.mock().throws({ message: 'No instances found with node type: "undefined"' })
        }
      };

      expect(shouldThrow(() => component.root.findByType('label'))).toBeTruthy();
    });

    it('improper error is thrown', () => {
      const component = {
        root: {
          findByType: sinon.mock().throws({ message: 'some error' })
        }
      };

      expect(shouldThrow(() => component.root.findByType('label'))).toBeFalsy();
    });

    it('improper error is thrown', () => {
      const component = {
        root: {
          findByType: sinon.mock().returns(null)
        }
      };

      expect(shouldThrow(() => component.root.findByType('label'))).toBeFalsy();
    });
  });
});
