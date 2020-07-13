 module.exports = {
   // url: 'http://localhost:3000/admin'

   elements: {
      searchInputType: by.xpath('/html/body/div[1]/div/div[4]/div/div/div/div[1]/div[1]/div/div[1]/div/select'),
      searchInputSearch: by.xpath('/html/body/div[1]/div/div[4]/div/div/div/div[1]/div[1]/div/div[2]/div/input'),
  },

  userInput: function (type,search){
   var selectorType = page.search.elements.searchInputType;
    var selectorSearch = page.search.elements.searchInputSearch;
    driver.findElement(selectorType).sendKeys(type, selenium.Key.ENTER);
    driver.findElement(selectorSearch).sendKeys(search, selenium.Key.ENTER);
      return  driver.findElement(selectorType).sendKeys(type, selenium.Key.ENTER);
      
   
  }

 }
