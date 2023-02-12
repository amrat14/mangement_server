module.exports = {
  DB:
    process.env.DB ||
    "mongodb://tech2022:TrDJPvJuvHmwqAnd@ml-shard-00-00.zdlfa.mongodb.net:27017,ml-shard-00-01.zdlfa.mongodb.net:27017,ml-shard-00-02.zdlfa.mongodb.net:27017/?ssl=true&replicaSet=atlas-r63oyy-shard-0&authSource=admin&retryWrites=true&w=majority",
  PORT: process.env.PORT || "6061",
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
  JWT_SECRET:
    "S-opPB65jJ6JZIM4ysi_gAlrKJnNSgAq-QDr4ZbvIvwnTCOha7tBY59LVsiDkkGY",
};
