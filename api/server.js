const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routers/auth-router.js');
const userRouter = require('../routers/user-router.js');
const blogRouter = require('../routers/blogpost-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/blogposts', blogRouter);

server.get('/', (req, res) => {
  res.status(200).json({
    Server_Status: "Up"
  });
});

module.exports = server;