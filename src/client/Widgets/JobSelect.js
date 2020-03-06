import React, { useState } from 'react';

const options = [
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
  return options.map(role => (
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
  const [selected, setSelected] = useState('Any');

  return (
    <select onChange={event => setSelected(event.target.value)}>
      <option value="Any" key="any">
        Any
      </option>
      {createOptions()}
    </select>
  );
}
