import React, { useState } from "react";
import PlayerResultsRow from "./PlayerResultsRow";

export default function ResultsTable(props) {
  const { names } = props;

  if (!names.length) {
    return null;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Ramuh</th>
            <th>Raktapaska</th>
            <th>Idol of Darkness</th>
            <th>Shiva</th>
            <th>Preferred Job</th>
          </tr>
        </thead>
        <tbody>
          {names.map((player) => (
            <PlayerResultsRow player={player} key={player.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
