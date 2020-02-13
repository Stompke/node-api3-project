const express = require('express');

const userRouter = require('./users/userRouter.js');

const postRouter = require('./posts/postRouter');

const server = express();

server.use(express.json());

server.use(logger)

server.use("/api/users", userRouter)

server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});



//custom middleware




module.exports = server;

function logger(req, res, next) {
  console.log(req.method, req.originalUrl, new Date())
  next();
} 

