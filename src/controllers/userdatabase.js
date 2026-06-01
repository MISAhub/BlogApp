const user = require('../models/user');
const bcrypt = require('bcrypt');

const signupController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        const existingUser = await user.getUserByUsername(username);

        if (existingUser) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.createUser({
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });

    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

module.exports = { signupController };