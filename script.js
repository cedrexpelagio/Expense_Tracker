const addExpense = document.getElementById('add-expense-btn');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const filterCategory = document.getElementById('filter-category');
const expenseForm = document.getElementById('expense-form');

addExpense.addEventListener('click', (event) => {
    
    let expenses = [];

    event.preventDefault();
    const expense = {
        name: document.getElementById('expense-name').value,
        amount: document.getElementById('expense-amount').value,
        category: document.getElementById('expense-category').value
    };
    expenses.push(expense);
});