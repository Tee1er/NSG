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
        bids[bid.good].push({
            offerAmnt: chance.floating({
                /**Pick a random # within the price belief. */
                min: bid.priceBelief[0],
                max: bid.priceBelief[1],
            }),
            good: bid.good,
            resCallback: this.resolveBid(),
        });
    }

    /**This function resolves the bid if the agent submitted the winning offer. */

    resolveBid(bid, res) {
        //res is short for "Resolve"

        let index = this.bids.findIndex((bidElem) => (bidElem.good = element)); //unnecessary var. for readability purp.
        if (res) {
            //^ it should be noted this is the bid that goes into the offer book, NOT the one stored in the this.bids binding
            //this bid is the obj. pushed to gameState.economy.bids by submitBid()
            agent.currency -= bid.offerAmnt;

            /**Positive reinforcement - shrink the agent's price belief interval.
             * -- Get the resolved bid object, then get the agent's bid array.
             * -- Then shrink the price belief
             */

            this.bids[index].priceBelief[0] *= 1.1; //these intervals need to be altered and tested eventually for realism & gameplay purposes
            this.bids[index].priceBelief[1] *= 0.9; //is this the most efficient way? Probably not
        } else if (!res) {
            /**Expand the agent's price belief interval */
            this.bids[index].priceBelief[0] *= 0.9;
            this.bids[index].pricebelief[1] *= 1.1;
        }
    }
}
