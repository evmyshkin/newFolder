const page = require('../../page');
const helper = require('../../helper')

describe('Taxi order flow', () => {

    // Test 1
    it('should get the supportive mode taxi driver', async () => {
        // Load app
        await browser.url(`/`)
        // Fill in the addresses and calling a taxi
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    })

    // Test 2
    it('should select supportive mode taxi', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // Select "Supportive" taxi mode
        const supportiveTariff = await page.selectSupportiveTariff();
        await expect(supportiveTariff.parentElement()).toHaveElementClass('active');
    })

    // Test 3
    it('should add a phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // Adding a phone number
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await $(`div=${phoneNumber}`)).toBeExisting();
    })

    // Test 4
    it('should add a card payment method', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // Adding a card payment method
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.addPaymenMethodCard(cardNumber, cardCode);
        await expect(await $(`${page.paymentMethodAddedCard}`)).toBeExisting();
    })

    // Test 5
    it('should add a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        // Adding a message to the driver
        const message = "Waiting outside";
        await page.addMessageToTheDriver(message);
        await expect($(page.messageToTheDriverField)).toHaveValue(message);
    })

    // Test 6
    it('should add a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveTariff();
        // Adding a blanket and handkerchiefs to the order
        await page.addBlanketAndHandkerchiefs();
        await expect($(page.blanketButtonStatus)).toBeChecked();
    })

    // Test 7
    it('should add 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveTariff();
        // Adding 2 ice creams to the order
        const iceCreamQty = 2;
        await page.addIceCream(iceCreamQty);
        await expect($(`div=${iceCreamQty}`)).toBeExisting();
    })

    // Test 8
    it('should start search for a taxi', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        // Searching for a car
        await page.placeOrder();
        await expect($(`${page.carSearchModal}`)).toBeExisting();
    })

    // Test 9.
    it('should find a driver with a driver message', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const message = "Waiting outside";
        await page.addMessageToTheDriver(message);
        await page.placeOrder();
        await expect($(`${page.driverWillArriveModal}`)).toBeExisting();
    })
})

