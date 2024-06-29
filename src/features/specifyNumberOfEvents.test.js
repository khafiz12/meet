import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { render, within, screen, waitFor } from '@testing-library/react';
import { getEvents } from '../mock-data';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');
defineFeature(feature, test => { 
    test('As a user, I want to see 32 events by default when I haven\'t specified a number', 
        ({ given, when, then }) => {
            let AppComponent;
    	given('the user hasn\'t specified the number of events', () => {
//no action needed, just an initial state//
    	});

    	when('they access the app',  () => {
  
         })
         AppComponent = render(<App />);


    	then( '32 events should be displayed by default.', async () => {
            const eventList = await waitFor(() => AppComponent.container.querySelector('#event-list'));
            const events = eventList.querySelectorAll('li');
            expect(events.length).toBe[32];
    	});
    
});
    test('As a user, I want to be able to change the number of events displayed', 
        ({ given, when, then }) => {
            let AppComponent;
    	given('the user is viewing the events list', async() => {
            AppComponent = render(<App />);
            await waitFor(() => AppComponent.container.querySelector('#event-list'));
    	});

    	when('they change the number of events to be displayed', async () => {
            const numberInput = AppComponent.container.querySelector('.events-per-page'); // Change here
            userEvent.clear(numberInput);
            userEvent.type(numberInput, '10');
    	});

    	then('the events list should update to show the specified number of events.', async () => {
            const eventList = await waitFor(() => AppComponent.container.querySelector('#event-list'));
            const events = eventList.querySelectorAll('li');
            expect(events.length).toBe[10];
    	});
    
    });
});