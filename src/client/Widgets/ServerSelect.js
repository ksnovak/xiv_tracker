import React, { Component } from 'react';

export default class ServerSelect extends Component {
  componentDidMount() {
    // asdf
  }

  render() {
    const { id } = this.props;
    const serverList = [
      'Balmung',
      'Brynhildr',
      'Coeurl',
      'Diabolos',
      'Goblin',
      'Malboro',
      'Mateus',
      'Zalera'
    ];

    const options = serverList.map(server => <option value={server}>{server}</option>);
    return (
      <label htmlFor={id}>
        Server: <select id={id}>{options}</select>
      </label>
    );
  }
}
