/**
 * An Encounter is defined as a specific raidboss or instance, which may have multiple parses (i.e. one for each class)
 */
module.exports = class Encounter {
  constructor({ encounterID, encounterName }) {
    this.encounterID = encounterID;
    this.encounterName = encounterName;
    this.classes = {};
  }

  static newEncountersFromData(parses) {
    const encounters = {};

    parses.forEach((parse) => {
      const { difficulty, ilvlKeyOrPatch } = parse;

      // Only look for parses from Savage content
      if (difficulty === 101) {
        const { encounterID, encounterName, spec, percentile } = parse;

        // If this is the first parse for this specific encounter, define the encounter
        if (!encounters[encounterName]) {
          encounters[encounterName] = new Encounter({ encounterID, encounterName });
        }

        // Add the job's parse to the encounter as a whole number
        encounters[encounterName].classes[spec] = parseInt(percentile, 10);
      }
    });
    return encounters;
  }
};
