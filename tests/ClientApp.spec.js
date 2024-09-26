const {test, expect} = require('@playwright/test')

test('Browser Contex Playwright test', async ({page})=>
{     

      const productName = 'ZARA COAT 3'
      const products = page.locator(".card-body")
      const email = "anshika@gmail.com"

      await page.goto("https://rahulshettyacademy.com/client")
      await page.locator("#userEmail").fill(email)
      await page.locator("#userPassword").fill("Iamking@000")
      await page.locator("[value='Login']").click()
      await page.waitForLoadState('networkidle')
      const titles = await page.locator(".card-body b").allTextContents()
      console.log(titles)
      const count = await products.count();
      for(let i =0; i < count; ++i)
      {
      if(await products.nth(i).locator("b").textContent() === productName)
      {
            //add product to cart
            await products.nth(i).locator("text= Add To Cart").click()
            break
       }
      }   
      
      await page.locator("[routerlink='/dashboard/cart']").click()
      await page.locator("div li").first().waitFor() // czekamy az sie załaduje 

      const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
      //.isVisible() nie jest wspierane przez autowait (dokumentacja)

      expect(bool).toBeTruthy()
      await page.locator("text=Checkout").click()

      //wpisywanie powoli 3 pierwszych liter aby móc wybrac proponowane z listy
      await page.locator("[placeholder*='Country']").pressSequentially("ind")
      const dropdown = page.locator(".ta-results")
      await dropdown.waitFor()
      const optionsCount = await dropdown.locator("button").count()
      for(let i =0; i< optionsCount; ++i)
      {
            const text = await dropdown.locator("button").nth(i).textContent()
            if(text.trim() === "India")    //trim usuwa spacje
            {
                  await dropdown.locator("button").nth(i).click()
                  break;
            }
      }
      expect(page.locator(".user__name [type='text']").first())
      .toHaveText(email)
      await page.locator(".action__submit").click()

      // const thankYou = page.locator("hero-primary")
      await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
      const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
      console.log(orderId);

      
      await page.locator("button[routerlink*='myorders']").click()
      await page.locator("tbody").waitFor() // wyczekiwanie na załadowanie !!!!!!!!!!!!!!!!!!

      const rows = await page.locator("tbody tr")

      for (let i = 0; i< await rows.count(); ++i) 
      {
            // Pobierz tekst z pierwszej kolumny (numer zamówienia)
            const rowOrderId = await rows.nth(i).locator("th").textContent()
            
            // Sprawdź, czy numer zamówienia zgadza się z oczekiwanym orderId
            if (orderId.includes(rowOrderId))
            {
                  await rows.nth(i).locator("button").first().click()
                  break

            }
      }
      const orderIdDetails = await page.locator(".col-text").textContent()
      expect(orderId.includes(orderIdDetails)).toBeTruthy()
      
      
      
      
      await page.pause()
      
      
      


})
