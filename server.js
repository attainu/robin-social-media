import express from "express";
import { createServer } from "http";
import logger from "morgan";
import exphbs from 'express-handlebars';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import path from 'path';

const app = express();
const server = createServer(app);

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
app.use(express.static(path.join(__dirname, 'public')));

// SET THE STATIC FOLDER FOR PUBLIC FILES
app.use(express.static(path.join(__dirname, 'src/public')));

//Import Passport Config
import passportConfig from "./src/config/passport";

//Setup Http-Logger Middleare
app.use(logger('dev'));

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
app.use('/', userRoute);

//Route for Index
app.use('/', indexRoute);

//Route for Post
app.use('/post', postRoute);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server started running on port ${port}!!`));