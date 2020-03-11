import React, { useState } from 'react';

export const jobsAndRoles = [
  { role: 'Tank', jobs: ['Paladin', 'Warrior', 'Dark Knight', 'Gunbreaker'] },
  { role: 'Healer', jobs: ['White Mage', 'Scholar', 'Astrologian'] },
  {
    role: 'DPS',
    jobs: [
      'Dragoon',
      'Monk',
      'Ninja',
      'Samurai',
      'Bard',
      'Machinist',
      'Dancer',
      'Black Mage',
      'Summoner',
      'Red Mage'
    ]
  }
];

function createOptions() {
  return jobsAndRoles.map(role => (
    <optgroup label={role.role} key={role.role}>
      <option value={role.role} key={role.role}>
        Any {role.role}
      </option>
      {role.jobs.map(job => (
        <option value={job} key={job}>
          {job}
        </option>
      ))}
    </optgroup>
  ));
}

export default function JobSelect(props) {
  const { selectedJob, selectJob } = props;

  return (
    <select onChange={event => selectJob(event.target.value)} value={selectedJob}>
      <option value="Any" key="any">
        Any
      </option>
      {createOptions()}
    </select>
  );
}
