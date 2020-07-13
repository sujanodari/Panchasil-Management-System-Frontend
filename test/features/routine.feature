@search
Feature: Routine
  As a registered and approved <user-type>
  In order to view in the application
  I want to view Routine
  
  Scenario: View Routine
   Given I am loggedin user
    When I am on view Routine page
    Then I should see "Delete Routine" in the routine