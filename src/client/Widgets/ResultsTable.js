import React, { Component } from 'react';

export default class ResultsTable extends Component {
  componentDidMount() {}

  // For a given encounter, find a player's best parse; optionally pass in a class to override and just find that class.
  // eslint-disable-next-line class-methods-use-this
  findBestParse(encounter, desiredClass) {
    // If no parse for this fight exists, return early
    if (!encounter) {
      return;
    }

    const parses = encounter.classes;

    // If passed a specific class, just return whatever is in that field
    if (desiredClass) {
      if (parses[desiredClass]) {
        return `${parses[desiredClass]} ${desiredClass}`;
      }
      return;
    }

    // Go through all of a player's parses for the fight, compare, and return the highest class & value
    const bestParse = Object.entries(parses).reduce((highest, current) => (highest[1] > current[1] ? highest : current));

    return `${bestParse[1]} ${bestParse[0]}`;
  }

  // Fill in details for an individual player and their parses
  buildPlayerRow(player) {
    if (player && player.parses) {
      const encounters = player.parses;

      // Because a player might not have a parse for all 4 encounters, we must do a loop for all 4
      // Mapping might cause a parse to appear in the wrong spot.
      const encounterCells = [];
      for (let i = 0; i < 4; i++) {
        encounterCells.push(<td>{this.findBestParse(encounters[i])}</td>);
      }

      return (
        <tr key={player.name}>
          <td>{player.name}</td>

          {encounterCells}
        </tr>
      );
    }
  }

  render() {
    const { parses } = this.props;

    if (!parses.length) {
      return null;
    }

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Eden Prime</th>
              <th>Voidwalker</th>
              <th>Leviathan</th>
              <th>Titan</th>
            </tr>
          </thead>
          <tbody>{parses.map(player => this.buildPlayerRow(player))}</tbody>
        </table>
      </div>
    );
  }
}
