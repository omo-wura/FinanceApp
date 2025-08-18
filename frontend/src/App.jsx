// In frontend/src/App.jsx

import { useState, useEffect } from 'react'; // --- NEW: Import useEffect
import './style.css';
import TransactionForm from './TransactionForm.jsx';

function App() {
  // --- NEW: Create state to hold our list of transactions ---
  const [transactions, setTransactions] = useState([]);

  // --- NEW: Use useEffect to fetch data when the component loads ---
  useEffect(() => {
    // Define the function to fetch data
    async function fetchTransactions() {
      try {
        // Use the 'fetch' API to make a GET request to our backend
        const response = await fetch('http://localhost:4000/api/transactions');
        const data = await response.json(); // Parse the JSON response
        setTransactions(data.data); // Update our state with the fetched data
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    }

    // Call the function
    fetchTransactions();
  }, []); // The empty array [] means "only run this effect once, when the component first loads"

  return (
    <div>
      <h1>Finance Tracker</h1>
      
      {/* --- NEW: Display the number of transactions --- */}
      <p>You have {transactions.length} transactions.</p>

      <TransactionForm />
    </div>
  );
}

export default App;