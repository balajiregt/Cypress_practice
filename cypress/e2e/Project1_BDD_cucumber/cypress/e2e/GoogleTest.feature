Feature: Google Main Page

  I want to test whether search results are fetched or not
  
 
  Scenario: Opening a search engine page
    Given I open Google page & I validate the Search button attributees
    When Enter some text in the search field and click enter
    And I finally verify search results are returned or not

  Scenario: Action within the search results page
   Then Verify that by default the 'All' tab is selected, Verify the color property is blue
   Then Verify the 'Tool' button and the dynamic filters 'AnyTime', 'All results'
  