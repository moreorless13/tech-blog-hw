const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            res.status(400).json({ message: "We could not locate that user" });
            return;
        }

        const validPass = user.checkPassword(req.body.password);

        if (!validPass) {
            res
                .status(400)
                .json({ message: "Please check your password and try again" });
            return;
        }

        req.session.save(() => {
            req.session.useId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message: "User is logged in!" });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

