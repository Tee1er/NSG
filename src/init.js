/**INIT.JS --- Initializes the game, etc */

const { Chance } = require("chance");
const { PassThrough } = require("stream");

/**Loads activityLog from local storage, and records that in the log. */

logs.load(); //loads logs from local storage

logs.record("LOG LOADED FROM LOCAL STORAGE"); //record that

/**A couple useful functions */

function readFile(filePath) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        let result = xmlhttp.responseText;
        logs.record("LOADED FILE FROM" + filePath);
        return result;
    }
}

/**Set up information for the scenario */
let scenario = { //Eventually, all of the scenarios will have to go in separate JSON files
    cities: [
        {
            name: "Appleopolis",
            population: 1700000,
            coordinates: [2964, 2486],
        },
        {
            name: "Orchard Heights",
            population: 842000,
            coordinates: [1985, 2479],
        },
        {
            name: "Bearing",
            population: 651000,
            coordinates: [2156, 1916],
        },
        {
            name: "Mcintosh City",
            population: 311000,
            coordinates: [2751, 2248],
        },
        {
            name: "Frederick",
            population: 108000,
            coordinates: [2724, 2770],
        },
        {
            name: "Fuzz Canyon",
            population: 67000,
            coordinates: [2558, 2381],
        },
        {
            name: "Topaz Valley",
            population: 44000,
            coordinates: [2341, 2370],
        },
        {
            name: "Brownton",
            population: 42000,
            coordinates: [3285, 2805],
        },
        {
            name: "Fiberton Plains",
            population: 28000,
            coordinates: [2138, 2342],
        },
        {
            name: "Appleseed",
            population: 14000,
            coordinates: [3181, 2500],
        },
    ],
};

/**gameState --- stores the current state of the game*/

let gameState = {}; //gameState object contains, stuff, I guess about the game state. get it?

if (ls.getItem("gameState")) {
    gameState = ls.getItem("gameState");
} else {
    //This is the default
    gameState = {
        days: 0,
        agents: [], // will contain multiple instances (hundreds to thousands) of the Agent() class defined below
        //more facts and figures here...
    };
}

/**Agents - very important for an agent-based sim. This isn't in economy.js
 * b/c agents (eventually) will do more than just trade amongst themselves.
*/
class Agent {
    constructor(agentObj) { //agentObj
        this.id = agentObj.id;
        this.type = agentObj.type;
        this.age = agentObj.age;
        this.gender = agentObj.gender;
        this.currency = agentObj.currency;
        this.name = agentObj.name;

        this.bids = agentObj.bids;
        this.asks = agentObj.asks
    }

    updateState() {
        if (this.currency <= 0) {
            logs.record(`BEGINNING DELETION PROCESS FOR AGENT ${this.id}.`)
            this.deleteAgent()
        }

        if (Chance.pickone(["a", "b"]) == "b") { //purchase something
            submitBid(chance.pickone(this.bids))
        } else {
            submitBid(chance.pickone(this.asks)) //this is not specific to any agent type
        }
    }

    deleteAgent() {};
}