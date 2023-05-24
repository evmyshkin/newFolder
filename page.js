module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    phoneCodeField: '#code',
    cardNumberField: '#number',
    cardCodeField: '.card-second-row #code',
    messageToTheDriverField: '#comment',
    // Buttons
    supportiveTariff: 'div=Supportive',
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: 'div*=Phone number',
    paymentMethodButton: '.pp-text',
    nextButtonAddPhoneModal: 'button=Next',
    confirmButtonAddPhoneModal: 'button=Confirm',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    paymentMethodAddedCard: 'div=Card',
    paymentMethodModalCloseButton: '.payment-picker .section.active .close-button',
    blanketButton: '.switch',
    blanketButtonStatus: '.switch-input',
    iceCreamPlusButton: 'div=+',
    orderButton: '.smart-button-main=Order',
    // Modals
    phoneNumberModal: '.number-picker .modal',
    paymentMethodModal: '.payment-picker .modal',
    carSearchModal: 'div=Car search',
    driverWillArriveModal: 'div*=The driver will arrive',
    // Functions
    fillAddresses: async function (from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        
        const toField = await $(this.toField);
        await toField.setValue(to);

        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function (phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();

        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed();

        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);

        await browser.setupInterceptor();

        await $(this.nextButtonAddPhoneModal).click();
        await browser.pause(2000);

        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1);
        const code = await requests[0].response.body.code;

        const phoneCodeField = await $(this.phoneCodeField);
        await phoneCodeField.setValue(code);

        await $(this.confirmButtonAddPhoneModal).click();
    },
    selectSupportiveTariff: async function () {
        const supportiveTariff = await $(this.supportiveTariff);
        await supportiveTariff.waitForDisplayed();
        supportiveTariff.click();
        return supportiveTariff;
    },

    addPaymenMethodCard: async function (cardNumber, cardCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();

        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.setValue(cardNumber);

        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.setValue(cardCode);

        const paymentMethodModal = await $(this.paymentMethodModal);
        await paymentMethodModal.click();

        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();

        const paymentMethodModalCloseButton = await $(this.paymentMethodModalCloseButton);
        await paymentMethodModalCloseButton.click();
    },
    addMessageToTheDriver: async function (message) {
        const messageToTheDriverField = await $(this.messageToTheDriverField);
        await messageToTheDriverField.waitForDisplayed();
        messageToTheDriverField.setValue(message);
    },
    addBlanketAndHandkerchiefs: async function () {
        const blanketButton = await $(this.blanketButton);
        await blanketButton.waitForDisplayed();
        await blanketButton.click();
    },
    addIceCream: async function (qty) {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        for (i = 0; i < qty; i++) {
            await iceCreamPlusButton.click();
        }
    },
    placeOrder: async function () {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
    }
};