const {test, expect} = require('@playwright/test')

test('Browser Contex Playwright test', async ({browser})=>
{
      const context = await browser.newContext()
      const page = await context.newPage();
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
      console.log(await page.title())

      const userName = page.locator("#username");
      const password = page.locator("#password");
      const signIn = page.locator("#signInBtn");
      const cardTitles = page.locator(".card-body a")

      await userName.fill("rahulshetty")
      await password.fill("learning")
      await signIn.click()
      console.log(await page.locator("[style*='block']").textContent())
      await expect(page.locator("[style*='block']")).toContainText('Incorrect')

      await userName.fill("")
      await userName.fill("rahulshettyacademy")
      await signIn.click()
      // await page.waitForLoadState('networkidle')
      // console.log(await cardTitles.first().textContent()); 
      // console.log(await cardTitles.nth(1).textContent()); 

      await cardTitles.last().waitFor()

      const allTitles = await cardTitles.allTextContents()
      console.log(allTitles)


    
})


test('UI Controls', async({page})=>
{
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
      const userName = page.locator("#username")
      const signIn = page.locator("#signInBtn")
      const documentLink = page.locator("[href*='documents-request']")
      const dropdown = page.locator("select.form-control")
      await dropdown.selectOption("consult")
      await page.locator(".radiotextsty").last().click()
      await page.locator("#okayBtn").click()
      // assertion
      console.log(await page.locator(".radiotextsty").last().isChecked())
      await expect(page.locator(".radiotextsty").last()).toBeChecked()

      await page.locator("#terms").click()
      await expect( page.locator("#terms")).toBeChecked()
      await page.locator("#terms").uncheck()
      expect(await page.locator("#terms").isChecked()).toBeFalsy()

      await expect(documentLink).toHaveAttribute("class","blinkingText")

      // await page.pause();
})

test('Child windows handl', async ({browser})=> 
{

      const context = await browser.newContext()
      const page = await context.newPage();
      const userName = page.locator("#username")
      await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
      const documentLink = page.locator("[href*='documents-request']")
      
      const [newPage] = await Promise.all([

         context.waitForEvent('page'), //listen for any new page pending,rejected,fulfilled
         documentLink.click(),
      ]) // new page is opened

      const text = await newPage.locator(".red").textContent()
      const arrayText = text.split("@")
      const domain = arrayText[1].split(" ")[0] // downloading the selected text
      console.log(domain)
      await page.locator("#username").fill(domain)
      // await page.pause()
      console.log(await page.locator("#username").textContent()) 



})    
