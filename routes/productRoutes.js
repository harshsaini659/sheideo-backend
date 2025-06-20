const express = require('express')
const router = express.Router()
const {createProduct, getMyProducts, updateProduct} = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')

router.post('/add', protect, createProduct)
router.get('/mine', protect, getMyProducts)
router.get('/:id', protect, updateProduct)

module.exports = router