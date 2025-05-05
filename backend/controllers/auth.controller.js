import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}

export const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if( userExists ) return res.status(400).json({ message : "User already exists"});

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashPassword });

    res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        token: generateToken(user._id)
    });

};

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found"})
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).json({ message: "Incorrect credentials" })

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || '',
        token: generateToken(user._id)
    })
}