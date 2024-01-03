import React, { useState, useEffect } from 'react';
import AddFlightForm from '/Users/ritikraut/Desktop/airline-frontend/src/AddFlightForm.js';
import UpdateFlightForm from '/Users/ritikraut/Desktop/airline-frontend/src/UpdateFlightForm.js';
import './App.css'
function App() {
  const [flights, setFlights] = useState([]);
  const [flightToUpdate, setFlightToUpdate] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [showAddFlightForm, setShowAddFlightForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:9000/flight/');
      if (!response.ok) {
        throw new Error(`Failed to fetch flights. Status: ${response.status}`);
      }
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      setError(`Error fetching flights: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClick = async (flightId) => {
    const response = await fetch(`http://localhost:9000/flight/${flightId}`);
    const data = await response.json();
    setFlightToUpdate(data);
    setIsUpdateMode(true);
  };

  const handleDeleteClick = async (flightId) => {
    await fetch(`http://localhost:9000/flight/${flightId}`, {
      method: 'DELETE',
    });
    fetchFlights();
  };

  const handleAddClick = () => {
    setIsUpdateMode(false);
    setFlightToUpdate({});
    setShowAddFlightForm(true);
  };

  const handleAddOrUpdate = async (newFlight) => {
    try {
      if (isUpdateMode) {
        await fetch(`http://localhost:9000/flight/${flightToUpdate.flightId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFlight),
        });
      } else {
        await fetch('http://localhost:9000/flight/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFlight),
        });
      }
      fetchFlights();
    } catch (error) {
      setError(`Error adding/updating flight: ${error.message}`);
    } finally {
      setShowAddFlightForm(false);
    }
  };

  return (
    <div className="App">
      <h1>Airline Navigation Bar</h1>
      <div>
        <div>
          <h2>Flights</h2>
          {isLoading ? (
            <p>Loading flights...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Flight ID</th>
                  <th>Flight Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Ticket Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.flightId}>
                    <td>{flight.flightId}</td>
                    <td>{flight.flightName}</td>
                    <td>{flight.source}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.ticketPrice}</td>
                    <td>
                      <button onClick={() => handleUpdateClick(flight.flightId)}>Update</button>
                      <button onClick={() => handleDeleteClick(flight.flightId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          <button onClick={handleAddClick}>Add Flight</button>
          {showAddFlightForm && <AddFlightForm onSubmit={handleAddOrUpdate} />}
        </div>
      </div>
      {isUpdateMode && (
        <div>
          <h2>{isUpdateMode ? 'Update Flight' : 'Add Flight'}</h2>
          <UpdateFlightForm flight={flightToUpdate} onSubmit={handleAddOrUpdate} />
        </div>
      )}
    </div>
  );
}

export default App;
