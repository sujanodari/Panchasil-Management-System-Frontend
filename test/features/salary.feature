@salary
Feature: View salary
  As a registered and approved <staff>
  In order to view salary in the application
  I want to view salary
  
  Scenario: View salary
   Given I am logged in staff
    When I am on view profile page
    Then I should see salary "9000000"