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
const { logMiddleware } = require('./middleware');

const server = express();

server.use(express.json());
server.use(logMiddleware);

const users = ['Emanuel', 'Fernanda'];

// List Users
server.get('/users', (_, res) => {
  res.json(users);
});

// Get User
server.get('/users/:index', (req, res) => {
  const { index } = req.params;
  res.json(users[index]);
}); 

// Create User
server.post('/users', (req, res) => {
  const { name } = req.body;
  users.push(name);
  res.status(201).json(users);
});

// Edit User
server.put('/users', (req, res) => {
  const { index } = req.query;
  const { name } = req.body;
  users[index] = name;
  res.json(users);
});

// Delete User
server.delete('/users/:index', (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  res.send();
});

server.listen(3000);