const express = require('express');
const router = express.Router();
const todos = require('../models/todo');

const errorMessages = {
  notFound: 'The task could not be found',
  list: 'Unable to retrieve the todo list',
  add: 'Unable to add the new task to the list',
  delete: 'Unable to delete the task',
  status: 'Unable to change the status of the task',
};

router.get('/', (req, res) => {
  res.redirect('/list');
});

router.get('/list', async (req, res) => {
  todos
    .find()
    .then((response) => {
      if (response.length > 0) {
        res.render('todo-list', { Todos: response });
      } else {
        res.render('empty');
      }
    })
    .catch(() => res.redirect('/error/list'));
});

router.post('/add', (req, res) => {
  const todo = new todos(req.body);

  todo
    .save()
    .then(() => {
      res.redirect('/list');
    })
    .catch(() => {
      res.redirect('/error/add');
    });
});

router.post('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;

  todos
    .findByIdAndUpdate(id, { description: description })
    .then((response) => {
      if (response.modifiedCount === 0) {
        res.redirect('/error/notFound');
      } else {
        res.redirect('/list');
      }
    })
    .catch(() => res.redirect('/error/edit'));
});

router.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  todos
    .findByIdAndDelete(id)
    .then((response) => {
      if (!response) {
        res.redirect('/error/notFound');
      } else {
        res.redirect('/list');
      }
    })
    .catch(() => res.redirect('/error/delete'));
});

router.post('/status', async (req, res) => {
  const { status, id } = req.body;

  todos
    .findByIdAndUpdate(id, { status: status })
    .then((response) => {
      if (response.modifiedCount === 0) {
        res.redirect('/error/notFound');
      } else {
        res.status(200).json({ message: 'Success' });
      }
    })
    .catch(() => res.redirect('/error/status'));
});

router.get('/error/:action', (req, res) => {
  const action = req.params.action;
  res.render('error', { Error: errorMessages[action] });
});

module.exports = router;
