const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');


// View Routes
router.get('/view', ProductController.renderList);
router.get('/view/:id', ProductController.renderDetail);


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */

router.get('/', ProductController.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product data
 */
router.get('/:id', ProductController.getById);

/**
 * @swagger
 * /products/search/{keyword}:
 *   get:
 *     summary: Search products by keyword
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching products
 */
router.get('/search/:keyword', ProductController.search);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               discount: { type: number }
 *               review_count: { type: integer }
 *               image_url: { type: string }
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', ProductController.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               discount: { type: number }
 *               review_count: { type: integer }
 *               image_url: { type: string }
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put('/:id', ProductController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Soft delete product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product soft-deleted
 */
router.delete('/:id', ProductController.softDelete);

/**
 * @swagger
 * /products/restore/{id}:
 *   put:
 *     summary: Restore soft-deleted product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product restored
 */
router.put('/restore/:id', ProductController.restore);


module.exports = router;

