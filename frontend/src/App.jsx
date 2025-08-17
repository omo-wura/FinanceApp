// In frontend/src/App.jsx

import './style.css'; 
import TransactionForm from './TransactionForm.jsx'; // Import the component

function App() {
  return (
    <div>
      <h1>Finance Tracker</h1>
      <TransactionForm /> {/* Use the component here */}
    </div>
  );
}

export default App;