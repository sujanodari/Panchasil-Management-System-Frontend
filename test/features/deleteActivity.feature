@search
Feature: Delete activity
  As a admin
  In order to delete activity 
  I want to delete activity
  
  Scenario: Delete activity
   Given I am on the delete activity page
   When I click on delete activity button
   Then I should not see the activity in the activity page
