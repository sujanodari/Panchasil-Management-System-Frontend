@search
Feature: Enroll Students/Staff
  As a registered and approved <user-type>
  In order to enroll students/staff in the application
  I want to view enroll students/staff
  
  Scenario: View enroll students/staff
   Given I am logged in Admin user
    When I am on view enroll page
    Then I should see "EnrollId" in the enroll