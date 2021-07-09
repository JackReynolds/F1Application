import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import driverObject from "../modules/driverModule";
import "../css/standings.css";

const Standings = () => {
  const elements = [];
  const spinner = useRef();
  const [finalDriverInfo, setFinalDriverInfo] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const driverTable = useRef();
  // const showSpinnerFunc = () => {
  //   if (showSpinner) {
  //     spinner.current.className = "show";
  //   } else {
  //     spinner.current.className = "";
  //     spinner.current.id = "";
  //   }
  // };
  const driverList = [];
  const driverListArray = [];
  let index = 1;

  const getDriversList = async () => {
    // showSpinnerFunc();
    const driverListRequest = await axios.get(
      "http://ergast.com/api/f1/current/drivers.json"
    );
    return driverListRequest;
  };

  const getDriverDetails = async (driverName) => {
    //showSpinner();
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

    return driverData;
  };

  const createDriverStanding = (driver) => {
    driverTable.current.className = "driverTable";
    elements.push([
      <tr>
        <td key={index}>{index}</td>
        <td>{driver.familyName}</td>
        <td>{driver.nationality}</td>
        <td>{driver.drivesFor}</td>
        <td>{driver.pointsThisYear}</td>
      </tr>,
    ]);
  };

  useEffect(() => {
    const getListofDrivers = async () => {
      const results = await getDriversList();
      for (let driver of results.data.MRData.DriverTable.Drivers) {
        driverList.push(driver.driverId);
        // setDriverList(driver.driverId);
      }

      const getDriverStandingInformation = async (driver) => {
        const driverData = await getDriverDetails(driver);
        driverListArray.push(driverData);
      };

      for (let driver of driverList) {
        getDriverStandingInformation(driver);
      }

      setTimeout(() => {
        let driversSortedByPoints = driverListArray.slice(0);
        driversSortedByPoints.sort((a, b) => {
          return b.pointsThisYear - a.pointsThisYear;
        });
        for (let driverSorted of driversSortedByPoints) {
          createDriverStanding(driverSorted);
          index++;
        }
        setShowSpinner(false);
        setFinalDriverInfo(elements);
      }, 7000);
    };
    getListofDrivers();
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h1 id="heading">2021 Driver Standings</h1>
        <div
          id={showSpinner ? "spinner" : null}
          className={showSpinner ? "show" : null}
          ref={spinner}
        ></div>
        ;<div className="standings"></div>
      </div>
      <table className="driverTable none" ref={driverTable}>
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
          {finalDriverInfo}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Standings;

// get list of users
//
