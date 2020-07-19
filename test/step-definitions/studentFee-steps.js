module.exports = function () {

    this.Given(/^I am logged in student$/, function () {
        helpers.loadPage(page.login.url);
        return page.login.userInput("student@gmail.com", "123456");
        // load panchasil

    });
    this.When(/^I click on profile$/, function () {


        return page.studentFee.profile();
    });


    this.Then(/^I should see fee details "([^"]*)"$/, function (expectedText) {

        return driver.findElement(by.xpath('/html/body/div/div[2]/div/div[2]/div[1]/div[2]/div[1]'))
            .getText().then(textValue => {
                assert.equal(expectedText, textValue);
            });

    });


};