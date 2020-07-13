@search
Feature:View fee of class
  As a admin <user-type>
  In order to view fee in the application 
  I want to view fee
  
  Scenario: View fee
    Given I am admin logged in
    When I am on the  view fee page 
    Then I should see the "Tuition Fee: 1000"