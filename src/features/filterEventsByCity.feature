Feature: Filter events by city
Scenario: When user hasn’t searched for a city, show upcoming events from all cities
 Given the user hasn't searched for any city
 When they access the app
 Then upcoming events from all cities should be displayed.

Scenario:  User should see a list of suggestions when they search for a city
 Given the user is typing in the search bar
 When they type at least one character
 Then a list of suggested cities should be displayed.

Scenario: User can select a city from the suggested list
 Given the user has typed in a city in the search bar
 And the list of suggested cities is showing
 When they select a city from the suggested list
 Then events for the selected city should be displayed.
 And the user should receive a list of upcoming events in that city.