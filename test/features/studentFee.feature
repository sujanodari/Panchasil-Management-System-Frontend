@view student fee details
Feature: View Student fee details
  As a student
  In order to access own profile
  I want to view fee 
  
  Scenario: View student fee details
   Given I am logged in student 
   When I click on profile
   Then I should see fee details "Fee Details"
