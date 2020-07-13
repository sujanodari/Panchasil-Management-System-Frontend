module.exports = function () {
 
    this.Given(/^I am logged in staff$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("maheshwar@gmail.com","maheshwar@123");
    });
    this.When(/^I am on view profile page$/, function () {
        return helpers.loadPage(page.salary.url);
    });
    this.Then(/^I should see salary "([^"]*)"$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div/div[2]/div/div[1]/div/div[2]/p/div/div/div[2]/p[4]/b'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
};
