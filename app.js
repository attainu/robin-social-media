const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
//const dotenv = require('dotenv')
//dotenv.config('./config/database');
require ('./config/database');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


// Set view engine
const { select, generateTime, paginate } = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: { select, generateTime, paginate }}));
app.set('view engine', 'handlebars');

// Upload Middleware
app.use(upload());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

app.use(session({
    secret: 'edwindiaz123ilovecoding',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Local Variables using Middleware
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_message');
    res.locals.form_errors = req.flash('form_errors');
    res.locals.user = req.user || null;
    res.locals.error = req.flash('error');
    next();
});

// Load routes
const home = require('./routes/home/index');
const user = require('./routes/user/index');
const posts = require('./routes/user/posts');
const categories = require('./routes/user/categories');
const comments = require('./routes/user/comments');

// Use routes
app.use('/', home);
app.use('/user', user);
app.use('/user/posts', posts);
app.use('/user/categories', categories);
app.use('/user/comments', comments);

app.listen(5000, () => {
    console.log(`listening on port 5000`);
});
