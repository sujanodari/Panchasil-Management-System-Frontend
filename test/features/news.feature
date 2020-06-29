@search
Feature: View news
  As a registered and approved <user-type>
  In order to view news in the application
  I want to view news
  
  Scenario: View news
   Given I am logged in userType
    When I am on view news page
    Then I should see "Posted By:" in the news