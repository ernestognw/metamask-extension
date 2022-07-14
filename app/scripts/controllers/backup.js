import { exportAsFile, prependZero } from '../../../ui/helpers/utils/util';

export default class BackupController {
  constructor(opts = {}) {
    const {
      preferencesController,
      addressBookController,
      trackMetaMetricsEvent,
    } = opts;

    this.preferencesController = preferencesController;
    this.addressBookController = addressBookController;
    this._trackMetaMetricsEvent = trackMetaMetricsEvent;
  }

  async restoreUserData(jsonString) {
    console.log('jsonString: ', jsonString);
    const { preferences, addressBook } = JSON.parse(jsonString);
    preferences && this.preferencesController.store.updateState(preferences);
    addressBook && this.addressBookController.update(addressBook, true);
    this._trackMetaMetricsEvent({
      event: 'User restored data from backup',
      category: 'backup',
    });
  }

  async backupUserData() {
    const userData = {
      preferences: this.preferencesController.store.getState(),
      addressBook: this.addressBookController.state,
    };

    const result = JSON.stringify(userData);

    const date = new Date();

    const pz = (num) => prependZero(num, 2);

    /*
     * userData.YYYY_MM_DD_HH_mm_SS e.g userData.2022_01_13_13_45_56
     * */
    const userDataFileName = `userData.${date.getFullYear()}_${pz(
      date.getMonth() + 1,
    )}_${pz(date.getDay())}_${pz(date.getHours())}_${pz(
      date.getMinutes(),
    )}_${pz(date.getDay())}.json`;

    exportAsFile(userDataFileName, result);

    this._trackMetaMetricsEvent({
      event: 'User data backed up',
      category: 'backup',
    });

    return result;
  }
}
