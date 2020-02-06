import Encounter from './Encounter';
/**
 * A character is the collection of all encounters and parses for an in-game character
 */
module.exports = class FflogsCharacter {
  constructor(data) {
    // Make sure the character has any results at all before proceeding
    if (data.length) {
      const baseData = data[0];

      // Get raw character info.
      this.characterId = baseData.characterID;
      this.name = baseData.characterName;
      this.server = baseData.server;

      this.parses = Encounter.newEncountersFromData(data);
    }
  }
};
