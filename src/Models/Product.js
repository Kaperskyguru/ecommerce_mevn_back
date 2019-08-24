const database = require("../database/Database.js");
class Product {

  /**
   * Retrieves all products
   * @returns Promise
   */
  static all(limit = 0) {
    return new Promise(function (resolve, reject) {
      // 
      let sql = "SELECT pc.product_id, c.name AS category, pc.category_id, p.* FROM product_category AS pc INNER JOIN product AS p ON pc.product_id = p.product_id JOIN category AS c ON c.category_id = pc.category_id LIMIT ?";
      database.execute(sql, [limit], (err, rows) => {
        if (err) reject(new Error(err));
        else resolve(rows);
      });

    });
  }

  /**
   * Finds a product by id
   * @param {Number} id Product's id
   * @returns Promise
   */
  static find(id) {
    let values = [id];
    return new Promise((resolve, reject) => {
      let sql = "SELECT pc.product_id, c.name AS category, pc.category_id, p.* FROM product_category AS pc INNER JOIN product AS p ON pc.product_id = p.product_id JOIN category AS c ON c.category_id = pc.category_id WHERE p.product_id = ?";
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

  static getProductsByCategory(id) {
    return ProductCategory.productsByCategoryId(id)
  }

  static totalProductsInCategory(id) {
    return ProductCategory.totalProductsInCategory(id);
  }

  static getProductCategories() {
    return ProductCategory.all()
  }

}

//==================== PRODUCT CATEGORY ================================//

class ProductCategory {
  static productsByCategoryId(id) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT pc.product_id, c.name AS category, p.* FROM product_category AS pc JOIN product AS p ON pc.product_id = p.product_id JOIN category AS c ON c.category_id = pc.category_id WHERE pc.category_id = ?";
      database.execute(sql, [id], (err, row) => {
        if (err) reject(new Error(err));
        else resolve(row);
      });
    });
  }

  static totalProductsInCategory() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT count(pc.category_id) AS total, c.name FROM product_category AS pc JOIN category AS c ON pc.category_id = c.category_id GROUP BY pc.category_id";
      database.execute(sql, (err, count) => {
        if (err) reject(new Error(err))
        else {
          resolve(count)
        }
      });
    });
  }

  static all() {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM product_category";
      database.execute(sql, (err, rows) => {
        if (err) reject(new Error(err))
        else resolve(rows)
      });
    });
  }
}

module.exports = Product;