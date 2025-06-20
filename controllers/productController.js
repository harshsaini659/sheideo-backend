const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
  const { title, description, price, stock, category, images } = req.body

  try{
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can add products' });
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
    res.status(201).json({ message: 'Product created', product });
  }catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}