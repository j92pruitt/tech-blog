const { User, Comment, Blog } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {

    try {
        
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', { 
            blogs,
            logged_in: req.session.logged_in 
        });

    } catch (error) {
     
        res.status(500).json(error);

    }
});

router.get('/dashboard', async (req, res) => {
    try {
        
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ],
            where: {
                UserId: req.session.user_id
            }
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', { 
            blogs,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/blogs/:id', async (req, res) => {
    
    try {
        
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const blog = blogData.get({ plain: true});

        const commentData = await Comment.findAll({
            where: {BlogId: req.params.id},
            include:[
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));
        
        res.render('blogWithComments', {
            blog,
            comments,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }

})

module.exports = router;