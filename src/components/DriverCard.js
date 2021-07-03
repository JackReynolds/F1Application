import React from "react";
import driverObject from "../modules/driverModule";

const DriverCard = ({ driverData, driverObject }) => {
  const pointsThisYearStat = parseInt(driverData.pointsThisYear);
  const winsThisYearStat = parseInt(driverData.winsThisYear);
  const totalPointsStat = parseInt(driverData.totalPoints);
  const totalPodiumsStat = parseInt(driverData.totalPodiums);

  console.log(driverData);

  return (
    <div className="card">
      <div className="card-image" width="18 rem">
        <figure className="">
          <img src={driverObject.driverImage} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left"></div>
          <div className="media-content">
            <p className="title is-4">
              {driverData.firstName} {driverData.familyName}
            </p>
          </div>
        </div>
      </div>
      <div className="content">
        <hr />
        <p className="driverStats"> Driver for: {driverData.drivesFor}</p>
        <hr />
        <p className="driverStats"> Date of birth: {driverData.dateOfBirth} </p>
        <hr />
        <p className="driverStats"> Nationality: {driverData.nationality}</p>
        <hr />
        <p
          className="driverStats driverCompareStats"
          data-value={pointsThisYearStat}
        >
          {" "}
          Points this Season: {driverData.pointsThisYear}
        </p>
        <hr />
        <p
          className="driverStats driverCompareStats"
          data-value={winsThisYearStat}
        >
          {" "}
          Wins this Season: {driverData.winsThisYear}
        </p>
        <hr />
        <p
          className="driverStats driverCompareStats"
          data-value={totalPointsStat}
        >
          {" "}
          Total Points Ever: {driverData.totalPoints}{" "}
        </p>
        <hr />
        <p
          className="driverStats driverCompareStats"
          data-value={totalPodiumsStat}
        >
          {" "}
          Total Podiums Ever: {driverData.totalPodiums}
        </p>
        <hr />
      </div>
    </div>
  );
};

export default DriverCard;
