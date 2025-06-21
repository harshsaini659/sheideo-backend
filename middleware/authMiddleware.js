// JWT-based authentication middleware
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
}

const isSeller = async (req, res, next) => {
  await protect(req, res, async () => {
    if (req.user && req.user.role === "seller") {
      next()
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied! Only sellers allowed",
      })
    }
  })
}

module.exports = {protect, isSeller}
