const { User, Comment, Blog } = require('../models');
const withAuth = require('../utils/auth')

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

router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/blogs/:id', withAuth, async (req, res) => {
    
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

        commentData = await Comment.findAll({
            where: {
                BlogId: blog.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        comments = commentData.map( (comment) => comment.get({ plain: true}) )

        const owner = req.session.user_id === blog.UserId
        
        res.render('blogWithComments', {
            ...blog,
            comments,
            owner,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }

})

router.get('/blogs/update/:id', async (req, res) => {
    try {
        
        const blogData = await Blog.findByPk(req.params.id)

        const blog = blogData.get({ plain: true })

        res.render('updatePost', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err)
    }
}) 

module.exports = router;