// App.js (React Frontend)
import React, { useState, useEffect } from 'react';
import './App.css'; // Optional CSS for styling

function App() {
  // States for telemetry data and UI controls
  const [telemetry, setTelemetry] = useState({});
  const [loggingStatus, setLoggingStatus] = useState('Not Started');
  const [velocitySelect, setVelocitySelect] = useState('MPH');

  // Fetch telemetry data from the backend
  const fetchTelemetry = async () => {
    const response = await fetch('http://localhost:5000/api/telemetry');
    const data = await response.json();
    setTelemetry(data);
  };

  // Fetch logging status from the backend
  const fetchLoggingStatus = async () => {
    const response = await fetch('http://localhost:5000/api/logging-status');
    const data = await response.json();
    setLoggingStatus(data.status);
  };

  // Toggle speed units (MPH <-> KPH)
  const changeUnits = async () => {
    const response = await fetch('http://localhost:5000/api/change-units', { method: 'POST' });
    const data = await response.json();
    setVelocitySelect(data.velocitySelect);
  };

  // Start logging
  const startLogging = async () => {
    const response = await fetch('http://localhost:5000/api/start-logging', { method: 'POST' });
    const data = await response.json();
    setLoggingStatus(data.status);
  };

  // Stop logging
  const stopLogging = async () => {
    const response = await fetch('http://localhost:5000/api/stop-logging', { method: 'POST' });
    const data = await response.json();
    setLoggingStatus(data.status);
  };

  // Fetch data periodically (e.g., every 1 second)
  useEffect(() => {
    fetchTelemetry();
    fetchLoggingStatus();

    const intervalId = setInterval(() => {
      fetchTelemetry();
    }, 1000); // Update telemetry every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="App">
      <h1>Telemetry Dashboard</h1>

      {/* Telemetry Data Display */}
      <div className="telemetry">
        <div>Pack Voltage: {telemetry.packVoltage} V</div>
        <div>Pack Current: {telemetry.packCurrent} A</div>
        <div>Speed: {telemetry.speed} {velocitySelect}</div>
        <div>Temperature: {telemetry.temperature} °C</div>
        <div>MPPT Voltage: {telemetry.mppt?.voltage} V</div>
        <div>MPPT Current: {telemetry.mppt?.current} A</div>
      </div>

      {/* Unit Toggle */}
      <button onClick={changeUnits}>
        To {velocitySelect === 'MPH' ? 'KPH' : 'MPH'}
      </button>

      {/* Logging Controls */}
      <div>
        <div>Logging Status: {loggingStatus}</div>
        <button onClick={startLogging} disabled={loggingStatus === 'Logging'}>
          Start Logging
        </button>
        <button onClick={stopLogging} disabled={loggingStatus === 'Not Started'}>
          Stop Logging
        </button>
      </div>
    </div>
  );
}

export default App;
