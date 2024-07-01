import React, { useState } from 'react';

const NumberOfEvents = ({ eventsPerPage, setErrorAlert }) => {
  const [eventCount, setEventCount] = useState(eventsPerPage);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventCount(value);

    if (isNaN(value) || value <= 0 ) {
        setErrorAlert('Please enter a valid number of events.');
    } else{ 
        setErrorAlert("");
    }
  };

  return (
    <div id="number-of-events">
      <input
        type="number"
        className="events-per-page"
        value={eventCount}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;