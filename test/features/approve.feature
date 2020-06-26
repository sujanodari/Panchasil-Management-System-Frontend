@search
Feature: Approve User
  As a admin
  In order to approve user
  I want to approve user
  
  Scenario: Approve user
   Given I am on the admin approve page
   When I click approve
   Then I should not see the user
