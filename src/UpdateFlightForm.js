// UpdateFlightForm.js
import React, { useState, useEffect } from 'react';

const UpdateFlightForm = ({ flight, onSubmit }) => {
  const [flightName, setFlightName] = useState(flight.flightName);
  const [source, setSource] = useState(flight.source);
  const [destination, setDestination] = useState(flight.destination);
  const [ticketPrice, setTicketPrice] = useState(flight.ticketPrice);

  useEffect(() => {
    setFlightName(flight.flightName);
    setSource(flight.source);
    setDestination(flight.destination);
    setTicketPrice(flight.ticketPrice);
  }, [flight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFlight = {
      ...flight,
      flightName,
      source,
      destination,
      ticketPrice: parseFloat(ticketPrice),
    };
    onSubmit(updatedFlight);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Flight Name:
        <input type="text" value={flightName} onChange={(e) => setFlightName(e.target.value)} />
      </label>
      <br />
      <label>
        Source:
        <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
      </label>
      <br />
      <label>
        Destination:
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
      </label>
      <br />
      <label>
        Ticket Price:
        <input type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
      </label>
      <br />
      <button type="submit">Update Flight</button>
    </form>
  );
};

export default UpdateFlightForm;
