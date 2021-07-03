import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Select from "./Select";
import "../css/app.css";
import { Fragment } from "react";
import DriverCard from "./DriverCard";
import driverObject from "../modules/driverModule";

const App = () => {
  const [selectedDriver1, setSelectedDriver1] = useState("");
  const [selectedDriver2, setSelectedDriver2] = useState("");
  const [driver1Details, setDriver1Details] = useState("");
  const [driver2Details, setDriver2Details] = useState("");

  const getDriver1Details = async (driverName) => {
    const response = await axios.get(
      `https://ergast.com/api/f1/drivers/${driverName}/driverStandings.json`
    );
    const data =
      response.data.MRData.StandingsTable.StandingsLists[
        response.data.MRData.StandingsTable.StandingsLists.length - 1
      ].DriverStandings[0];
    const driverData = {
      firstName: data.Driver.givenName,
      familyName: data.Driver.familyName,
      dateOfBirth: data.Driver.dateOfBirth,
      nationality: data.Driver.nationality,
      wikiUrl: data.Driver.url,
      drivesFor: data.Constructors[0].name,
    };
    setDriver1Details(driverData);
  };

  const getDriver2Details = async (driverName) => {
    const response = await axios.get(
      `https://ergast.com/api/f1/drivers/${driverName}/driverStandings.json`
    );
    const data =
      response.data.MRData.StandingsTable.StandingsLists[
        response.data.MRData.StandingsTable.StandingsLists.length - 1
      ].DriverStandings[0];
    const driverData = {
      firstName: data.Driver.givenName,
      familyName: data.Driver.familyName,
      dateOfBirth: data.Driver.dateOfBirth,
      nationality: data.Driver.nationality,
      wikiUrl: data.Driver.url,
      drivesFor: data.Constructors[0].name,
    };
    setDriver2Details(driverData);
  };

  const getDriver1Name = (driver) => {
    // onDriverSelect(driver);
    setSelectedDriver1(driver);
    getDriver1Details(selectedDriver1);
  };

  const getDriver2Name = (driver) => {
    // onDriverSelect(driver);
    setSelectedDriver2(driver);
    getDriver2Details(selectedDriver2);
  };

  // if(driver1Details && driver2Details){
  //   compareDrivers()
  // }

  return (
    <Fragment>
      <Header />
      <h3 id="heading">Compare Driver Statistics</h3>
      <hr></hr>
      <div className="columns">
        <div className="column">
          <h3>Choose your first driver from the selection below</h3>
          <br />
          <Select getDriverName={getDriver1Name} position="Left" />
          <br />
          <br />
          <div className="drivers-left">
            {driver1Details ? (
              <DriverCard
                driverData={driver1Details}
                driverObject={driverObject}
              />
            ) : null}
          </div>
        </div>
        <div className="column">
          <h3>Choose your second driver from the selection below</h3>
          <br />
          <Select getDriverName={getDriver2Name} position="Right" />
          <br />
          <br />
          <div className="drivers-right">
            {driver2Details ? (
              <DriverCard
                driverData={driver2Details}
                driverObject={driverObject}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
