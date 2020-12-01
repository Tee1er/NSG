/**> node agentGenerator.js */

let fs = require("fs");
let Chance = require("chance");

let chance = new Chance();

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, { flag: "a+" }, (err) => {
    console.error(err);
  });
  return content;
}

console.log("NSG Agent Generator v0.1 - For NSG v0.1 (c) 2020 Tyler Song");

let agents = [];

/**It should be noted that this is a TEMPLATE profile for a scenario - in this case, it's the Fu Republic.
 * If you use this, you're probably looking to tweak some value. Full modding support maybe coming soon?
 * It should also be noted that the Fu Republic profile/scenario is based off of the real-life country
 * of New Zealand, but with some slighty-diff #'s. */

/**In addition, the NSG economic system as a whole is based off Emergent Economies for Role Playing Games,
 *  by Jonathon Doran & Ian Parberry.*/

/**Data from StatsNZ */

for (let i = 0; i < 1024; i++) {
  let agent = {};

  agent.id = chance.guid();

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
        break;
      case "teenager":
        agent.age = chance.age({ type: "teen" });
        break;
      case "adult":
        agent.age = chance.age({ type: "adult" });
        break;
      case "senior":
        agent.age = chance.age({ type: "senior" });
        break;
    }

    /**Generate genders - while in real life, inequality between sexes does exist,
     * I didn't feel there was a need to add this to NSG.
     */
    agent.gender = chance.gender();

    /**Generate financial assets - basically usable currency, I believe - not an econ. person tho */

    if (agent.age <= 18) {
      agent.currency = 0;
    } else if (agent.age <= 24) {
      agent.currency = chance.normal({ mean: 2000, dev: 20000 });
    } else if (agent.age <= 34) {
      console.log(34);
      agent.currency = chance.normal({ mean: 15000, dev: 15000 });
    } else if (agent.age <= 44) {
      console.log(44);
      agent.currency = chance.normal({ mean: 20000, dev: 15000 });
    } else if (agent.age <= 54) {
      console.log(54);
      agent.currency = chance.normal({ mean: 35000, dev: 10000 });
    } else if (agent.age <= 64) {
      console.log(64);
      agent.currency = chance.normal({ mean: 55000, dev: 15000 });
    } else if (agent.age <= 74) {
      console.log(74);
      agent.currency = chance.normal({ mean: 65000, dev: 30000 });
    } else if (agent.age >= 75) {
      console.log(75);
      agent.currency = chance.normal({ mean: 30000, dev: 35000 });
    }

    /**Generate the agent's name - mostly useful for News Feed articles, I predict. */
    agent.name = chance.name({ gender: agent.gender.toLowerCase() });

    /**Generate the agent's  bids (offers to buy something).
     * As of v0.1 12/1/20 all agents purchase the same commodities.
     * TODO: Customize commodities to specific agents in v0.2 or v0.3*/

    let bidsTemplate = [
      {
        good: "fruit",
        priceBelief: [0.08, 0.28],
      },
      {
        good: "vegetables",
        priceBelief: [0.06, 0.18],
      },
      {
        good: "milk",
        priceBelief: [0.2, 0.6],
      },
      {
        good: "meat",
        priceBelief: [0.5, 2.5],
      },
      {
        good: "grains",
        priceBelief: [0.06, 0.18],
      },
      {
        good: "housing",
        priceBelief: [50, 250], //more important goods have wider price belief intervals
      },
      {
        good: "clothing",
        priceBelief: [10, 30],
      },
      {
        good: "utilities",
        priceBelief: [80, 160],
      },
      {
        good: "transport",
        priceBelief: [5, 9],
      },
      {
        good: "education",
        priceBelief: [3, 11],
      },
      {
        good: "entertainment",
        priceBelief: [15, 25],
      },
    ];
    //Iterate through bidsTemplate & give each agent slightly different price beliefs.

    for (bid of bidsTemplate) {
      bid.priceBelief[0] = bid.priceBelief[0] *= chance.normal();
      bid.priceBelief[1] = bid.priceBelief[1] *= chance.normal();
      bid.priceBelief.sort();
    }

    agent.bids = bidsTemplate;

    /**Generate each agent's profession if of correct age, which in turn determines their asks (what they sell) */

    if (agent.age >= 18) {
      agent.asks = [chance.profession()];
    }

    agents.push(agent);
  }
}

writeFile("agents.json", JSON.stringify(agents));
