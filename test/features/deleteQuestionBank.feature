@search
Feature: Delete QuestionBank
  As a admin
  In order to delete question bank user
  I want to delete question bank
  
  Scenario: Delete QuestionBank
   Given I am on the delete question bank page
   When I click delete
   Then I should not see the QuestionBank
