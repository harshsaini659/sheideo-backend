const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: 'User already exists' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({ name, email, password: hashedPassword, role })
    await user.save()
    res.status(201).json({ message: 'User registered successfully' })
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
}

//Login User
exports.loginUser = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Invalid credentials' })
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials'})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
        });

        res.json({ token, user: { id: user._id, name: user.name, role: user.role } })
    }catch(err){
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}