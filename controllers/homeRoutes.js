const { User } = require('../models');
const Blog = require('../models/Blog');

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        
        const postData = await Blog.findAll();
        res.render('homepage', { postData });

    } catch (error) {
     
        res.status(500).json(error);

    }
})

router.get('/comments', async (req, res) => {

    try {
        
        const commentData = await Comment.findAll();
        res.status(200).json(commentData)

    } catch (error) {
        
        res.status(500).json(error)

    }
})

router.post('/signup', async (req, res) => {

    try {
        
        const sqlData = await User.create(req.body);
        res.status(200).json(sqlData);

    } catch (error) {
        
        res.status(500).json(error);

    }
})

module.exports = router;