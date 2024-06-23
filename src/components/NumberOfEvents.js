import React, { useState } from 'react';

const NumberOfEvents = ({ eventsPerPage }) => {
  const [eventCount, setEventCount] = useState(eventsPerPage);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setEventCount(value);
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