const envUtils = require("profile-base/common/envUtils");
const { Pool } = require("pg");

envUtils.loadEnv();
const pool = new Pool({
  user: envUtils.get("DATABASE_USER"),
  host: envUtils.get("DATABASE_HOST"),
  database: envUtils.get("DATABASE_NAME"),
  password: envUtils.get("DATABASE_PASS"),
  port: envUtils.get("DATABASE_PORT")
});


module.exports = pool;