/**LOGS.JS --- Provides methods for logging events */

/**Local storage init */

let ls = window.localStorage;

/**Logs namespace */

let logs = {
  activityLog: [],

  //logs.error("THE KRAKEN HAS BEEN SUMMONED")

  error: function (entry) {
    this.activityLog.push({
      time: new Date(),
      type: "error",
      entry: entry,
    });
    return this.activityLog;
  },

  //logs.record("REQUESTED SNACKS FROM MISSION CONTROL")

  record: function (entry, type) {
    //If type of entry is not given, add entry with type "general".

    if (type === undefined) {
      this.activityLog.push({
        time: new Date(),
        type: "general",
        entry: entry,
      });
    } else {
      this.activityLog.push({
        time: new Date(),
        type: type,
        entry: entry,
      });
    }

    return this.activityLog;
  },

  //logs.save()

  save: function () {
    ls.setItem("activityLog", activityLog);
  },

  //logs.load()

  load: function () {
    if (ls.getItem("activityLog") !== null) {
      this.activityLog = ls.getItem("activityLog");
    }
  },
};

logs.record("LOGS.JS LOADED.");
