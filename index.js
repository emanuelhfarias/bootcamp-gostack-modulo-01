/*
 *  CRUD
 *  Resource: Users
 *
 *  Types of Params:
 *    Route params = /users/1
 *    Query params = /users?index=1
 *    Body request = {name: 'emanuel'}
 */

const express = require('express');
const { logMiddleware, checkUserExists } = require('./middleware');

const server = express();

server.use(express.json());
server.use(logMiddleware);

const users = ['Emanuel', 'Fernanda'];

function checkUserInArray(req, res, next) {
  if (!users[req.params.index] && !users[req.query.index]) {
    return res.status(400).json({error: 'User does not exist.'});
  }
  return next();
}

// List Users
server.get('/users', (_, res) => {
  res.json(users);
});

// Get User
server.get('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
});

// Create User
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.status(201).json(users);
});

// Edit User
server.put('/users', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.query;
  const { name } = req.body;
  users[index] = name;
  res.json(users);
});

// Delete User
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.send();
});

server.listen(3000);