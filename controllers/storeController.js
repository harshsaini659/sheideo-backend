const Store = require("../models/storeModel")

const createStore = async (req, res) => {
  try {
    const { storeName, storeDescription, storeLogo, storeAddress } = req.body

    // check if store already exists for this seller
    const existingStore = await Store.findOne({ seller: req.user._id })
    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "Store already exists for this seller",
      })
    }

    const store = await Store.create({
      storeName,
      storeDescription,
      storeLogo,
      storeAddress,
      seller: req.user._id,
    })

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      store,
    })
  } catch (error) {
    console.error("Create Store Error:", error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

module.exports = { createStore }
