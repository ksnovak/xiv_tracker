import React from 'react';

export default function IndividualTable(props) {
	const { asdf } = props;

	return (
		<table id="individualTable">
			<thead>
				<tr>
					<th>Ramuh</th>
					<th>Raktapasta</th>
					<th>Idol</th>
					<th>Shiva</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>99</td>
					<td>43</td>
					<td>66</td>
					<td>22</td>
				</tr>
			</tbody>
		</table>
	);
}
