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

  const roleEnum = {
    Tank: 0,
    Healer: 1,
    DPS: 2
  };

  const parses = encounter.classes;
  const bestParse = Object.entries(parses)
    .filter((parse) => {
      // If no job is specified, filter nothing out
      if (!desiredJob || desiredJob === 'Any') {
        return true;
      }

      // If an individual job was specified, only return parses that match that job
      if (desiredJob !== 'Tank' && desiredJob !== 'Healer' && desiredJob !== 'DPS') {
        return parse[0] === desiredJob;
      }

      // If a role was specified, look at the list of jobs for that role and return parse that are within it
      if (jobsAndRoles[roleEnum[desiredJob]].jobs.includes(parse[0])) return true;

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
