module.exports = function () {
 
    this.Given(/^I am logged in Admin user-type$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on view search page and I choose "([^"]*)" and I enter "([^"]*)"$/, function (type,search) {
        // return helpers.loadPage(page.search.url);
        return  page.search.userInput(type,search);
    });
    this.Then(/^I should see "([^"]*)" in the search$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div[1]/div/div[4]/div/div/div/div[2]/p/div/div/div/table/tbody/tr/td[6]/a'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
     
   
   
};
