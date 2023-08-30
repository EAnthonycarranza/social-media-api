const router = require('express').Router();

// Import your route files
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Direct requests to the respective routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
