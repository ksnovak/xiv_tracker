import React, { Component } from 'react';
import './app.css';
import BatchLookup from './Widgets/BatchLookup';
import ResultsTable from './Widgets/ResultsTable';
import queryString from 'query-string';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: new Array(8),
      parses: [],
      tier: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  //Properly capitalize names for cleanliness
  //For each word, force first letter to be Upper, and all subsequent letters to be lower
  setNameCase(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  handleSearchChange(event) {
    // Figure out which field was updated, for which player, and what its new value is
    let { name, value } = event.target;

    //Minor override needed; having the character name field be named "name" causes questionable autocomplete
    if (name === 'playerName') {
      name = 'name';
    }

    const playerNum = event.target.getAttribute('playernum');

    // Grab the existing player list, and update the specific player
    const existingValues = this.state.names;

    //If there isn't an object yet for this index, create an empty one
    if (playerNum >= existingValues.length) {
      existingValues[playerNum] = {};
    }

    existingValues[playerNum][name] = this.setNameCase(value);

    // Push the updated player list to the state
    this.setState({ names: existingValues });
  }

  // Take the names and servers and turn them into a querystring to submit
  createQueryString(names) {
    let lookupParams = '?';

    names.forEach(char => {
      //Only add someone if there is both a name and a server, otherwise just pass over them
      if (char.name && char.name.length && char.server) {
        lookupParams += `name[]=${char.name}@${char.server}&`;
      }
    });

    //Remove trailing ampersand
    return lookupParams.slice(0, lookupParams.length - 1);
  }

  //Take a querystring set of names and turn them into objects
  parseQueryString(querystring) {
    //No querystring passed, return early
    if (!querystring) {
      return [];
    }

    //A single name specified, needs to individually be parsed and returned wrapped in an array
    if (typeof querystring == 'string') {
      const [name, server] = querystring.split('@');
      return [{ name, server }];
    }

    //Multiple names passed, parse them and return them all
    return querystring.map(value => {
      const [name, server] = value.split('@');
      return { name, server };
    });
  }

  updateNamesWithParses(names, parses) {
    let parsePointer = 0;

    //Go through the names in state, and add their associated parses
    for (let i = 0; i < names.length; i++) {
      //Extra check to make sure this value in state is a truthy one before associating a parse with it
      if (names[i].name && names[i].name.length) {
        names[i].parses = parses[parsePointer].parses;
        parsePointer++;
      }
    }

    return names;
  }

  performBatchLookup(queryString) {
    axios
      .get(`/api/fflogs/batch${queryString}`)
      .then(results => {
        const { names } = this.state;
        const { data } = results;

        this.setState({ names: this.updateNamesWithParses(names, data) });
      })
      .catch(err => {
        console.log(`Batch lookup error`);
        console.log(err);
      });
  }


  // Get the names of the fights and their respective IDs
  getTierInfo() {
    console.log('Calling getTierInfo!')
    axios
      .get(`/api/fflogs/tiers`)
      .then(results => {
        this.setState({ tier: results ? results.data : null })
      })
  }

  // Submitting the form: Get the new data, and update the querystring
  handleSubmit = event => {
    // //Grab the important details from the state
    const queryString = this.createQueryString(this.state.names);

    this.performBatchLookup(queryString);

    this.pushNewState(queryString);

    if (event) event.preventDefault();
  };

  // Update the URL to make a bookmark-able page to visit
  pushNewState(newUrl) {
    if (history.pushState) window.history.pushState({ path: newUrl }, '', newUrl);
    else window.location.href = newUrl;
  }

  componentDidMount() {
    //Grab the Name@Server list from querystring, turn it into an array of objects
    const qs = queryString.parse(window.location.search);
    const names = this.parseQueryString(qs['name[]']);


    this.getTierInfo();

    //Set the state based on querystring values as appropriate
    this.setState(
      {
        names: names
      },
      () => {
        //If there were names passed, then do an immediate lookup
        if (names.length) this.handleSubmit();
      }
    );
  }

  render() {
    const { names, parses, tier } = this.state;
    return (
      <div id="home">
        Welcome to my internet
        <br />
        <BatchLookup
          handleSearchChange={this.handleSearchChange}
          handleSubmit={this.handleSubmit}
          names={names}
        />
        <ResultsTable names={names} tier={tier} />
      </div>
    );
  }
}
