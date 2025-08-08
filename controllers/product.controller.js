
const ProductController = {
  getAll: (req, res) => {
    Product.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },
  getById: (req, res) => {
    Product.getById(req.params.id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results[0] || {});
    });
  },
  search: (req, res) => {
    Product.searchByKeyword(req.params.keyword, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },
  create: (req, res) => {
    Product.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, message: 'Product created' });
    });
  },
  update: (req, res) => {
    Product.update(req.params.id, req.body, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product updated' });
    });
  },
  softDelete: (req, res) => {
    Product.softDelete(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product soft-deleted' });
    });
  },
  restore: (req, res) => {
    Product.restore(req.params.id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product restored' });
    });
  },
};

module.exports = ProductController;


// View rendering
const Product = require('../models/product.model');

ProductController.renderList = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).send('DB Error');
    res.render('product-list', { products: results });
  });
};

ProductController.renderDetail = (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err || !results.length) return res.status(404).send('Product not found');
    res.render('product-detail', { product: results[0] });
  });
};
