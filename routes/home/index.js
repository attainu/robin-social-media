const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../../controllers/home/index');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'home';
    next();
});

router.get('/', (req, res) => {
     res.render('home/index', {

     });
});

router.get('/about', (req, res) => {
    res.render('home/about');
});
router.get('/contact', (req, res) => {
    res.render('home/contact');
});


router.get('/login', (req, res) => {
    res.render('home/login');
});

router.post('/login',(req, res, next) => {
  
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true,
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('home/register');
});

router.post('/register', homeController.register)

router.get('/post/:slug', homeController.PostComment);

module.exports = router;



