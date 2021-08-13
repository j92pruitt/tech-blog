const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', async (req, res) => {

    try {
        
        console.log(`User Id is ${req.session.user_id}`)

        const newBlog = await Blog.create({
            ...req.body,
            UserId: req.session.user_id
        });

        res.status(200).json(newBlog);

    } catch (error) {
        res.status(400).json(error);
    }

});

router.put('/:id', async (req, res) => {

    try {
        
        const modelResponse = await Blog.update({
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

    } catch (error) {
        res.status(500).json(error)
    }

});

router.delete('/:id', async (req, res) => {

    try {

        const modelResponse = await Blog.destroy({
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

    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router;