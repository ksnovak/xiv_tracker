import React, { Component } from 'react';
import PlayerSearch from './PlayerSearch';
import SubmitButton from './SubmitButton';
// import './BatchLookup.css';

export default class BatchLookup extends Component {
  componentDidMount() {
    // asdf
  }

  render() {
    const { handleSubmit, handleSearchChange, names } = this.props;
    const searchFields = [];

    for (let i = 0; i < 8; i++) {
      const player = names[i];

      searchFields.push(
        <PlayerSearch
          key={i}
          playerNum={i}
          name={player ? player.name : undefined}
          server={player ? player.server : undefined}
          handleSearchChange={handleSearchChange}
        />
      );
    }

    return (
      <form onSubmit={handleSubmit}>
        {searchFields}
        <br />
        <SubmitButton />
      </form>
    );
  }
}
