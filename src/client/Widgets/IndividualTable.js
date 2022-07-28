import React from 'react';
import './IndividualTable.css';
import {jobsAndRoles} from './JobSelect';

const includeUnparsedJobs = false; //Whether to even list a job that has never cleared ANY fight


//Create the whole <th> with names of Encounters
function getTierHeaders(encounters) {
	if (encounters) {

		return (
			<thead>
				<tr>
					<th>Job</th>
					{encounters.map(encounter => <th key={encounter.id}>{encounter.name}</th>)}
				</tr>
			</thead>
		);
	}
}

//Generate the whole <tr> for a given job
function getJobRow(job, percentiles, encounters) {
	let cells = [];

	//If the Job has a Parse for the given Encounter, insert the number; otherwise leave the cell empty
	for (let i = 0; i < encounters.length; i++) {
		cells.push(<td>{percentiles? percentiles[encounters[i].name] : ''}</td>)
	}

	return (
		<tr key={job}>
			<td><img className='indivJobIcon' src={`/public/Jobs/${job}.png`} alt={job} />{job}</td>
			{cells}
		</tr>
	);
}

//Parses come in as an array based on the Encounters
//This function converts it to being based on the Job instead
function translateParses(parses) {
	let parsesByJob = [];

	//Take the pre-defined and pre-sorted list of jobs, and use that as a base.
	jobsAndRoles.map(role => role.jobs).flat().forEach(job => {
		parsesByJob[job] = null;
	});


	//Go through every Encounter, and then every parse for that given encounter
	//And add those parses to the new array which is based on Jobs
	for (const [encounterName, details] of Object.entries(parses)) {
		for (const [job, percentile] of Object.entries(details.classes)) {

			//If the current Job has no Parse defined at all yet, create an empty array for it
			if (!parsesByJob[job]) {
				parsesByJob[job] = [];
			}

			parsesByJob[job][encounterName] = percentile;
		}
	}

	return parsesByJob;
}

export default function IndividualTable(props) {
	const { player, tier } = props;
	const encounters = tier.encounters;

	const parsesByJob = translateParses(player.parses);
	let jobRows = [];

	for (const [job, percentile] of Object.entries(parsesByJob)) {

		//If the player has never brought a certain job into this tier, this check determines whether to show it or not
		if (!!percentile || includeUnparsedJobs) {
			jobRows.push(getJobRow(job, percentile, encounters));
		}
	}

	return (
		<table id="individualTable">
			{getTierHeaders(encounters)}
			<tbody>
				{jobRows}
			</tbody>
		</table>
	);
}
