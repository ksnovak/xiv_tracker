import React, { Component } from 'react';

export default class ResultsTable extends Component {
  componentDidMount() {}

  buildParseCell(name, parse) {
    return (
      <div>
        {parse} <img src={`/public/Jobs/${name}.png`} />
      </div>
    );
  }

  // For a given encounter, find a player's best parse; optionally pass in a class to override and just find that class.
  // eslint-disable-next-line class-methods-use-this
  findBestParse(encounter, options) {
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

        return this.buildParseCell(desiredClass, parses[desiredClass]);
      }
      return;
    }

    // Go through all of a player's parses for the fight, compare, and return the highest class & value
    const bestParse = Object.entries(parses).reduce((highest, current) => (highest[1] > current[1] ? highest : current));

    return this.buildParseCell(bestParse[0], bestParse[1]);
  }

  // Fill in details for an individual player and their parses
  buildPlayerRow(player) {
    // Make sure we actually got a player and a parse before proceeding
    if (player && player.parses) {
      const encounters = player.parses;

      // Go through all of their encounters, finding their best parse for each
      // Forloop because a player may have logs for 1&4 but not 2&3, and a map can misrepresent that scenario
      const encounterCells = [];
      for (let i = 0; i < 4; i += 1) {
        encounterCells.push(<td key={i}>{this.findBestParse(encounters[i])}</td>);
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
