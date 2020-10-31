import React from 'react';
import jobsAndRoles from './JobSelect';

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

function getJobRow(job, encounters) {
	return (
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>4</td>
		</tr>
	);
}

function translateParses(parses) {
	const parsesByJob = [];

	for (const [encounterName, details] of Object.entries(parses)) {
		for (const [job, percentile] of Object.entries(details.classes)) {

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

	for (const [job, percentile] of parsesByJob.entries()) {
		console.log(job);
		// jobRows.push(getJobRow(job, value, encounters));
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
