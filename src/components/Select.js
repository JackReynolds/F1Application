import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import "../css/select.css";

const Select = ({ getDriverName, position }) => {
  const [selectedDriver, setSelectedDriver] = useState("");

  const makeNoteOfSelected = (e) => {
    setSelectedDriver(e.target.value);
  };

  useEffect(() => {
    if (selectedDriver) getDriverName(selectedDriver);
  }, [selectedDriver]);

  return (
    <Fragment>
      <select
        name="driver"
        id={"driverSelect" + position}
        onChange={makeNoteOfSelected}
      >
        <option value="blank"></option>
        <option value="hamilton">Lewis Hamilton</option>
        <option value="bottas">Valterri Bottas</option>
        <option value="max_verstappen">Max Verstappen</option>
        <option value="perez">Sergio Pérez</option>
        <option value="norris">Lando Norris</option>
        <option value="ricciardo">Daniel Ricciardo</option>
        <option value="sainz">Carlos Sainz</option>
        <option value="leclerc">Charles Leclerc</option>
        <option value="ocon">Estaban Ocon</option>
        <option value="alonso">Fernando Alonso</option>
        <option value="tsunoda">Yuki Tsunoda</option>
        <option value="gasly">Pierre Gasly</option>
        <option value="vettel">Sebastian Vettel</option>
        <option value="stroll">Lance Stroll</option>
        <option value="giovinazzi">Antonio Giovinazzi</option>
        <option value="raikkonen">Kimi Räikkönen</option>
        <option value="russell">George Russell</option>
        <option value="latifi">Nicholas Latifi</option>
        <option value="mazepin">Nikita Mazepin</option>
        <option value="mick_schumacher">Mick Schumacher</option>
      </select>
    </Fragment>
  );
};

export default Select;
