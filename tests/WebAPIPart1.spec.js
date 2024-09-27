const { test, expect, request } = require('@playwright/test'); // + request (for API)
const {APiUtils} = require('./utils/APiUtils');      //import
const loginPayLoad = {
	userEmail: 'anshika@gmail.com',
	userPassword: 'Iamking@000',
};

const orderPayLoad = {
	orders: [{country: "Poland", productOrderedId: "6581ca399fd99c85e8ee7f45"}]
};

let response;
test.beforeAll(async () => {
	// run before all tests

    // Login API
	const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)
	

})

test.beforeEach(() => {

});

test('Place the order', async ({ page }) => 
{
    

    page.addInitScript(value => {
		window.localStorage.setItem('token', value);
	}, response.token );

	// const email = "anshika@gmail.com";
	// const productName = 'ZARA COAT 3';
	await page.goto('https://rahulshettyacademy.com/client/');
	await page.locator("button[routerlink*='myorders']").click();
	await page.locator('tbody').waitFor(); // wyczekiwanie na załadowanie !!!!!!!!!!!!!!!!!!
	const rows = await page.locator('tbody tr');

	for (let i = 0; i < (await rows.count()); ++i) {
		// Pobierz tekst z pierwszej kolumny (numer zamówienia)
		const rowOrderId = await rows.nth(i).locator('th').textContent();
		// Sprawdź, czy numer zamówienia zgadza się z oczekiwanym orderId
		if (response.orderId.includes(rowOrderId)) 
		{
			await rows.nth(i).locator('button').first().click();
			break;
		}
	}
	const orderIdDetails = await page.locator('.col-text').textContent();
	expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

	await page.pause();
    
})   
