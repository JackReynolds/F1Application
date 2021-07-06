import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Select from "./Select";
import "../css/app.css";
import { Fragment } from "react";
import DriverCard from "./DriverCard";
import Route from "./Route";
import driverObject from "../modules/driverModule";
import Standings from "./Standings";

const App = () => {
  // const [selectedDriver1, setSelectedDriver1] = useState("");
  // const [selectedDriver2, setSelectedDriver2] = useState("");
  const [driver1Details, setDriver1Details] = useState("");
  const [driver2Details, setDriver2Details] = useState("");

  const getDriver1Details = async (driverName) => {
    const response = await axios.get(
      `https://ergast.com/api/f1/current/drivers/${driverName}/driverStandings.json`
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
      pointsThisYear: data.points,
      winsThisYear: data.wins,
      totalPoints: driverObject[driverName].totalPointsEver,
      totalPodiums: driverObject[driverName].totalPodiumsEver,
      drivesFor: data.Constructors[0].name,
      driverImage: driverObject[driverName].driverImage,
    };
    setDriver1Details(driverData);
  };

  const getDriver2Details = async (driverName) => {
    const response = await axios.get(
      `https://ergast.com/api/f1/current/drivers/${driverName}/driverStandings.json`
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
      pointsThisYear: data.points,
      winsThisYear: data.wins,
      totalPoints: driverObject[driverName].totalPointsEver,
      totalPodiums: driverObject[driverName].totalPodiumsEver,
      drivesFor: data.Constructors[0].name,
      driverImage: driverObject[driverName].driverImage,
    };
    setDriver2Details(driverData);
  };

  const getDriver1Name = (driver) => {
    // setSelectedDriver1(driver) // this does not seem to set "driver" as the state - not sure why - need to look into this
    getDriver1Details(driver);
  };

  const getDriver2Name = (driver) => {
    // onDriverSelect(driver);
    //setSelectedDriver2(driver);
    getDriver2Details(driver);
  };

  const runComparison = () => {
    window.scrollBy({
      top: 350,
      left: 0,
      behavior: "smooth",
    });

    const leftSideStats = document.querySelectorAll(
      ".drivers-left .driverCompareStats"
    );
    const rightSideStats = document.querySelectorAll(
      ".drivers-right .driverCompareStats"
    );

    for (let stat of leftSideStats) {
      stat.classList.remove("is-primary");
      stat.classList.remove("winning-stat");
    }

    for (let stat of rightSideStats) {
      stat.classList.remove("is-primary");
      stat.classList.remove("winning-stat");
    }

    leftSideStats.forEach((leftStat, index) => {
      const rightStat = rightSideStats[index];
      const leftSideValue = parseInt(leftStat.dataset.value);
      const rightSideValue = parseInt(rightStat.dataset.value);

      if (rightSideValue > leftSideValue) {
        rightStat.classList.add("winning-stat");
      } else if (rightSideValue == leftSideValue) {
      } else {
        leftStat.classList.add("winning-stat");
      }
    });
  };

  if (driver1Details && driver2Details) {
    setTimeout(() => {
      runComparison();
    }, 1000); // was not getting right side note list unless timeout was added
  }

  return (
    <Fragment>
      <Header />
      {/* {showDriverCompare()}
      {showDriverStandings()} */}
      <Route path="/">
        <div>
          <h3 id="heading">Compare Driver Statistics</h3>
          <hr />
          <div className="columns">
            <div className="column">
              <h3>Choose your first driver from the selection below</h3>
              <br />
              <Select getDriverName={getDriver1Name} position="left" />
              <br />
              <br />
              <div className="drivers-left">
                {driver1Details ? (
                  <DriverCard driverData={driver1Details} />
                ) : null}
              </div>
            </div>
            <div className="column">
              <h3>Choose your second driver from the selection below</h3>
              <br />
              <Select getDriverName={getDriver2Name} position="right" />
              <br />
              <br />
              <div className="drivers-right">
                {driver2Details ? (
                  <DriverCard driverData={driver2Details} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Route>

      <Route path="/standings">
        <Standings />
      </Route>
    </Fragment>
  );
};

export default App;
