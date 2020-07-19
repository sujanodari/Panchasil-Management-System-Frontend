module.exports = {


    elements: {
        profileButton:by.xpath('/html/body/div/div/div[1]/nav/div/div[2]/a[1]/label'),
     
    },
  
    profile: function () {

        var selectorButton=page.studentFee.elements.profileButton;
        return driver.findElement(selectorButton).click();
           
    }

    
};