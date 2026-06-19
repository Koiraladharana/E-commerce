import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try{
        const { name, email, phone, password } = req.body;
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({ message: 'Email already registered!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, phone, password:hashedPassword
        });

        res.status(201).json({ message: 'Account created successfully!'})
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email }});
    }
    catch(error){
        res.status(500).json({ message: error.message })
    }
};