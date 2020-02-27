import React, { Component } from 'react';

export default class ResultsTable extends Component {
  componentDidMount() {}

  // eslint-disable-next-line class-methods-use-this
  findBestParse(parses, desiredClass) {
    // If passed a specific class, just return whatever is in that field
    if (desiredClass) {
      return parses[desiredClass];
    }

    // Go through all of a player's parses for the fight, compare, and return the highest class & value
    const bestParse = Object.entries(parses).reduce((highest, current) => (highest[1] > current[1] ? highest : current));

    return `${bestParse[1]} ${bestParse[0]}`;
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
          <tbody>
            {parses.map(player => (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{this.findBestParse(player.parses[0].classes)}</td>
                <td>{this.findBestParse(player.parses[1].classes)}</td>
                <td>{this.findBestParse(player.parses[2].classes)}</td>
                <td>{this.findBestParse(player.parses[3].classes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
