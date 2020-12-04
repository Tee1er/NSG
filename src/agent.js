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
             this.deleteAgent();
        }

        /**Choose whether or not to sell something (ask)
         * or buy something (bid)
         */

        if (Chance.pickone(["a", "b"]) == "b") {
            /**Purchase an item randomly picked from the agent's bids. */
            this.submitBid(chance.pickone(this.bids));
        } else {
            /**Sell an item randomly picked from the agent's asks. */
            this.submitAsk(chance.pickone(this.asks)); //if there's just 1 offer (indiv. agents), that will always be picked (obviously)
        }
    }

    /**Remove agent from gameState.economy.agents (for performance purposes)
     */

    deleteAgent() {
        let agentIndex = gameState.economy.agents.indexOf(this);

        gameState.economy.agents.splice(agentIndex, 1);
    }

    /**Submit a bid into the bid book (see Emergent Economies for Role Playing Games, the
     * technical paper that NSG's econ. system is based on, for more) */

    submitBid(bid) {
        let offerPrice = chance.floating({min: bid.})
    }
}
