import React, { Component } from 'react';
import PlayerSearch from './PlayerSearch';
import SubmitButton from './SubmitButton';
// import './BatchLookup.css';

export default class BatchLookup extends Component {
  componentDidMount() {
    // asdf
  }

  render() {
    const { handleSubmit, handleSearchChange, names, servers } = this.props;
    const searchFields = [];

    for (let i = 0; i < 8; i++) {
      const player = names[i];

      // Disable inputs if the previous one isn't filled out
      const isDisabled = i !== 0 && !(names[i - 1] && names[i - 1].name) && (!player || !player.name);

      searchFields.push(
        <PlayerSearch
          key={i}
          playerNum={i}
          isDisabled={isDisabled}
          name={player ? player.name : undefined}
          server={player ? player.server : undefined}
          handleSearchChange={handleSearchChange}
          servers={servers}
        />
      );
    }

    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        {searchFields}
        <br />
        <SubmitButton />
      </form>
    );
  }
}
