module.exports = function () {
    this.Given(/^I am on the Panchasil Registration page$/, function () {

        // load panchasil
        return helpers.loadPage(page.registration.url);
    });

    this.When(/^I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)" and I enter "([^"]*)"$/, function (userEmail,userName,userGender,userAddress,userDate,userContact,userParentName,userParentAddress,userParentContact,userPet,userType,userPassword,userCitizen) {
        // Write code here that turns the phrase above into concrete actions
        return page.registration.userInput(userEmail,userName,userGender,userAddress,userDate,userContact,userParentName,userParentAddress,userParentContact,userPet,userType,userPassword,userCitizen);
    
      });

      // this.Then(/^I should be in login page$/, function (callback) {
      //   // Write code here that turns the phrase above into concrete actions
      //   //callback(null, 'pending');
      // }); 
          this.Then(/^I should see "([^"]*)"$/, function (expectedText) {
            return driver.findElement(By.name('errDate'))
            .getText().then(textValue => {
              assert.equal(expectedText, textValue);
            });
        });
       
};
