import React, { Component } from 'react';
import PlayerSearch from './PlayerSearch';
import SubmitButton from './SubmitButton';
// import './BatchLookup.css';

export default class BatchLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estinien: false
    };
  }

  componentDidMount() {
    // asdf
  }

  render() {
    const searchFields = [];
    for (let i = 0; i < 8; i++) {
      searchFields.push(<PlayerSearch playerNum={i} />);
    }

    return (
      <div>
        {searchFields}
        <br />
        <SubmitButton />
      </div>
    );
  }
}
