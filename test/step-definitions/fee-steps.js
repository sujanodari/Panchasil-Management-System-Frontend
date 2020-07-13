module.exports = function () {
 
    this.Given(/^I am admin logged in$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on the  view fee page$/, function () {
        return helpers.loadPage(page.fee.url);
    });
    this.Then(/^I should see the "([^"]*)"$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div/div[2]/div/div[1]/div/div[2]/p/p[2]'))
        .getText().then(textValue => 
         assert.equal(expectedText, textValue)
        );
     });
     
   
     
};