import React, { Component } from 'react';

export default class ServerSelect extends Component {
  componentDidMount() {
    // asdf
  }

  render() {
    const { id, server } = this.props;
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

    const options = serverList.map(serverOption => (
      <option value={serverOption} key={serverOption}>
        {serverOption}
      </option>
    ));
    return (
      <label htmlFor={id}>
        Server:{' '}
        <select id={id} defaultValue={server}>
          {options}
        </select>
      </label>
    );
  }
}
