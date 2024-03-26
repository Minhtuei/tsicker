const pgConfig = require("../configs/pgConfig");
const pg = require("pg");
const pgClient = new pg.Client(pgConfig);
pgClient.connect(function (err) {
    if (err) throw err;
    pgClient.query("SELECT VERSION()", [], function (err, result) {
        if (err) throw err;

        console.log(result.rows[0].version);
        pgClient.end(function (err) {
            if (err) throw err;
        });
    });
});
module.exports = pgClient;
