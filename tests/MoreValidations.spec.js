const {test, expect} = require('@playwright/test')

test("Popup validations", async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("http://google.com")
    // await page.goBack()
    // await page.goForward()

    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()
    await page.locator("#confirmbtn").click()
    page.on('dialog', dialog => dialog.accept())       //okno dialogowe   || cancel- .dismiss()
                                            // pierw rejestrujemy akcje a potem otwieramy okno

    await page.locator("#mousehover").hover()      // metoda najechania kursorem na element

    const framesPage = page.frameLocator("#courses-iframe")
    framesPage.locator("li a[href*='lifetime-access']:visible").click()  // kliknie tylko w     widoczny element

    const textCheck = await framesPage.locator(".text h2").textContent()
    console.log(textCheck.split(" ")[1]);


                                                                        
                                                                        




    



})