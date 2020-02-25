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
      // names: new Array(8)
      names: [
        { name: 'Warrior Of-light', server: 'Coeurl' },
        { name: 'Thancred Waters', server: 'Coeurl' },
        { name: 'Urianger Augurelt', server: 'Coeurl' },
        { name: "Y'shtola Rhul", server: 'Coeurl' },
        { name: 'Alisaie Leveilleur', server: 'Zalera' },
        { name: 'Alphinaud Leveilleur', server: 'Mateus' },
        { name: 'Tataru Taru', server: 'Mateus' },
        { name: 'Minfilia Warde', server: 'Mateus' }
      ]
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    // Figure out which field was updated, for which player, and what its new value is
    const { name, value } = event.target;
    const playerNum = event.target.getAttribute('playernum');

    // Grab the existing player list, and update the specific player
    const existingValues = this.state.names;
    existingValues[playerNum][name] = value;

    // Push the updated player list to the state
    this.setState({ names: existingValues });
  }

  performBatchLookup(names) {
    //Turn name and server into Name@Server for simplified handling
    const lookupParams = '?name=' + names.map(name => `${name.name}@${name.server}`).join('&name=');
    console.log(lookupParams);

    axios
      .get(`/api/fflogs/batch${lookupParams}`)
      .then(results => {
        console.log('Neato~ response was');
        console.log(results);
      })
      .catch(err => {
        console.log(`o we fucked uop`);
        console.log(err);
      });
  }

  // Submitting the form: Get the new data, and update the querystring
  handleSubmit = event => {
    // //Grab the important details from the state
    const { names } = this.state;

    // // Call the API to get the new data
    // this.getStreams(details);

    // // Update the querystring. Sorting just so that the less-spammy params get listed first
    // const order = ['region', 'names'];
    // const newParams =
    //   '?' +
    //   queryString.stringify(details, {
    //     sort: (left, right) => order.indexOf(left) >= order.indexOf(right)
    //   });

    // this.pushNewState(newParams);
    this.performBatchLookup(names);

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
    return (
      <div id="home">
        Welcome to my internet
        <br />
        <BatchLookup
          handleSearchChange={this.handleSearchChange}
          handleSubmit={this.handleSubmit}
          names={this.state.names}
        />
      </div>
    );
  }
}
