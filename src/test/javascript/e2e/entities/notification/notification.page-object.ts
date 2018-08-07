import { element, by, promise, ElementFinder } from 'protractor';

export class NotificationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-notification div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NotificationUpdatePage {
    pageTitle = element(by.id('jhi-notification-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    detailsInput = element(by.id('field_details'));
    sentDateInput = element(by.id('field_sentDate'));
    formatSelect = element(by.id('field_format'));
    userIdInput = element(by.id('field_userId'));
    productIdInput = element(by.id('field_productId'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    setDetailsInput(details): promise.Promise<void> {
        return this.detailsInput.sendKeys(details);
    }

    getDetailsInput() {
        return this.detailsInput.getAttribute('value');
    }

    setSentDateInput(sentDate): promise.Promise<void> {
        return this.sentDateInput.sendKeys(sentDate);
    }

    getSentDateInput() {
        return this.sentDateInput.getAttribute('value');
    }

    setFormatSelect(format): promise.Promise<void> {
        return this.formatSelect.sendKeys(format);
    }

    getFormatSelect() {
        return this.formatSelect.element(by.css('option:checked')).getText();
    }

    formatSelectLastOption(): promise.Promise<void> {
        return this.formatSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setUserIdInput(userId): promise.Promise<void> {
        return this.userIdInput.sendKeys(userId);
    }

    getUserIdInput() {
        return this.userIdInput.getAttribute('value');
    }

    setProductIdInput(productId): promise.Promise<void> {
        return this.productIdInput.sendKeys(productId);
    }

    getProductIdInput() {
        return this.productIdInput.getAttribute('value');
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
