import express from 'express';
import authRouter from './routes/authRouter.js';
import session from 'express-session';
import passport from 'passport';
import userRouter from './routes/userRouter.js'
const app = express();
const port = 3001;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api',userRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
