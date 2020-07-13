module.exports = function () {
 
    this.Given(/^I am loggedin user$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on view Routine page$/, function () {
        return helpers.loadPage(page.routine.url);
    });
    this.Then(/^I should see "([^"]*)" in the routine$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div/div/div[2]/p/button[1]'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
   
};
