const database = require("../database/Database.js");

class Client {

    static find(username) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM clients WHERE username = ?";
            database.execute(sql, [username], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row[0]);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM clients WHERE id = ?";
            database.execute(sql, [id], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row[0]);
            });
        });
    };

    static create(client) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO clients (password, username, secret) VALUES (?,?,?)";
            database.execute(sql, [client.password, client.username, client.secret], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            })
        });
    }

}


module.exports = Client;