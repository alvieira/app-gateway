import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { NotificationComponentsPage, NotificationUpdatePage } from './notification.page-object';

describe('Notification e2e test', () => {
    let navBarPage: NavBarPage;
    let notificationUpdatePage: NotificationUpdatePage;
    let notificationComponentsPage: NotificationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Notifications', () => {
        navBarPage.goToEntity('notification');
        notificationComponentsPage = new NotificationComponentsPage();
        expect(notificationComponentsPage.getTitle()).toMatch(/storeApp.notification.home.title/);
    });

    it('should load create Notification page', () => {
        notificationComponentsPage.clickOnCreateButton();
        notificationUpdatePage = new NotificationUpdatePage();
        expect(notificationUpdatePage.getPageTitle()).toMatch(/storeApp.notification.home.createOrEditLabel/);
        notificationUpdatePage.cancel();
    });

    it('should create and save Notifications', () => {
        notificationComponentsPage.clickOnCreateButton();
        notificationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(notificationUpdatePage.getDateInput()).toContain('2001-01-01T02:30');
        notificationUpdatePage.setDetailsInput('details');
        expect(notificationUpdatePage.getDetailsInput()).toMatch('details');
        notificationUpdatePage.setSentDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(notificationUpdatePage.getSentDateInput()).toContain('2001-01-01T02:30');
        notificationUpdatePage.formatSelectLastOption();
        notificationUpdatePage.setUserIdInput('5');
        expect(notificationUpdatePage.getUserIdInput()).toMatch('5');
        notificationUpdatePage.setProductIdInput('5');
        expect(notificationUpdatePage.getProductIdInput()).toMatch('5');
        notificationUpdatePage.save();
        expect(notificationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
