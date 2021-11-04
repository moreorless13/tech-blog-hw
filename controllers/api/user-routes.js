const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.body.loggedIn = true;
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

        const passCheck = user.checkPassword(req.body.password);

        if (!passCheck) {
            res
                .status(400)
                .json({ message: "Please check your password and try again" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ message: "User is logged in!" });
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

