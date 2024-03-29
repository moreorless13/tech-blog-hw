const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const withAuth = require('../utils/withAuth')

// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [User],
//         });

//         const posts = postData.map((post) => post.get({ plain: true }));
//         res.render('all-posts', { posts })
//     } catch (error) {
//         res.status(500).json(error)
//     }

// })

router.get('/', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      include: [User]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts', { 
      layout: 'main',
      posts,
      loggedIn: req.session.loggedIn 
    })
  } catch (error) {
      res.status(500).json(error)
  }
});

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

      res.render('single-post', { 
        layout: 'main',
        post,
        loggedIn: req.session.loggedIn
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
})

module.exports = router;
