const database = require("../database/Database.js");

class Order {


    static all() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM orders";
            database.execute(sql, (err, rows) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(rows);
                }
            });
        });

    }

    static find(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM orders WHERE order_id = ?";
            database.execute(sql, id, (err, rows) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(rows[0]);
                }
            });
        });

    }

    static update(order, id) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE orders SET total_amount = ?, shipped_on = ?, status = ?, comments = ?, customer_id = ?, auth_code = ?, reference = ?, shipping_id = ?, tax_id = ? WHERE order_id = ?";
            database.execute(sql, [order.total_amount, order.shipped_on, order.status, order.comments, order.customer_id, order.auth_code, order.reference, order.shipping_id, order.tax_id, id], (err, rows) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(rows);
                }
            });
        });
    }


    static add(order) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT orders (total_amount, shipped_on, status, comments, customer_id, auth_code, reference, shipping_id, tax_id) VALUES (?,?,?,?,?,?,?,?,?)";
            database.execute(sql, [order.total_amount, order.shipped_on, order.status, order.comments, order.customer_id, order.auth_code, order.reference, order.shipping_id, order.tax_id], (err, rows) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    order.items.order_id = rows.insertId;
                    Order_Items.createItem(order.items)
                    resolve(rows);
                }
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM orders WHERE order_id = ?";
            database.execute(sql, id, (err, rows) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

class Order_Items {

    static createItem(order) {
        const values = [];

        order.forEach((product) => {
            let arr = [];
            arr.push(order.order_id);
            arr.push(product.product_id);
            arr.push(product.attributes || "Electronics");
            arr.push(product.name);
            arr.push(product.quantity | 1);
            arr.push(product.price);
            values.push(arr);
        });

        return new Promise((resolve, reject) => {
            let sql = "INSERT order_detail (order_id, product_id, attributes, product_name, quantity, unit_cost) VALUES ?";
            //LOOP HERE OR STORE MULTIPLE ITEMS
            database.query(sql, [values], (err, rows, fields) => {
                if (err) {
                    // console.log(this.sql);
                    reject(new Error(err));
                } else {
                    resolve(rows);
                }
            });
            // console.log(query.sql);
        });
    }

}


module.exports = Order;