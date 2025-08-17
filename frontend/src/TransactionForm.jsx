// In frontend/src/TransactionForm.jsx

function TransactionForm() {
  return (
    <form>
      <h2>Add New Transaction</h2>
      <div>
        <label>Description</label>
        <input type="text" />
      </div>
      <div>
        <label>Amount</label>
        <input type="number" />
      </div>
      <div>
        <label>Category</label>
        <input type="text" />
      </div>
      <div>
        <label>Type</label>
        <select>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;