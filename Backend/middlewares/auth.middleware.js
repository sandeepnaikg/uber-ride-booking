
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');

// Middleware for User Authentication
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // If token is not provided, respond with Unauthorized
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized, token blacklisted' });
    }

    try {
        // Verify the token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the decoded token
        const user = await userModel.findById(decoded._id);
        
        // If the user is not found, respond with Unauthorized
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user to the request object for further use
        req.user = user;

        // Proceed to the next middleware
        return next();
    } catch (err) {
        console.log('JWT Verification Error:', err);
        // Handle token errors (e.g. expired token)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(401).json({ message: 'Unauthorized, token invalid' });
    }
};

// Middleware for Captain Authentication
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // If token is not provided, respond with Unauthorized
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized, token blacklisted' });
    }

    try {
        // Verify the token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the captain by ID from the decoded token
        const captain = await captainModel.findById(decoded._id);
        
        // If the captain is not found, respond with Unauthorized
        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }

        // Attach the captain to the request object for further use
        req.captain = captain;

        // Proceed to the next middleware
        return next();
    } catch (err) {
        console.log('JWT Verification Error:', err);
        // Handle token errors (e.g. expired token)
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(401).json({ message: 'Unauthorized, token invalid' });
    }
};
