const express =require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require('cors');
const UserRouter=require("./Routers/UserRouter")
const ExpensesRouter=require("./Routers/ExpensesRouter.js")
const CollectionCategories=require("./Routers/CollectionCategoriesRouter.js")
const RevenueRouter=require("./Routers/RevenueRouter.js")
const passport = require('passport');
const User = require('./Models/UserModel');
const { addUser, configureGoogleStrategy, googleAuth, googleCallback } = require('./Controllers/UserController');
const session = require('express-session');
const {createToken}=require("./Middleware/auth")
const mongoose = require("mongoose")
const dotenv = require("dotenv") 
const path = require('path');

app.use(cors({
  origin: 'https://reactnode-client.onrender.com',
  credentials: true
}));
dotenv.config()
app.use(bodyParser.json())

app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect(process.env.PASSWORD)
.then(() => console.log("Connected…")).catch(err => console.error("Connection failed…"))

configureGoogleStrategy();

app.use("/CollectionCategories",CollectionCategories)
app.use("/User",UserRouter)
app.use("/Expenses",ExpensesRouter)
app.use("/Revenue",RevenueRouter)

app.get('/auth/google', googleAuth);
app.get('/auth/google/callback', googleCallback);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080,()=>{
    console.log("rumnnnnnnnn")
})

