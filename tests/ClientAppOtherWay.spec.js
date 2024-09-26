const {test, expect} = require('@playwright/test')

test('Browser Contex Playwright test', async ({page})=>
{     

      const productName = 'ZARA COAT 3'
      const products = page.locator(".card-body")
      const email = "anshika@gmail.com"

      await page.goto("https://rahulshettyacademy.com/client")
      await page.getByPlaceholder("email@example.com").fill(email) // to co jest juz w oknie
      await page.getByPlaceholder("enter your passsword").fill("Iamking@000")
      await page.getByRole('button', {name:"Login"}).click()
      await page.waitForLoadState('networkidle')
      
      await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
      .getByRole("button", {name:"Add to Cart"}).click()

      // const count = await products.count();
      // for(let i =0; i < count; ++i)
      // {
      // if(await products.nth(i).locator("b").textContent() === productName)
      // {
      //       //add product to cart
      //       await products.nth(i).locator("text= Add To Cart").click()
      //       break
      //  }
      // }   
      
      await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click() //zwracac uwage na to ze w innych przyciskach tez moze byc 'Cart'

      await page.locator("div li").first().waitFor() // czekamy az sie załaduje 
      await expect(page.getByText("ZARA COAT 3")).toBeVisible()
      //.isVisible() nie jest wspierane przez autowait (dokumentacja)

      await page.getByRole("button", {name : "Checkout"}).click()

      //wpisywanie powoli 3 pierwszych liter aby móc wybrac proponowane z listy
      await page.getByPlaceholder("Select Country").pressSequentially("ind")
      
      await page.getByRole("button", {name : "India"}).nth(1).click()

      await page.getByText("PLACE ORDER").click()

      await expect(page.getByText("Thankyou for the order.")).toBeVisible()




      
})