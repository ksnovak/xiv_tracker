import React, { Component } from 'react';
import './app.css';
import BatchLookup from './Widgets/BatchLookup';
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
      server: null,
      name: null
    };
  }

  // Submitting the form: Get the new data, and update the querystring
  handleSubmit = event => {
    //Grab the important details from the state
    const details = {
      server: this.state.server,
      name: this.state.name
    };

    // Call the API to get the new data
    this.getStreams(details);

    // Update the querystring. Sorting just so that the less-spammy params get listed first
    const order = ['server', 'name'];
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
        server: qs.server,
        name: qs.name
      },
      () => {
        //After the state values are set, make our initial query.
        console.log('fetch stuff, dawg');
      }
    );
  }

  render() {
    const { server, name } = this.state;

    return (
      <div id="home">
        Welcome to my internet
        <br />
        <BatchLookup />
      </div>
    );
  }
}
