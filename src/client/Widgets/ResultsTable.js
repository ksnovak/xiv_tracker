import React, { useState } from 'react';
import PlayerResultsRow from './PlayerResultsRow';

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
            <th>Eden Prime</th>
            <th>Voidwalker</th>
            <th>Leviathan</th>
            <th>Titan</th>
            <th>Preferred Job</th>
          </tr>
        </thead>
        <tbody>
          {names.map(player => (
            <PlayerResultsRow player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
