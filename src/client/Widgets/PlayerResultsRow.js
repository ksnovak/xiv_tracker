import React, { useState } from 'react';
import JobSelect from './JobSelect';

function buildParseCell(name, parse) {
  return (
    <div>
      {parse} <img src={`/public/Jobs/${name}.png`} alt={name} />
    </div>
  );
}

// For a given encounter, find a player's best parse; optionally pass in a class to override and just find that class.
// eslint-disable-next-line class-methods-use-this
function findBestParse(encounter, options) {
  // If no parse for this fight exists, return early
  if (!encounter) {
    return;
  }

  const parses = encounter.classes;

  // If passed a specific class, just return whatever is in that field
  if (options && options.desiredClass) {
    const { desiredClass } = options;
    if (parses[desiredClass]) {
      console.log(parses[desiredClass]);

      return buildParseCell(desiredClass, parses[desiredClass]);
    }
    return;
  }

  // Go through all of a player's parses for the fight, compare, and return the highest class & value
  const bestParse = Object.entries(parses).reduce((highest, current) => (highest[1] > current[1] ? highest : current));

  return buildParseCell(bestParse[0], bestParse[1]);
}

export default function PlayerResultsRow(props) {
  const { player } = props;
  const [selectedJob, selectJob] = useState('Any');

  if (!player || !player.parses) {
    return null;
  }

  // Go through all of their encounters, finding their best parse for each
  // Forloop because a player may have logs for 1&4 but not 2&3, and a map can misrepresent that scenario
  const encounterCells = [];
  for (let i = 0; i < 4; i++) {
    encounterCells.push(<td key={i}>{findBestParse(player.parses[i])}</td>);
  }

  return (
    <tr key={player.name}>
      <td>{player.name}</td>
      {encounterCells}

      <td>
        <JobSelect selectedJob={selectedJob} selectJob={selectJob} />
      </td>
    </tr>
  );
}
