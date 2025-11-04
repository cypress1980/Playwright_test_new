Feature: Sauce Demo Purchase Flow

@smoke
Scenario: Complete purchase flow on Sauce Demo
    Given I am on the Sauce Demo login page
    When I login with valid credentials
    And I add a product to the cart
    And I open the cart
    And I proceed to checkout
    And I enter shipping information
    And I click continue
    And I click finish
    Then I should see the thank you message