// Wait until the entire HTML document is loaded and ready
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to all the HTML elements we need
    const transactionForm = document.querySelector('form');
    const descriptionInput = document.querySelector('#description');
    const amountInput = document.querySelector('#amount');
    const categoryInput = document.querySelector('#category');
    const typeSelect = document.querySelector('#type');

    // 2. Add an event listener to the form for the 'submit' event
    transactionForm.addEventListener('submit', (event) => {
        
        // 3. Prevent the default form submission (page reload)
        event.preventDefault();

        // 4. Get the current values from all the input fields
        const descriptionValue = descriptionInput.value;
        const amountValue = amountInput.value;
        const categoryValue = categoryInput.value;
        const typeValue = typeSelect.value;
        
        // 5. Print the values to the browser's console
        console.log('--- New Transaction ---');
        console.log('Description:', descriptionValue);
        console.log('Amount:', amountValue);
        console.log('Category:', categoryValue);
        console.log('Type:', typeValue);
    });

});