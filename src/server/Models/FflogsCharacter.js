module.exports = class Fflog {
  constructor(data) {
    const baseData = data[0];

    this.characterId = baseData.characterID;
    this.name = baseData.characterName;
    this.server = baseData.server;

    this.parses = ['a', 'b', 'c'];
  }
};
