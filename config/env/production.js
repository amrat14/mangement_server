module.exports = {
  DB:
    process.env.DB ||
    "mongodb://ml-admin:NHrOatSnZbzhf3UO@ac-pgg5wch-shard-00-00.2g7dejg.mongodb.net:27017,ac-pgg5wch-shard-00-01.2g7dejg.mongodb.net:27017,ac-pgg5wch-shard-00-02.2g7dejg.mongodb.net:27017/ML-DB-01?ssl=true&replicaSet=atlas-njxtu1-shard-0&authSource=admin&retryWrites=true&w=majority",
  PORT: process.env.PORT || "6061",
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
  JWT_SECRET:
    "S-opPB65jJ6JZIM4ysi_gAlrKJnNSgAq-QDr4ZbvIvwnTCOha7tBY59LVsiDkkGY",
  AWS_SECRET_ACCESS_KEY: "MJKBQrhaixYfhryxYaqFdnsnijg0dnhjRBg3XJ80",
  AWS_SECRET_ACCESS_ID: "AKIATSYIDK4GIP4UJQET",
};
