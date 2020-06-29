module.exports = function () {
 
    this.Given(/^I am logged in user$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on view notice page$/, function () {
        return helpers.loadPage(page.notice.url);
    });
    this.Then(/^I should see "([^"]*)" in the notice$/, function (expectedText) {
        return driver.findElement(By.name('posted'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
     
   
     
};
