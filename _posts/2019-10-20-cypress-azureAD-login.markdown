---
layout: post
title: Login to Azure AD using cypress 
date: 2019-10-20 16:38:20 +0300
description: Login to Azure AD using cypress. # Add post description (optional)
img:  # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [cypress, azure, office365, puppeteer]
---

### Problem :
I have a requirement to automate  azure ad login using cypress. Requirement is when user navigated to site-P it will redirect to azure AD login page where user has to enter login details and they will get redirected to site-P once login is successful. By design cypress doesn't allow this because of many reasons as described [here](https://docs.cypress.io/guides/references/best-practices.html#Visiting-external-sites). I am not going to discuss good and bad about this here [as it’s a vast topic on its own!] but can show you how I managed to workaround this problem.   

### Solution :

#### Approach 
After completing login process user will be redirected to my site and there will be couple of cookies added to site at this point [this might be different for different sites!], which will be used for any further authentication on site. So if I can get those cookies and add it to browser before starting cypress tests all should work [in theory]

#### How to do it ?

Use `puppeteer` to complete the Azure login and extract cookies. [i am using puppeteer because it looks simple to me but any ui automation tool should do it]

1.Install puppeteer using `npm install puppeteer`.

2.Create a `GetCookies.js` file in support folder.

3.Add below code to `GetCookies.js` which will login to Azure and extract cookies to `cookies.json` file.

```javascript
const puppeteer = require("puppeteer"); 
const test_file = require("fs"); 
puppeteer .launch({headless: true, chromeWebSecurity: false, args: ['--no-sandbox'] }).then(async browser => { 
    const page = await browser.newPage(); 
    await page.goto("{site-url"); 
    await page.waitFor(2000); 
    await page.waitForSelector('input[name=loginfmt]'); 
    await page.type("input[name=loginfmt]", "test123", {applyDelay: 50 }); 
    await page.waitForSelector("input[type=submit]"); 
    await page.click("input[type=submit]"); 
    await page.waitFor(2000); 
    await page.waitForSelector("input[name=passwd]"); 
    await page.click("input[name=passwd]"); 
    await page.type("input[name=passwd]", "test123", {applyDelay: 50}); 
    await page.waitForSelector("input[type=submit]"); 
    await page.click("input[type=submit]"); 
    await page.waitFor(2000); 
    await page.click("input[type=submit]"); 
    await page.waitFor(2000); 
    await page.waitForSelector("h3") 
    const cookiesFromPage = await page.cookies(); 
      let cookies = []; 
      for (let cookie of cookiesFromPage) { 
        let coo = {}; 
        coo.name = cookie.name; 
        coo.value = cookie.value; 
        coo.domain = cookie.domain; 
        coo.path  = cookie.path; 
        coo.expires = cookie.expires; 
        coo.size = cookie.size; 
        coo.httpOnly = cookie.httpOnly; 
        cookies.push(coo); 
      } 
    test_file.writeFileSync( "cookies.json", JSON.stringify(cookies)); 
    browser.close(); 
  }); 

function applyDelay(time) { 
return new Promise(function (resolve) {setTimeout(resolve, time);}); 
} 
```

4.We need to add cookies to browser before starting cypress tests, add below function to `support/commands.js` which will add cookies to browser.

```javascript
Cypress.Commands.add("loadCookies", () => { 
  cy.clearLocalStorage();
  return cy.fixture("cookies.json").then(data => { 
    for (let cookie of data) { 
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain, 
        path: cookie.path, 
        expiry: cookie.expires, 
        httpOnly: cookie.httpOnly 
      }); 
    } 
  }); 
}); 
```

5.Call load cookies command in `beforeEach` so that cookies will be loaded before test.

```javascript 
describe('Azure login', () => { 
  beforeEach(() => { 
    cy.loadCookies(); 
    cy.visit('/'); 
  }); 

  it('Test Home page', () => { 
      // this should work! 
    }); 
```

6.Finally we have to make sure that puppeteer script runs before starting cypress tests. Add below scripts to `package.json` to run puppeteer and cypress in sequential order 

```javascript
"scripts": { 
"get-cookies": "node cypress/support/getCookies.js && mv cookies.json cypress/fixtures",
"runTests": "npm run get-cookies && cypress run"
}
```

7.Now run `npm run runTests` [if you are lucky everything will work :)]