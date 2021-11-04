const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.post("/", withAuth, async (req, res) => {
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

router.put("/:id", withAuth, async (req, res) => {
    try {
        const postEdit = await Post.update(
            {
                title: req.body.title,
                body: req.body.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!postEdit) {
            res.status(404).json({ message: "No post found with that ID " });
        } else {
            res.status(200).json(postEdit);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const deletePost = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!deletePost) {
            res.status(404).json({ message: "No post found with that ID " });
        } else {
            res.status(200).json(deletePost);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
