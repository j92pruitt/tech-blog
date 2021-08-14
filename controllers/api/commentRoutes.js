const router = require('express').Router();
const { Comment } = require('../../models');

router.post('/', async (req, res) => {

    try {
        
        const newComment = await Comment.create({
            ...req.body,
            UserId: req.session.user_id
        });

        res.status(200).json(newComment);

    } catch (err) {
        res.status(500).json(err)
    }

});

router.put('/:id', async (req, res) => {

    try {
        
        const modelResponse = await Comment.update({
            ...req.body,
            UserId: req.session.user_id
        },
        {
            where: {
                id: req.params.id,
                UserId: req.session.user_id
            }
        });

        if (!modelResponse) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }

        res.status(200).json(modelResponse)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {

    try {

        const modelResponse = await Comment.destroy({
            where: {
                id: req.params.id,
                UserId: req.session.user_id
            }
        });

        if (!modelResponse) {
            res.status(404).json({ message: 'No blog post found with this id' });
            return;
        }

        res.status(200).json(modelResponse);

    } catch (err) {
        res.status(500).json(err)
    }

});

module.exports = router;