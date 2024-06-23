import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api'; // Assuming this is where you fetch events data

// Mock data for events
const mockEvents = [
  {
    id: '1',
    summary: 'Mock Event 1',
    created: '2024-06-30T10:00:00Z',
    location: 'Mock Location 1',
  },
  // Add more mock events as needed
];

describe('<Event /> component', () => {
  let events;

  beforeEach(async () => {
    jest.clearAllMocks(); // Clear all previous mock calls to ensure clean state
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockEvents,
    });
    
    events = await getEvents(); // Fetch events (mocked)
  });

  test('renders event information correctly', () => {
    // Use the first event from mocked events
    const event = events[0];

    // Render Event component and perform assertions
    const { queryByText, getByText } = render(<Event event={event} />);

    // Assert that event summary, location, and button are in the document
    expect(queryByText(event.summary)).toBeInTheDocument();
    expect(queryByText(`Created: ${event.created}`)).toBeInTheDocument();
    expect(queryByText(`Location: ${event.location}`)).toBeInTheDocument();

    // Use getByText for the button
    const showDetailsButton = getByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
  });

  test('renders event details when show details button is clicked', () => {
    const event = events[0];
    const { getByText, queryByText } = render(<Event event={event} />);

    // Initially details section should not be visible
    expect(queryByText('Details:')).not.toBeInTheDocument();

    // Simulate clicking on show details button
    const showDetailsButton = getByText('Show Details');
    fireEvent.click(showDetailsButton);

    // Assert that details section is now visible
    expect(queryByText('Details:')).toBeInTheDocument();
    // Add more assertions for detailed content visibility if needed
  });
  test('hides event details when hide details button is clicked', () => {
    const event = events[0];
    const { getByText, queryByText } = render(<Event event={event} />);

    // Simulate clicking on show details button to show the details
    const showDetailsButton = getByText('Show Details');
    fireEvent.click(showDetailsButton);

    // Assert that details section is visible
    expect(queryByText('Details:')).toBeInTheDocument();

    // Simulate clicking on hide details button
    const hideDetailsButton = getByText('Hide Details');
    fireEvent.click(hideDetailsButton);

    // Assert that details section is no longer visible
    expect(queryByText('Details:')).not.toBeInTheDocument();
  });
});