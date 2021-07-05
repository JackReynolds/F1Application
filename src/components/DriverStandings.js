import React, { Fragment } from "react";
import axios from "axios";
import DriverTable from "./DriverTable";
import driverObject from "../modules/driverModule";
import "../css/driverStandings.css";

const DriverStandings = () => {
  const showSpinner = () => {};

  const getDriverDetails = async () => {
    const response = await axios.get();
  };

  return (
    <Fragment>
      <div className="container">
        <h1 id="heading">2021 Driver Standings</h1>
        <div id="spinner"></div>
        <div className="standings"></div>
      </div>
      <table className="driverTable none">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Nationality</th>
            <th>Constructor</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr id="driverRow"></tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default DriverStandings;
