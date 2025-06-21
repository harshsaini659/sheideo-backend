const Product = require('../models/productModel')

exports.createProduct = async (req, res) => {
  const { title, description, price, stock, category, images } = req.body

  try{
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can add products' })
    }

    const product = new Product({
        seller: req.user._id,
        title,
        description,
        price,
        stock,
        category,
        images,
    })

    await product.save()
    res.status(201).json({ message: 'Product created', product })
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id })
    res.status(200).json(products)
  } catch (err) {
    console.error("Error fetching seller's products:", err.message)
    res.status(500).json({ message: "Server error" })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json({ message: "Product not found" })

    // Ensure the logged-in seller is the owner
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to update this product" })
    }

    // Update fields
    product.title = req.body.title || product.title
    product.description = req.body.description || product.description
    product.price = req.body.price || product.price
    product.images = req.body.images || product.images

    const updatedProduct = await product.save()
    res.status(200).json(updatedProduct)

  } catch (err) {
    console.error("Error updating product:", err.message)
    res.status(500).json({ message: "Server error" })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product)
      return res.status(404).json({ message: "Product not found" })
    //Authorization check
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to delete this product" })
    }

    await product.deleteOne()
    res.status(200).json({ message: "Product deleted successfully" })

  } catch (err) {
    console.error("Error deleting product:", err.message)
    res.status(500).json({ message: "Server error" })
  }
}
