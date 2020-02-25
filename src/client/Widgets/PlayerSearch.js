import React, { Component } from 'react';
import ServerSelect from './ServerSelect';

// import './PlayerSearch.css';

export default class PlayerSearch extends Component {
  componentDidMount() {}

  render() {
    const { playerNum, name, server, handleSearchChange } = this.props;
    return (
      <div>
        <label htmlFor={`characterName${playerNum}`}>
          Character:&nbsp;
          <input
            id={`characterName${playerNum}`}
            playernum={playerNum}
            name="name"
            type="text"
            placeholder="Yoshi P"
            defaultValue={name}
            onChange={handleSearchChange}
          />
        </label>

        <ServerSelect
          id={`server${playerNum}`}
          server={server}
          handleServerChange={handleSearchChange}
          playerNum={playerNum}
        />
      </div>
    );
  }
}
