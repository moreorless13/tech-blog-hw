const router = require('express').Router();
const { User, Post } = require('../models/');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('home', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.body.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });

        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        res.status(500).json(error);
    }
})



router.get('/login', async (req, res) => {
    try {
        if (req.body.logged_in) {
            res.redirect('/dashboard');
            return;
        }

        res.render('dashboard');
    } catch (error) {
        res.status(500).json(error)
    }

});

module.exports = router;
