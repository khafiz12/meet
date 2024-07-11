import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li>
      <div className="event">
        <div className="event-summary">{event.summary}</div>
        <div className="event-created">Created: {event.created}</div>
        <div className="event-location">Location: {event.location}</div>
        <button onClick={toggleDetails} className="show-details">
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        {showDetails && (
          <div className="details">
            <p>Details:</p>
            {/* Additional details content here */}
          </div>
        )}
      </div>
    </li>
  );
};

export default Event;
