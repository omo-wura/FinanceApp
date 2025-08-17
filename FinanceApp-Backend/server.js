const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 4000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Setup ---
const db = new sqlite3.Database('./finance.db', (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables if they don't exist
db.serialize(() => {
    // THIS IS THE CORRECTED PART
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // THIS IS THE CORRECTED PART
    db.run(`CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL UNIQUE,
        "limit" REAL NOT NULL
    )`);
});

// --- API Endpoints ---

// == TRANSACTIONS ==

// GET all transactions
app.get('/api/transactions', (req, res) => {
    const sql = "SELECT * FROM transactions ORDER BY date DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// POST a new transaction
app.post('/api/transactions', (req, res) => {
    const { description, amount, type, category } = req.body;
    const sql = `INSERT INTO transactions (description, amount, type, category) VALUES (?, ?, ?, ?)`;
    db.run(sql, [description, amount, type, category], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// DELETE a transaction
app.delete('/api/transactions/:id', (req, res) => {
    const sql = "DELETE FROM transactions WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Transaction deleted successfully' });
    });
});

// == BUDGETS ==

// GET all budgets
app.get('/api/budgets', (req, res) => {
    const sql = "SELECT * FROM budgets";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// POST a new budget
app.post('/api/budgets', (req, res) => {
    const { category, limit } = req.body;
    const sql = `INSERT INTO budgets (category, "limit") VALUES (?, ?)`;
    db.run(sql, [category, limit], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});

// DELETE a budget
app.delete('/api/budgets/:id', (req, res) => {
    const sql = "DELETE FROM budgets WHERE id = ?";
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Budget deleted successfully' });
    });
});


// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running and listening on http://localhost:${PORT}`);
});