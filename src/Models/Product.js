const database = require("../database/Database.js");
class Product {

  /**
   * Retrieves all products
   * @returns Promise
   */
  static all(limit) {
    return new Promise(function (resolve, reject) {
      let sql = "Select * from product LIMIT ?";
      database.execute(sql, [limit], (err, rows) => {
        if (err) reject(new Error(err));
        else resolve(rows);
      });

    });
  }


  // , (err, rows) => {
  //   if (err) {
  //     reject(new Error(err));
  //   } else {
  //     resolve(rows);
  //   }
  // })

  /**
   * Finds a product by id
   * @param {Number} id Product's id
   * @returns Promise
   */
  static find(id) {
    let values = [id];
    return new Promise((resolve, reject) => {
      let sql = "Select * from product where product_id = ?";
      database.execute(sql, values, (err, row) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(row[0]);
        }
      });
    });

  }

  /**
   * Creates a new Product
   * @param {Object} product New Product
   * @returns Promise
   */
  static create(product) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO product (name, description, price, discounted_price, image, image_2, thumpnail, display) VALUES (?,?,?,?,?,?,?,?)";
      database.execute(sql, [product.name, product.description, product.price, product.discounted_price, product.image, product.image_2, product.thumpnail, product.display, ], (err, row) => {
        if (err) reject(new Error(err));
        else resolve(row);
      });
    });
  }

}

module.exports = Product;