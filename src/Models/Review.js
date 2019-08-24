const database = require("../database/Database.js");
let table = 'review';

class Review {
  /**
   * Retrieves all reviews
   * @returns Promise<Reviews>
   */
  static all(limit = 0) {
    return new Promise(function (resolve, reject) {
      // 
      let sql = `SELECT * FROM ${table} LIMIT ?`;
      database.execute(sql, [limit], (err, rows) => {
        if (err) reject(new Error(err));
        else resolve(rows);
      });

    });
  }

  /**
   * Finds a review by id
   * @param {Number} id review's id
   * @returns Promise<Review>
   */
  static find(id) {
    let values = [id];
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE review_id = ?`;
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
   * Finds a review by Prouct id
   * @param {Number} id review's product id
   * @returns Promise<Reviews>
   */
  static findByProductId(id) {
    let values = [id];
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE product_id = ?`;
      database.execute(sql, values, (err, row) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(row);
        }
      });
    });

  }

  /**
   * Finds a review by Prouct id
   * @param {Number} id review's customer id
   * @returns Promise<Reviews>
   */
  static findByCustomerId(id) {
    let values = [id];
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE customer_id = ?`;
      database.execute(sql, values, (err, row) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(row);
        }
      });
    });

  }

  /**
   * Creates a new review
   * @param {Object} review New review
   * @returns Promise<Review>
   */
  static create(review) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO ${table} (product_id, review, rating, created_on) VALUES (?,?,?,NOW())`;
      database.execute(sql, [review.product_id, review.review, review.star], (err, row) => {
        if (err) reject(new Error(err));
        else resolve(row);
      });
    });
  }

}

module.exports = Review