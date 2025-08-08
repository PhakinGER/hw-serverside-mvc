const db = require('../config/db');

const Product = {
  getAll: (callback) => {
    db.query('SELECT * FROM products WHERE is_deleted = 0', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ? AND is_deleted = 0', [id], callback);
  },
  searchByKeyword: (keyword, callback) => {
    db.query('SELECT * FROM products WHERE name LIKE ? AND is_deleted = 0', [`%${keyword}%`], callback);
  },
  create: (data, callback) => {
    const { name, price, discount, review_count, image_url } = data;
    const sql = 'INSERT INTO products (name, price, discount, review_count, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, price, discount, review_count, image_url], callback);
  },
  update: (id, data, callback) => {
    const { name, price, discount, review_count, image_url } = data;
    const sql = 'UPDATE products SET name = ?, price = ?, discount = ?, review_count = ?, image_url = ? WHERE id = ?';
    db.query(sql, [name, price, discount, review_count, image_url, id], callback);
  },
  softDelete: (id, callback) => {
    db.query('UPDATE products SET is_deleted = 1 WHERE id = ?', [id], callback);
  },
  restore: (id, callback) => {
    db.query('UPDATE products SET is_deleted = 0 WHERE id = ?', [id], callback);
  },
};

module.exports = Product;
