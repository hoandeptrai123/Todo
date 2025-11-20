const express = require('express');
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all todos for authenticated user
router.get('/', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.id],
    (err, todos) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(todos);
    }
  );
});

// Get single todo
router.get('/:id', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM todos WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (err, todo) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    }
  );
});

// Create todo
router.post('/', authenticateToken, (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  db.run(
    'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)',
    [req.user.id, title, description || ''],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create todo' });
      }

      db.get('SELECT * FROM todos WHERE id = ?', [this.lastID], (err, todo) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json(todo);
      });
    }
  );
});

// Update todo
router.put('/:id', authenticateToken, (req, res) => {
  const { title, description, completed } = req.body;

  db.get(
    'SELECT * FROM todos WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (err, todo) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      const updatedTitle = title !== undefined ? title : todo.title;
      const updatedDescription = description !== undefined ? description : todo.description;
      const updatedCompleted = completed !== undefined ? (completed ? 1 : 0) : todo.completed;

      db.run(
        'UPDATE todos SET title = ?, description = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
        [updatedTitle, updatedDescription, updatedCompleted, req.params.id, req.user.id],
        (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to update todo' });
          }

          db.get('SELECT * FROM todos WHERE id = ?', [req.params.id], (err, updatedTodo) => {
            if (err) {
              return res.status(500).json({ error: 'Database error' });
            }
            res.json(updatedTodo);
          });
        }
      );
    }
  );
});

// Delete todo
router.delete('/:id', authenticateToken, (req, res) => {
  db.run(
    'DELETE FROM todos WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json({ message: 'Todo deleted successfully' });
    }
  );
});

module.exports = router;

