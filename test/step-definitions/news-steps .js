module.exports = function () {
 
    this.Given(/^I am logged in userType$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on view news page$/, function () {
        return helpers.loadPage(page.news.url);
    });
    this.Then(/^I should see "([^"]*)" in the news$/, function (expectedText) {
        return driver.findElement(By.name('posted'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
     
   
     
};
