@search
Feature: View subject
  As a registered and approved <user-type>
  In order to view subject in the application
  I want to view subject
  
  Scenario: View subject
   Given I am logged in userType Admin
    When I am on view subject page
    Then I should see "Add Subjects for class" in the subject