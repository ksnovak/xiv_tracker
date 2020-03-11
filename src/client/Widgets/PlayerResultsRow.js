import React, { useState } from 'react';
import JobSelect, { jobsAndRoles } from './JobSelect';

function buildParseCell(parse) {
  if (parse.length) {
    const [job, percentile] = parse;
    return (
      <div>
        {percentile} <img src={`/public/Jobs/${job}.png`} alt={job} />
      </div>
    );
  }
  return null;
}

// For a given encounter, find a player's best parse; optionally pass in a class to override and just find that class.
// eslint-disable-next-line class-methods-use-this
function findBestParse(encounter, desiredJob) {
  // If no parse for this fight exists, return early
  if (!encounter) {
    return;
  }
  const parses = encounter.classes;
  const bestParse = Object.entries(parses)
    .filter((parse) => {
      if (!desiredJob || desiredJob === 'Any') {
        return true;
      }
      if (desiredJob !== 'Tank' && desiredJob !== 'Healer' && desiredJob !== 'DPS') {
        return parse[0] === desiredJob;
      }

      // Specified a role
      if (desiredJob === 'Tank' && jobsAndRoles[0].jobs.includes(parse[0])) return true;
      if (desiredJob === 'Healer' && jobsAndRoles[1].jobs.includes(parse[0])) return true;
      if (desiredJob === 'DPS' && jobsAndRoles[2].jobs.includes(parse[0])) return true;

      return false;
    })
    .reduce((highest, current) => (highest[1] > current[1] ? highest : current), 0);

  return buildParseCell(bestParse);
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
    encounterCells.push(<td key={i}>{findBestParse(player.parses[i], selectedJob)}</td>);
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
