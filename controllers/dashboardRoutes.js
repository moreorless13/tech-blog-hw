const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/withAuth');



router.get('/', withAuth, async (req, res) => {
    console.log('Hitting the dashboard routes')
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/new', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
