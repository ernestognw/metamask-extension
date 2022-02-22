const BasePage = require('./base.page');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.inputPassword = '#password';
    this.btnUnlock = '.unlock-page button';
    this.btnImportUsingSecret = '.unlock-page__links button';
    this.btnSupportLink = '.unlock-page__support a';
  }

  async unlock(password) {
    await this.driver.fill(this.inputPassword, password);
    await this.driver.clickElement(this.btnUnlock);
  }

  async importUsingSecret() {
    await this.driver.clickElement(this.btnImportUsingSecret);
  }

  async openSupport() {
    await this.driver.clickElement(this.btnSupportLink);
  }
}

module.exports = LoginPage;