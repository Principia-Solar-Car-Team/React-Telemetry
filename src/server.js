// server.js (Node.js/Express Backend)
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for frontend interaction
app.use(cors());

// Sample in-memory data to simulate telemetry and logging status
let telemetryData = {
  packVoltage: 12.5,
  packCurrent: 5.2,
  speed: 60,
  temperature: 30,
  mppt: { voltage: 14.8, current: 3.0 }
};

let loggingStatus = 'Not Started';
let velocitySelect = 'MPH'; // Default is MPH

// Endpoint to get telemetry data
app.get('/api/telemetry', (req, res) => {
  res.json(telemetryData);
});

// Endpoint to get logging status
app.get('/api/logging-status', (req, res) => {
  res.json({ status: loggingStatus });
});

// Endpoint to change speed units (MPH/KPH)
app.post('/api/change-units', (req, res) => {
  velocitySelect = velocitySelect === 'MPH' ? 'KPH' : 'MPH';
  res.json({ velocitySelect });
});

// Endpoint to start logging
app.post('/api/start-logging', (req, res) => {
  loggingStatus = 'Logging';
  res.json({ status: loggingStatus });
});

// Endpoint to stop logging
app.post('/api/stop-logging', (req, res) => {
  loggingStatus = 'Not Started';
  res.json({ status: loggingStatus });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
