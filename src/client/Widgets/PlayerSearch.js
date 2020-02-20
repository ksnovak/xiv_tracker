import React, { Component } from 'react';
import ServerSelect from './ServerSelect';

// import './PlayerSearch.css';

export default class PlayerSearch extends Component {
  componentDidMount() {}

  render() {
    const { playerNum, name, server } = this.props;
    return (
      <div>
        <label htmlFor={`characterName${playerNum}`}>
          Character:&nbsp;
          <input
            id={`characterName${playerNum}`}
            type="text"
            placeholder="Yoshi P"
            defaultValue={name}
          />
        </label>

        <ServerSelect id={`server${playerNum}`} server={server} />
      </div>
    );
  }
}
