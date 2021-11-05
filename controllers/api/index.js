const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);

module.exports = router;
