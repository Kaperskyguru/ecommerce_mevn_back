const database = require("../database/Database.js");

class Customer {

    static all(limit = 0) {
        return new Promise((resolve, reject) => {
            let sql;
            if (limit == 0) {
                sql = "SELECT * FROM customer";
            } else {
                sql = "SELECT * FROM customer LIMIT ?";
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
            let sql = "Select * from customer where customer_id = ?";
            database.execute(sql, values, (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row[0]);
            });
        });
    }

    static update(customer, id) {

        return new Promise((resolve, reject) => {
            let sql = "UPDATE customer SET department_id = ?, name = ?, description = ? where customer_id = ?";
            database.execute(sql, [customer.department_id, customer.name, customer.description, id], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            });
        });
    }

    static create(customer) {
        console.log(customer);

        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO customer (email, name, password, credit_card, address_1, address_2, city, region, postal_code, country, shipping_region_id, day_phone, eve_phone, mob_phone) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            database.execute(sql, [customer.email, customer.name, customer.password, customer.credit_card, customer.address_1, customer.address_2, customer.city, customer.region, customer.postal_code, customer.country, customer.shipping_region_id, customer.day_phone, customer.eve_phone, customer.mob_phone], (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM customer WHERE customer_id = ?";
            database.execute(sql, id, (err, row) => {
                if (err) reject(new Error(err));
                else resolve(row);
            });
        });
    }
}

module.exports = Customer;