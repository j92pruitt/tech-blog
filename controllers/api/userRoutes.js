const User = require('../../models/User');
const router = require('express').Router();

router.post('/', async (req, res) => {

    try {
        
        const modelResponse = await User.create(req.body);
        res.status(200).json(modelResponse);

    } catch (error) {
        res.status(500).json(error)
    }

});

router.post('/login', async (req, res) => {

    try {
        
        const userData = await User.findOne( { where: {email: req.body.email} } );

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        res.json({ user: userData, message: 'You are now logged in.' });

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;