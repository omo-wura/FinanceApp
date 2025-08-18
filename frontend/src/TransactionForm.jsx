import { useState } from 'react'; // --- NEW: Import the useState hook

function TransactionForm() {
  // --- NEW: Create state variables for each input ---
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense'); // Default to 'expense'

  const handleSubmit = (event) => {
    // Prevent the default browser behavior of reloading the page
    event.preventDefault();

    // Log the current state values to the console
    console.log('--- Submitting New Transaction ---');
    console.log({ description, amount, category, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Transaction</h2>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;