import Encounter from './Encounter';

module.exports = class Fflog {
  constructor(data) {
    const baseData = data[0];

    // Get raw character info.
    this.characterId = baseData.characterID;
    this.name = baseData.characterName;
    this.server = baseData.server;

    this.parses = Encounter.newEncountersFromData(data);
  }
};
