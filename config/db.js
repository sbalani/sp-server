require("dotenv").config();
const mysql = require("mysql2");
//const { DatabaseError } = require('pg');

/*
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
});
*/

const pool = mysql.createPool({
    host: "l6glqt8gsx37y4hs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "pxcdgwoth0ir2mjk",
    database: "a8r1ltvklmu2edni",
    password: "mnmh0ex5x8cn9z24",
});




let sql = "SELECT * FROM a8r1ltvklmu2edni.history WHERE battle_queue_id = 'c9d3b611e40d2411a35d44009359b37e0cf2fb06';";

pool.execute(sql, function (err, result) {

    if (err) throw err;

    console.log(result);

})

module.exports = pool.promise();