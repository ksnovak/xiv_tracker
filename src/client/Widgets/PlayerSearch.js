import React, { Component } from 'react';
import ServerSelect from './ServerSelect';

// import './PlayerSearch.css';

export default class PlayerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNum: props.playerNum,
      name: props.name || '',
      server: props.server || ''
    };
  }

  componentDidMount() {}

  render() {
    const { playerNum, name, server } = this.state;
    const { handleSearchChange } = this.props;
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
