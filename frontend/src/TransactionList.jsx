// In frontend/src/TransactionList.jsx

function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div>
      <h2>Recent Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td>${t.amount.toFixed(2)}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              <td>
                <button onClick={() => onDeleteTransaction(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;