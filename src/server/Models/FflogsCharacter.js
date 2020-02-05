module.exports = class Fflog {
  constructor(data) {
    const baseData = data[0];

    // Get raw character info.
    this.characterId = baseData.characterID;
    this.name = baseData.characterName;
    this.server = baseData.server;

    // Start working on getting relevant parse data
    const simplifiedData = data
      // Only worry about data from current patch, and Savage difficulty
      .filter(parse => parse.difficulty === 101 && parse.ilvlKeyOrPatch === 5.1)

      // Remove irrelevant properties from the objects
      .map((parse) => {
        const {
          duration,
          startTime,
          difficulty,
          characterID,
          characterName,
          server,
          ilvlKeyOrPatch,
          estimated,

          // Not sure whether to keep the following or not
          rank,
          outOf,
          reportID,
          fightID,
          total,
          // End uncertainty
          ...important
        } = parse;

        return important;
      });

    const encounters = [];

    simplifiedData.forEach((parse) => {
      const { encounterID, encounterName, spec, percentile } = parse;
      let index = encounters.length;
      const prev = index - 1;

      let classes = {};

      // If this is the first log for this raid, set base data
      if (index === 0 || (encounters[prev] && encounters[prev].encounterID !== encounterID)) {
        encounters[index] = {
          encounterID,
          encounterName,
          classes
        };
      }
      // If not the first log for the raid, then point back to existing data for it
      else {
        index = prev;
        classes = encounters[index].classes;
      }

      // Update the class' data with the current log's class
      classes[spec] = percentile;

      // Update the encounter with the updated class data
      encounters[index].classes = classes;
    });

    this.parses = encounters;
  }
};
