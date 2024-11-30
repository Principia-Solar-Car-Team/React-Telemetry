// src/telem_mph.js
import React, { useState, useEffect } from 'react';
import './telem.css'; // Importing the CSS file for styling

const Telemetry = () => {
  const [speed, setSpeed] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [maxCellTemp, setMaxCellTemp] = useState(0);
  const [minCellTemp, setMinCellTemp] = useState(0);
  const [averageCellVoltage, setAverageCellVoltage] = useState(0);
  const [lowCellVoltage, setLowCellVoltage] = useState(0);
  const [highCellVoltage, setHighCellVoltage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.random() * 100);
      setVoltage(Math.random() * 50);
      setCurrent(Math.random() * 10);
      setMaxCellTemp(Math.random() * 100);
      setMinCellTemp(Math.random() * 100);
      setAverageCellVoltage(Math.random() * 5);
      setLowCellVoltage(Math.random() * 5);
      setHighCellVoltage(Math.random() * 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="telemetry">
      <h1>Telemetry</h1>
      <div className="metrics-container">
        <div className="metric-box">
          <strong>Speed:</strong>
          <p>{speed.toFixed(2)} km/h</p>
        </div>
        <div className="metric-box">
          <strong>Voltage:</strong>
          <p>{voltage.toFixed(2)} V</p>
        </div>
        <div className="metric-box">
          <strong>Current:</strong>
          <p>{current.toFixed(2)} A</p>
        </div>
        <div className="metric-box">
          <strong>Max Cell Temp:</strong>
          <p>{maxCellTemp.toFixed(2)} °C</p>
        </div>
        <div className="metric-box">
          <strong>Min Cell Temp:</strong>
          <p>{minCellTemp.toFixed(2)} °C</p>
        </div>
        <div className="metric-box">
          <strong>Average Cell Voltage:</strong>
          <p>{averageCellVoltage.toFixed(2)} V</p>
        </div>
        <div className="metric-box">
          <strong>Low Cell Voltage:</strong>
          <p>{lowCellVoltage.toFixed(2)} V</p>
        </div>
        <div className="metric-box">
          <strong>High Cell Voltage:</strong>
          <p>{highCellVoltage.toFixed(2)} V</p>
        </div>
      </div>
    </div>
  );
};

export default Telemetry;
