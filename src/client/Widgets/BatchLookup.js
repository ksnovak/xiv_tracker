import React, { Component } from 'react';
import PlayerSearch from './PlayerSearch';
import SubmitButton from './SubmitButton';
// import './BatchLookup.css';

export default class BatchLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: [
        { name: 'Warrior Of-light', server: 'Coeurl' },
        { name: 'Thancred Waters', server: 'Coeurl' },
        { name: 'Urianger Augurelt', server: 'Coeurl' },
        { name: 'Y\'shtola Rhul', server: 'Coeurl' },
        { name: 'Alisaie Leveilleur', server: 'Zalera' },
        { name: 'Alphinaud Leveilleur', server: 'Mateus' },
        { name: 'Tataru Taru', server: 'Mateus' },
        { name: 'Minfilia Warde', server: 'Mateus' }
      ]
    };
  }

  componentDidMount() {
    // asdf
  }

  render() {
    const { names } = this.state;

    const { handleSubmit } = this.props;
    const searchFields = [];
    for (let i = 0; i < 8; i++) {
      searchFields.push(
        <PlayerSearch key={i} playerNum={i} name={names[i].name} server={names[i].server} />
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
