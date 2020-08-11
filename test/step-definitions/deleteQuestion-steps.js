module.exports = async function () {
  this.Given(/^I am on the delete question bank page$/, async function () {
    // await new Promise(r => setTimeout(r, 5000));
    helpers.loadPage(page.login.url);
    // await new Promise(r => setTimeout(r, 5000));
    page.login.userInput("baxanacharya@gmail.com", "baxan1234");
    // await new Promise(r => setTimeout(r, 5000));
    // load panchasil
    return helpers.loadPage("http://localhost:3000/staff/retrieveQuestion");
  });
  this.When(/^I click delete$/, async function () {
    helpers.loadPage("http://localhost:3000/staff/retrieveQuestion");
    await new Promise((r) => setTimeout(r, 10000));
    return driver.findElement(By.id("mybtn")).click();
  });
  this.Then(/^I should not see the QuestionBank$/, function () {
    return driver.navigate().refresh();
  });
};
