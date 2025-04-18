
const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');

// Handle GET request for coordinates
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    (req, res, next) => {
        // Check if validation failed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.getCoordinates
);

// Handle GET request for distance and time
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    (req, res, next) => {
        // Check if validation failed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.getDistanceTime
);

// Handle GET request for autocomplete suggestions
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    (req, res, next) => {
        // Check if validation failed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.getAutoCompleteSuggestions
);

module.exports = router;
