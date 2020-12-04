/**EVENTLOOP.JS --- Updates game state once per minute (60s IRL = 1 day in NSG) */

setInterval(function () {
    /**Save the activity log to local storage */
    logs.record("SAVING ACTIVITY LOG TO LOCAL STORAGE");

    logs.save();

    logs.record("ACTIVITY LOG SAVED.");

    /**Record gameState in local storage */

    ls.setItem("gameState", gameState);

    /**Increment day counter */

    gameState.days++; //is 1 day = 5m IRL too long or too short?

    /**Update economic simulation */
}, 300000);
