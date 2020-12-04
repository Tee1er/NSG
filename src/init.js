/**INIT.JS --- Initializes the game, etc */

/**Set up information for the scenario */

let chance = new Chance();

let profile = {
    //Eventually, all of the scenarios will have to go in separate JSON files
    cities: [
        {
            name: "Appleopolis",
            population: 1700000,
            coordinates: [2964, 2486],
            capital: true,
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

//let profile = JSON.parse(Game.Util.readFile("../src/agents.json"));

/**A couple useful things */

let ls = window.localStorage;

let Game = {
    Util: {
        readFile: function (filePath) {
            let xmlhttp = new XMLHttpRequest();

            xmlhttp.open("GET", filePath, false);
            xmlhttp.send();
            if (xmlhttp.status == 200) {
                let result = xmlhttp.responseText;
                Game.Logs.record("LOADED FILE FROM" + filePath);
                return result;
            }
        },
    },
    /**Integrated logs.js into the Game object. */
    Logs: {
        activityLog: [],
        error: function (entry) {
            console.log(typeof this.activityLog);
            this.activityLog.push({
                time: new Date(),
                type: "error",
                entry: entry,
            });
            return this.activityLog;
        },

        record: function (entry, type) {
            if (type) {
                /**If the type variable is provided, use that as the type */
                this.activityLog.push({
                    time: new Date(),
                    type: type,
                    entry: entry,
                });
            } else if (!type) {
                /**If the type isn't provided, then use "general"*/
                this.activityLog.push({
                    time: new Date(),
                    type: "general",
                    entry: entry,
                });
            }
            return this.activityLog;
        },
        save: function () {
            ls.setItem("activityLog", JSON.stringify(this.activityLog));
        },

        load: function () {
            if (typeof ls.getItem("activityLog") == "string") {
                this.activityLog = JSON.parse(ls.getItem("activityLog")); //JSON parser is quicker & more secure than eval()
            } else if (Array.isArray(ls.getItem("activityLog"))) {
                this.activityLog = ls.getItem("activityLog");
            }
        },
    },
};

Game.Logs.load();

Game.Logs.record("LOG LOADED FROM LOCAL STORAGE");

/**gameState --- one big ol' object that stores a bunch of details on the game. */

let gameState = {
    days: 0,
    economy: {
        agents: [], //list of agent instances
        bids: {
            /**It is necessary to add more goods whenever bids are updated */
            fruit: [], // ID = 1
            vegetables: [], // ID = 2
            milk: [], // ID = 3
            meat: [], // and so on...
            grains: [],
            housing: [],
            clothing: [],
            utilities: [],
            transport: [],
            education: [],
            entertainment: [],
        },
        asks: [],
    },
}; //information about the game state

// /**If gameState is stored in local storage, just use that instead */

//FIXME - this block was causing, issues, so I commented it out | Tee1er - 12/3/20

// if (ls.getItem("gameState")) {
//     /**If game state is stored in local storage, make sure to load that up & use it instead
//      * TODO - add a "saves" system */
//     gameState = ls.getItem("gameState");
// }

/**Create all 1.5K agent instances. This *might* be an issue for performance */

for (agent of JSON.parse(Game.Util.readFile("../src/agents.json"))) {
    gameState.economy.agents.push(new Agent(agent)); //creates new agent instance & adds it to the array.
}
