/**Agents - very important for an agent-based sim. This isn't in economy.js
 * b/c agents (eventually) will do more than just trade amongst themselves.
 */
class Agent {
    constructor(agentObj) {
        //the objects describing agents from src/agents.json provides i
        this.id = agentObj.id;
        this.type = agentObj.type;
        this.age = agentObj.age;
        this.gender = agentObj.gender;
        this.currency = agentObj.currency;
        this.name = agentObj.name;

        this.bids = agentObj.bids;
        this.asks = agentObj.asks;
    }

    updateState() {
        if (this.currency <= 0) {
            logs.record(`BEGINNING DELETION PROCESS FOR AGENT ${this.id}.`);
            this.deleteAgent();
        }

        if (Chance.pickone(["a", "b"]) == "b") {
            /**Purchase an item randomly picked from the agent's bids. */
            submitBid(chance.pickone(this.bids));
        } else {
            /**Sell an item randomly picked from the agent's asks. */
            submitAsk(chance.pickone(this.asks)); //if there's just 1 offer (indiv. agents), that will always be picked (obviously)
        }
    }

    deleteAgent() {}
}
