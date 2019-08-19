const database = require("../database/Database.js");

class Category {

    static all(limit = 0) {
        return new Promise((resolve, reject) => {
            let sql;
            if (limit == 0) {
                sql = "SELECT * FROM category";
            } else {
                sql = "SELECT * FROM category LIMIT ?";
            }
            database.execute(sql, [limit], (err, rows) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static find(id) {
        let values = [id];
        return new Promise((resolve, reject) => {
            let sql = "Select * from category where category_id = ?";
            database.execute(sql, values, (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row[0]);
            });
        });
    }

    static update(category, id) {

        return new Promise((resolve, reject) => {
            let sql = "UPDATE category SET department_id = ?, name = ?, description = ? where category_id = ?";
            database.execute(sql, [category.department_id, category.name, category.description, id], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            });
        });
    }

    static create(category) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO category (department_id, name, description) VALUES (?,?,?)";
            database.execute(sql, [category.department_id, category.name, category.description], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM category WHERE category_id = ?";
            database.execute(sql, id, (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            });
        });
    }
}

module.exports = Category;