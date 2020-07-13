@search
Feature: Search Students/Staff
  As a registered and approved <user-type>
  In order to view students/staff in the application
  I want to search enroll students/staff
  
  Scenario: search students/staff
   Given I am logged in Admin user-type
    When I am on view search page and I choose "fullname" and I enter "ram"
    Then I should see "Enroll" in the search