module.exports = {

    url: 'http://localhost:3000/admin',

    elements: {
        approveButton: by.id('approve')
    },
  
    userApprove: function () {

        var selectorButton=page.approve.elements.approveButton;
        return driver.findElement(selectorButton).click();
           
    }

    
};