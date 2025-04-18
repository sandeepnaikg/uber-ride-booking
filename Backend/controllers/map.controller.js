
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

// Get coordinates based on the address
module.exports.getCoordinates = async (req, res, next) => {
    handleValidationErrors(req, res);

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get distance and time between origin and destination
module.exports.getDistanceTime = async (req, res, next) => {
    handleValidationErrors(req, res);

    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error('Error fetching distance/time:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get autocomplete suggestions for input
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    handleValidationErrors(req, res);

    const { input } = req.query;

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
