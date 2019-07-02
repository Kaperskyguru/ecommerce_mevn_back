const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "turing_ecommerce_db",
    password: "Changeless11!"
});

connection.connect(err => {
    if (err) {
        console.log(`${err} Error connecting to database`);
        return;
    }
    console.log("connection established");
});

module.exports = connection;