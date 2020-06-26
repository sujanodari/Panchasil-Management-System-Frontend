module.exports = function () {
 
    this.Given(/^I am on the admin approve page$/, function () {
        helpers.loadPage(page.login.url);
        page.login.userInput("sujan@gmail.com","admin1234");
        // load panchasil
        return helpers.loadPage(page.approve.url);
    });
    this.When(/^I click approve$/, function () {

   
        return page.approve.userApprove();
    });
    this.Then(/^I should not see the user$/, function () {
       return driver.navigate().refresh();
     });
   
     
};
