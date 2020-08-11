module.exports = async function () {
  this.Given(/^I am on the delete activity page$/, async function () {
    // await new Promise(r => setTimeout(r, 5000));
    helpers.loadPage(page.login.url);
    // await new Promise(r => setTimeout(r, 5000));
    page.login.userInput("baxanacharya@gmail.com", "baxan1234");
    // await new Promise(r => setTimeout(r, 5000));
    // load panchasil
    return helpers.loadPage("http://localhost:3000/staff/viewactivities");
  });
  this.When(/^I click on delete activity button$/, async function () {
    helpers.loadPage("http://localhost:3000/staff/viewactivities");
    await new Promise((r) => setTimeout(r, 10000));
    return driver.findElement(By.id("mydelete")).click();
  });
  this.Then(
    /^I should not see the activity in the activity page$/,
    function () {
      return driver.navigate().refresh();
    }
  );
};
