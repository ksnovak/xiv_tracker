import React, { Component } from 'react';

export default class ServerSelect extends Component {
  componentDidMount() {
    // asdf
  }

  render() {
    const { playerNum, id, server, serverList, handleServerChange, isDisabled } = this.props;
    const placeholderServers = [
      'Balmung',
      'Brynhildr',
      'Coeurl',
      'Diabolos',
      'Goblin',
      'Malboro',
      'Mateus',
      'Zalera'
    ];

    const options = (serverList.length? serverList : placeholderServers).map(serverOption => (
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
          disabled={isDisabled}
          value={server ? server.toLowerCase() : undefined}
          playernum={playerNum}
        >
          {options}
        </select>
      </label>
    );
  }
}
