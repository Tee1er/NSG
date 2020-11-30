// /**EVENTLOOP.JS --- Updates game state once per minute (60s IRL = 1 day in NSG) */

//     setInterval(function () {

//         /**update game state */

//             gameState.days++

//             //Stuff here ¯\_(ツ)_/¯
        
//         /**Save gameState to local storage. */
//         ls.setItem("gameState", gameState);
//     }, 60000)

//     setInterval (function () {
//         /**Save the activity log to local storage */
//         logs.record("SAVING ACTIVITY LOG TO LOCAL STORAGE");

//         logs.save();

//         logs.record("ACTIVITY LOG SAVED.");
//     }, 300000)