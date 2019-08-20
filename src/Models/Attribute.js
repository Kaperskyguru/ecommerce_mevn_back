const database = require("../database/Database.js");
class Attribute {
    static all() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM attribute_value";
            return database.execute(sql, null, (err, rows) => {
                if (err) reject(new Error(err))
                else resolve(rows)
            })
        });
    }

    static find(attribute) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM attribute_value WHERE attribute_id = ?";
            return database.execute(sql, [attribute], (err, rows) => {
                if (err) reject(new Error(err))
                else resolve(rows)
            })
        });
    }
}

module.exports = Attribute;