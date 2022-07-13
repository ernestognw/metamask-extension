import { strict as assert } from 'assert';
import sinon from 'sinon';
import BackupController from './backup';

function getMockController() {
  return {
    getSelectedAddress: sinon.stub().returns('0x01'),
    store: {
      getState: sinon.stub().returns({}),
    },
  };
}

describe('BackupController', function () {
  const getBackupController = () => {
    return new BackupController({
      preferencesController: getMockController(),
      addressBookController: getMockController(),
      trackMetaMetricsEvent: sinon.stub(),
    });
  };

  describe('constructor', function () {
    it('should setup correctly', function () {
      const backupController = getBackupController();
      const selectedAddress = backupController.preferencesController.getSelectedAddress();
      assert.equal(selectedAddress, '0x01');
    });
  });
});
