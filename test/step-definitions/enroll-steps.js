module.exports = function () {
 
    this.Given(/^I am logged in Admin user$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on view enroll page$/, function () {
        return helpers.loadPage(page.enroll.url);
    });
    this.Then(/^I should see "([^"]*)" in the enroll$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/table/thead/tr/th[1]'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
   
};
