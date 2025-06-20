const express = require('express')
const router = express.Router()
const {createProduct, getMyProducts, updateProduct, deleteProduct} = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')

router.post('/add', protect, createProduct)
router.get('/mine', protect, getMyProducts)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct);


module.exports = router