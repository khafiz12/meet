Feature: Specify Number of Events

Scenario: As a user, I want to see 32 events by default when I haven't specified a number
Given the user hasn't specified the number of events
When they access the app
Then 32 events should be displayed by default.

Scenario: As a user, I want to be able to change the number of events displayed
Given the user is viewing the events list
When they change the number of events to be displayed
Then the events list should update to show the specified number of events.