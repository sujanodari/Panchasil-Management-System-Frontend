@search
Feature: View notice
  As a registered and approved <user-type>
  In order to view notice in the application
  I want to view notice
  
  Scenario: View notice
   Given I am logged in user
    When I am on view notice page
    Then I should see "Posted By:" in the notice