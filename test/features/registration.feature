@search
Feature: Register in Panchasil
  As a part of institution
  In order to login to the application
  I want to register
  
  Scenario: user registeration vaidation test
    Given I am on the Panchasil Registration page
    When I enter "odarisujan@gmail.com" and I enter "Sujan Odari" and I enter "Male" and I enter "Damak" and I enter "08/24/2000" and I enter "9817091757" and I enter "Sujan Odari" and I enter "Damak" and I enter "9800987689" and I enter "Cat" and I enter "Student" and I enter "sujan1234" and I enter "sujan098"
    Then I should see "The date field is required."