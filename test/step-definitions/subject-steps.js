module.exports = function () {
 
    this.Given(/^I am logged in userType Admin$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("admin@gmail.com","admin1234");
    });
    this.When(/^I am on view subject page$/, function () {
        return helpers.loadPage(page.subject.url);
    });
    this.Then(/^I should see "([^"]*)" in the subject$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div[1]/div[2]/div/div/div[1]/div/div/a'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
     
   
   
};
