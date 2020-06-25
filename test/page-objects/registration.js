module.exports = {

    url: 'http://localhost:3000/register',

    elements: {
        searchInputEmail: by.name('email'),
        searchInputName: by.name('fullName'),
        searchInputGender: by.name('gender'),
        searchInputAddress: by.name('address'),
        searchInputDate: by.name('date'),
        searchInputContact: by.name('contactNumber'),
        searchInputParentName: by.name('parentName'),
        searchInputParentAddress: by.name('parentAddress'),
        searchInputParentContact: by.name('parentContact'),
        searchInputPet: by.name('securityAnswer'),
        searchInputUserType: by.name('userType'),
        searchInputPassword: by.name('password'),
        searchInputCitizen: by.name('citizenshipNo'),
       // registerButton: by.name('register')
    },
  
    userInput: function (userEmail,userName,userGender,userAddress,userDate,userContact,userParentName,userParentAddress,userParentContact,userPet,userType,userPassword,userCitizen) {

        var selectorEmail = page.registration.elements.searchInputEmail;
        var selectorName = page.registration.elements.searchInputName;
        var selectorGender = page.registration.elements.searchInputGender;
        var selectorAddress = page.registration.elements.searchInputAddress;
        var selectorDate = page.registration.elements.searchInputDate;
        var selectorContact = page.registration.elements.searchInputContact;
        var selectorParentName = page.registration.elements.searchInputParentName;
        var selectorParentAddress = page.registration.elements.searchInputParentAddress;
        var selectorParentContact = page.registration.elements.searchInputParentContact;
        var selectorPet = page.registration.elements.searchInputPet;
        var selectorUserType = page.registration.elements.searchInputUserType;
        var selectorPassword = page.registration.elements.searchInputPassword;
        var selectorCitizenId = page.registration.elements.searchInputCitizen;
      //  var selectorButton=page.registration.elements.registerButton;
       
        driver.findElement(selectorEmail).sendKeys(userEmail, selenium.Key.ENTER);
        driver.findElement(selectorName).sendKeys(userName, selenium.Key.ENTER);
        driver.findElement(selectorGender).sendKeys(userGender, selenium.Key.ENTER);
        driver.findElement(selectorAddress).sendKeys(userAddress, selenium.Key.ENTER);

        
       
        driver.findElement(selectorDate).sendKeys(userDate, selenium.Key.ENTER);

      
        driver.findElement(selectorContact).sendKeys(userContact, selenium.Key.ENTER);
        driver.findElement(selectorParentName).sendKeys(userParentName, selenium.Key.ENTER);
        driver.findElement(selectorParentAddress).sendKeys(userParentAddress, selenium.Key.ENTER);
        driver.findElement(selectorParentContact).sendKeys(userParentContact, selenium.Key.ENTER);
        driver.findElement(selectorPet).sendKeys(userPet, selenium.Key.ENTER);
        driver.findElement(selectorUserType).sendKeys(userType, selenium.Key.ENTER);
        driver.findElement(selectorPassword).sendKeys(userPassword, selenium.Key.ENTER);
        return driver.findElement(selectorCitizenId).sendKeys(userCitizen, selenium.Key.ENTER);
        // driver.findElement(selectorButton).click();
           
    }

    
};