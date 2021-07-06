import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import driverObject from "../modules/driverModule";
import "../css/standings.css";
const spinner = document.querySelector("#spinner");

const Standings = () => {
  const [driverListState, setDriverListState] = useState([]);
  const [driverListArrayState, setDriverListArrayState] = useState([]);
  const driverTable = useRef("driverTable");
  const tBody = useRef("tbody");
  const showSpinner = () => {
    spinner.classList.add("show");
    setTimeout(() => {
      spinner.className = spinner.className.replace("show", "");
    }, 5000);
  };
  const driverList = [];
  const driverListArray = [];
  let index = 1;

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

    driverListArray.push(driverData);
    // setDriverListArray(driverData)
  };

  const getDriversList = async () => {
    const driverListRequest = await axios.get(
      "http://ergast.com/api/f1/current/drivers.json"
    );
    return driverListRequest;
  };

  const createDriverStanding = (driver) => {
    driverTable.classList.remove("none");
    //tds.classList.add("add-padding");
    const tRow = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    td1.innerText = index;
    td2.innerText = driver.familyName;
    td3.innerText = driver.nationality;
    td4.innerText = driver.drivesFor;
    td5.innerText = driver.pointsThisYear;
    tBody.appendChild(tRow);
    tRow.appendChild(td1);
    tRow.appendChild(td2);
    tRow.appendChild(td3);
    tRow.appendChild(td4);
    tRow.appendChild(td5);
  };

  useEffect(() => {
    const getListofDrivers = async () => {
      const results = await getDriversList();
      for (let driver of results.data.MRData.DriverTable.Drivers) {
        driverList.push(driver.driverId);
        // setDriverList(driver.driverId);
      }
    };
    getListofDrivers();
    console.log("before set");
    setDriverListState(driverList);

    const getDriverStandingInformation = async (driver) => {
      const results = await getDriverDetails(driver);
      driverListArray.push(results);
    };

    for (let driver of driverListState) {
      getDriverStandingInformation(driver);
    }

    setDriverListArrayState(driverListArray);

    console.log(driverListState);
    console.log(driverListArrayState);

    let driversSortedByPoints = driverListArray.slice(0);
    driversSortedByPoints.sort((a, b) => {
      return b.pointsThisYear - a.pointsThisYear;
    });

    for (let driverSorted of driversSortedByPoints) {
      createDriverStanding(driverSorted);
      index++;
    }
  }, []);

  return (
    <Fragment>
      <div className="container">
        <h1 id="heading">2021 Driver Standings</h1>
        <div id="spinner"></div>
        <div className="standings"></div>
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
        <tbody ref={tBody}>
          <tr id="driverRow"></tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Standings;
