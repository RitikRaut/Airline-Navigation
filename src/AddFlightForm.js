// AddFlightForm.js
import React, { useState } from 'react';

const AddFlightForm = ({ onSubmit }) => {
  const [flightName, setFlightName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFlight = {
      flightName,
      source,
      destination,
      ticketPrice: parseFloat(ticketPrice),
    };
    onSubmit(newFlight);
    // You can also reset form fields here
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
      <button type="submit">Add Flight</button>
    </form>
  );
};

export default AddFlightForm;
