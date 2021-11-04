const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./commentRoutes.js');
const postRoutes = require('./postRoutes.js');

router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);

module.exports = router;
