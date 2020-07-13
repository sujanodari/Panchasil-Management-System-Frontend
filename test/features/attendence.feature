@attendence
Feature: Add attendence of students
  As a registered and approved staff
  In order to add  attendence
  I want to add  students attendence
  
  Scenario: Add attendence of students
   Given I am logged in staff user
    When I am on attendence page and click add button
    Then I should see "Attendence" in the attendence page