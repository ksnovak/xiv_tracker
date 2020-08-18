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
function findBestParse(data, desiredJob) {
  // If no parse for this fight exists, return early


  if (!data) {
    return;
  }

  const bestParse = Object.entries(data.classes)

    // Filter down to find any jobs which are eligible to be used (i.e. correct role)
    .filter(([job, percentile]) => {
      // If nothing is selected, OR a job is selected and we are on that current job, the check is very easy
      if (!desiredJob || desiredJob === 'Any' || desiredJob === job) {
        return true;
      }


      // If a ROLE was specified, then we need to figure out which jobs match within that role
      const roleDetails = jobsAndRoles.filter(role => role.role === desiredJob);
      if (roleDetails.length && roleDetails[0].jobs.includes(job)) {
        return true;
      }

      // If the specification didn't match any checks, then it's not a job we need.
      return false;
    })

    // Go through the list of eligible jobs and compare their respective parses
    .reduce((highest, current) => (highest[1] > current[1] ? highest : current), 0);

  return buildParseCell(bestParse);
}

export default function PlayerResultsRow(props) {
  const { player, encounters } = props;
  const [selectedJob, selectJob] = useState('Any');


  if (!player || !player.parses) {
    return null;
  }

  // Go through each encounter, and find the player's best parse
  // Keeping in mind any job/role restrictions
  const encounterCells = encounters.map((encounter) => {
    const parse = player.parses[encounter.name];
    return <td key={encounter.id}>{findBestParse(parse, selectedJob)}</td>;
  });

  return (
    <tr key={player.name}>
      <td>{player.name}</td>
      <td>
        <JobSelect selectedJob={selectedJob} selectJob={selectJob} />
      </td>
      {encounterCells}

    </tr>
  );
}
