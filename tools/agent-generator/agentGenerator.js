let fs = require("fs");
let chance = require("chance");

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, { flag: "a+" }, (err) => {
    console.error(err);
  });
  return content;
}

let agents = [];

/**It should be noted that this is a TEMPLATE profile for a scenario - in this case, it's the Fu Republic.
 * If you use this, you're probably looking to tweak some value. Full modding support maybe coming soon?
 * It should also be noted that the Fu Republic profile/scenario is based off of the real-life country
 * of New Zealand, but with some slighty-diff #'s. */

/**Data from StatsNZ */

for (let i = 0; i < 1024; i++) {
  let agent = {};

  if (chance.weighted([0, 1], [95, 5]) == 0) {
    // If weighted # = 0 generate an individual-type agent.

    //Some ages are more likely than others as a population changes - remember that these default scenarios will CHANGE over time

    /**Generate ages - based on data from StatsNZ */
    switch (
      chance.weighted(
        ["child", "teenager", "adult", "senior"],
        [21, 19, 40, 20] //EX: "child" has a 21% chance of being generated, while "adult" has a 40% chance.
      )
    ) {
      case "child":
        agent.age = chance.age({ type: "child" });
      case "teenager":
        agent.age = chance.age({ type: "teen" });
      case "adult":
        agent.age = chance.age({ type: "adult" });
      case "senior":
        agent.age = chance.age({ type: "senior" });
    }

    /**Generate financial assets - basically usable currency, I believe - not an econ. person tho */

    if (agent <= 24) {
      agent.financialAssets = chance.normal({ mean: 2000, dev: 20000 });
    } else if (agent <= 34) {
      agent.financialAssets = chance.normal({ mean: 15000, dev: 15000 });
    } else if (agent <= 44) {
      agent.financialAssets = chance.normal({ mean: 20000, dev: 15000 });
    } else if (agent <= 54) {
      agent.financialAssets = chance.normal({ mean: 35000, dev: 10000 });
    } else if (agent <= 64) {
      agent.financialAssets = chance.normal({ mean: 55000, dev: 15000 });
    } else if (agent <= 74) {
      agent.financialAssets = chance.normal({ mean: 65000, dev: 30000 });
    } else if (agent >= 75) {
      agent.financialAssets = chance.normal({ mean: 30000, dev: 35000 });
    }

    agents.push(agent);
  }
}
