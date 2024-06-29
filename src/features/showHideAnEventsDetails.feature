Feature: Show/Hide Event Details

Scenario: As a user, I want event details to be collapsed by default
Given the user is viewing the events list
When they open the app
Then event details should be collapsed by default.

Scenario: As a user, I want to be able to expand an event to see its details
 Given the user is viewing an event with collapsed details
 When they click on the event
 Then the event details should expand to show more information.

Scenario: As a user, I want to be able to collapse an event to hide its details
 Given the user is viewing an event with expanded details
 When they click on the event again
 Then the event details should collapse to hide extra information.