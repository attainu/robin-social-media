import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import exphbs from 'express-handlebars';
import passport from "passport";
import cors from "cors";
const app = express();
import path from 'path';
const __dirname = path.resolve();
//Import Passport Config
import passportConfig from "./src/config/passport.js";
//Import Routes
import userRoute from "./src/routes/user.js";
import indexRoute from "./src/routes/index.js";
import postRoute from "./src/routes/post.js";
import commentRoute from "./src/routes/comment.js";
//Import MongoDB Connection
import "./src/config/database.js";
const port = process.env.PORT || 5000


//app settings
app.set('views', path.join(__dirname, './src/views'))
    .set('view engine', 'hbs')
    .set('view cache', true)

//app view engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: app.get('views')
}));
app.use(express.static(path.join(__dirname, './src/public')));

//Setup Http-Logger Middleare
app.use(morgan('dev'));

//Setup CORS Error Handler
app.use(cors());

//Setup Body-Parser & Cookie-Parser Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

//Route for User
app.use('/user', userRoute);

//Route for Index
app.use('/', indexRoute);

//Route for Post
app.use('/post', postRoute);

//Comment for Post
app.use('/comment', commentRoute);

//Error handlers
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})
//Error handler for Database
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

export default app;