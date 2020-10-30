import React, { Component } from 'react';
import ServerSelect from './ServerSelect';

// import './PlayerSearch.css';

export default class PlayerSearch extends Component {
  componentDidMount() { }

  render() {
    const { playerNum, name, server, handleSearchChange, isDisabled } = this.props;

    return (
      <div>
        <label htmlFor={`characterName${playerNum}`}>
          Character:&nbsp;
          <input
            id={`characterName${playerNum}`}
            playernum={playerNum}
            name="playerName"
            type="text"
            placeholder="Yoshi P"
            disabled={isDisabled}
            value={name || ''}
            onChange={handleSearchChange}
          />
        </label>

        <ServerSelect
          id={`server${playerNum}`}
          server={server}
          isDisabled={isDisabled}
          handleServerChange={handleSearchChange}
          playerNum={playerNum}
        />
      </div>
    );
  }
}
