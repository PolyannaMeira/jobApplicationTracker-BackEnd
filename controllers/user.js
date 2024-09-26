import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';
import query from '../config/db.js';

const userControllers = {
    register: async (req, res) => {
        const { email, password, rePassword } = req.body;
    
        console.log("Received email:", email);
        console.log("Received password:", password);
    
        try {
            // Check if user already exists
            const userExists = await query("SELECT * FROM users WHERE email = ?", [email]);
            console.log("User exists check:", userExists);
    
            if (userExists.length > 0) {
                return res.status(400).json({ message: "User already registered." });
            }
    
            // Hash password
            const hashedPassword = hashPassword(password);
            console.log("Hashed password:", hashedPassword);
    
            // Insert user into the database
            await query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
    
            // Generate JWT
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log("Generated JWT token:", token);
    
            return res.status(201).json({ token });
        } catch (error) {
            console.error("Error occurred during registration:", error);
            return res.status(500).json({ message: "Server error.", error: error.message });
        }
    },
    

    login: async (req, res) => {
        const { email, password } = req.body;
    
       // Email validation
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email." });
        }
    
        try {
            // Check if user exists
            const user = await query("SELECT * FROM users WHERE email = ?", [email]);
            if (user.length === 0) {
                return res.status(400).json({ message: "User not found." });
            }
    
            // Check if the password is correct
            const passwordMatch = await bcrypt.compare(password, user[0].password);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Incorrect password." });
            }
    
            // Generate JWT token
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: "Server error." });
        }
    },

    logout: async (req, res) => {
        return res.status(200).json({ message: "Logout successful." });
    }
    
    
};

export default userControllers;
    