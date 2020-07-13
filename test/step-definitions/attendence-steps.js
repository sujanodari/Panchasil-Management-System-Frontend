module.exports = function () {
 
    this.Given(/^I am logged in staff user$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("baxanacharya@gmail.com","baxan1234");
    });
    this.When(/^I am on attendence page and click add button$/, function () {
         helpers.loadPage("http://localhost:3000/staff/attendence");
         return  driver.findElement(by.name('addAttendence')).click();
    });
    this.Then(/^I should see "([^"]*)" in the attendence page$/, function (expectedText) {
        return driver.findElement(By.xpath('/html/body/div/div[2]/div/table/thead/tr/th[3]'))
        .getText().then(textValue => {
          assert.equal(expectedText, textValue);
        });
     });
   
};
