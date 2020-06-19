import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
const app = express();
const server = app.listen(5000)
const io = require('socket.io').listen(server);


//Import Passport Config
import passportConfig from "./src/config/passport";

//Setup Http-Logger Middleare
app.use(morgan('dev'));

//Setup CORS Error Handler
app.use(cors());

//Import Routes
import userRoute from "./src/routes/user";
import indexRoute from "./src/routes/index";
import postRoute from "./src/routes/post";

//Setup Body-Parser & Cookie-Parser Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Setup Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

//Import MongoDB Connection
import "./src/config/database";

//Route for User
app.use('/user', userRoute);

//Route for Index
app.use('/', indexRoute);

//Route for Post
app.use('/post', postRoute);

//Error hndleres
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})
//Error handler for DAtabae
app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})



// START THE SERVER
io.on('connection', function (socket) {
    console.log('Server started');
    socket.emit('social', { social: 'media' });
    socket.on('social-media', function (data) {
        console.log(data);
    });
});