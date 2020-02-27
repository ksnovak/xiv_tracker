import React, { Component } from 'react';

export default class ServerSelect extends Component {
  componentDidMount() {
    // asdf
  }

  render() {
    const { playerNum, id, server, handleServerChange } = this.props;
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
      <option value={serverOption.toLowerCase()} key={serverOption}>
        {serverOption}
      </option>
    ));
    return (
      <label htmlFor={id} onChange={handleServerChange}>
        Server:{' '}
        <select
          id={id}
          name="server"
          value={server ? server.toLowerCase() : undefined}
          playernum={playerNum}
        >
          {options}
        </select>
      </label>
    );
  }
}
