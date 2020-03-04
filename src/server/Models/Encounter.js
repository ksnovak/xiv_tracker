/**
 * An Encounter is defined as a specific raidboss or instance, which may have multiple parses (i.e. one for each class)
 */
module.exports = class Encounter {
  constructor({ encounterID, encounterName }) {
    this.encounterID = encounterID;
    this.encounterName = encounterName;
  }

  static newEncountersFromData(parses) {
    const encounters = [];

    parses.forEach((parse) => {
      const { difficulty, ilvlKeyOrPatch } = parse;

      // Only look for parses from Savage content, and current patch.
      if (difficulty === 101 && ilvlKeyOrPatch === 5.1) {
        const { encounterID, encounterName, spec, percentile } = parse;

        // Define some indexes to compare in the array
        let index = encounters.length;
        const prev = index - 1;

        let classes = {};

        // If this is the first log for this boss, set base data
        if (index === 0 || (encounters[prev] && encounters[prev].encounterID !== encounterID)) {
          encounters[index] = new Encounter({ encounterID, encounterName });
        }

        // If the boss already exists, we need to grab the existing parses for it, as well as modify the pointer
        else {
          index = prev;
          classes = encounters[index].classes;
        }

        // Add the current class to the array of classes, and then add them all to the whole encounter
        classes[spec] = parseInt(percentile, 10);
        encounters[index].classes = classes;
      }
    });

    return encounters;
  }
};
