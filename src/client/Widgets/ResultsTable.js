import React, { useState } from 'react';
import PlayerResultsRow from './PlayerResultsRow';
import './ResultsTable.css';

function getTierHeaders(tier) {
  if (tier && tier.encounters) {
    const { encounters } = tier;
    return (
      <thead>
        <tr>
          <th>Player name</th>
          <th>Job</th>
          {encounters.map(encounter => <th key={encounter.id}>{encounter.name}</th>)}
        </tr>
      </thead>
    );
  }
}

export default function ResultsTable(props) {
  const { names, tier, handleSelectChange, region } = props;

  if (!names.length || tier.length) {
    return null;
  }
  return (
    <div id="resultsContainer">
      <table id="resultsTable" className="table table-sm">
        {getTierHeaders(tier)}
        <tbody>
          {names.map((player, index) => (
            <PlayerResultsRow player={player} encounters={tier.encounters} key={index} handleSelectChange={handleSelectChange} index={index} region={region} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
