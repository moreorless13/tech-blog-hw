const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all-posts', { posts })
    } catch (error) {
        res.status(500).json(error)
    }

})

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('single-post', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/login', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }

        res.render('login');
    } catch (error) {
        res.status(500).json(error)
    }

});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
})

module.exports = router;
