import React, { Component } from 'react';
import './app.css';
import queryString from 'query-string';
import axios from 'axios';

function getArray(value) {
  if (value == null || value == undefined) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.sort();
  }

  return [value];
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estinien: false
    };
  }

  // Submitting the form: Get the new data, and update the querystring
  handleSubmit = event => {
    //Grab the important details from the state
    const details = {
      estinien: this.state.estinien
    };

    // Call the API to get the new data
    this.getStreams(details);

    // Update the querystring. Sorting just so that the less-spammy params get listed first
    const order = ['estinien'];
    const newParams =
      '?' +
      queryString.stringify(details, {
        sort: (left, right) => order.indexOf(left) >= order.indexOf(right)
      });

    this.pushNewState(newParams);

    if (event) event.preventDefault();
  };

  pushNewState(newUrl) {
    if (history.pushState) window.history.pushState({ path: newUrl }, '', newUrl);
    else window.location.href = newUrl;
  }

  componentDidMount() {
    const qs = queryString.parse(window.location.search);

    //Set the state based on querystring values as appropriate
    this.setState(
      {
        estinien: qs.estinien !== 'false'
      },
      () => {
        //After the state values are set, make our initial query.
        console.log('fetch stuff, dawg');
      }
    );
  }

  render() {
    const { estinien } = this.state;

    return (
      <div id="home" className="row py-1">
        Hello world, Estinien values currently {estinien ? 'true' : 'false'}
      </div>
    );
  }
}
