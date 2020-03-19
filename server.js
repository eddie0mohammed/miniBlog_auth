
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});


const articleRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

//DB
const DB = process.env.MONGO_URI;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful');
}).catch((err) => {
    console.log(err);
});



//MIDDLEWARES
app.use(cors());

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//bodyparser => read data from body into req.body
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());



//ROUTES

app.use('/articles', articleRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);





const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server listening on Port ', PORT);
});