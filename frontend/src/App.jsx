// In frontend/src/App.jsx

import { useState, useEffect, useCallback } from 'react';
import './style.css';
import TransactionForm from './TransactionForm.jsx';
import TransactionList from './TransactionList.jsx';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/transactions');
      const data = await response.json(); // Parse the JSON response
      setTransactions(data.data); // Update our state with the fetched data
    } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }
}, []);

  useEffect(() => {
    // Define the function to fetch data

    // Call the function
    fetchTransactions();
  }, []); // The empty array [] means "only run this effect once, when the component first loads"

  async function handleAddTransaction(newTransaction) {
    try {
      // Send the new transaction to the backend server
      await fetch('http://localhost:4000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });

      // After adding, refresh the list of transactions
      fetchTransactions();
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  }

  async function handleDeleteTransaction(id) {
    try {
      await fetch(`http://localhost:4000/api/transactions/${id}`, {
        method: 'DELETE',
      });
      // After deleting, refresh the list
      fetchTransactions();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  }

  return (
    <div>
      <h1>Finance Tracker</h1>
      
      {/* --- NEW: Display the number of transactions --- */}
      <p>You have {transactions.length} transactions.</p>

      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
    </div>
  );
}

export default App;