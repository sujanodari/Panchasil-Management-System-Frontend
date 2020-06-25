@search
Feature: Login in Panchasil
  As a registered and approved <user-type>
  In order to login to the application
  I want to be able to acess <user-type> dashboard
  
  Scenario: Login for registered and approved user
   Given I am on the Panchasil Login page
    When I enter "baxanacharya@gmail.com" and I enter "baxan1234" and I click login
    Then I should see "Welcome" in the results