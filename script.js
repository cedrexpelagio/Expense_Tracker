document.addEventListener("DOMContentLoaded", () => {
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const filterCategory = document.getElementById('filter-category');
    const expenseForm = document.getElementById('expense-form');

    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');

    let expenses = [
        { name: 'Morning Coffee', amount: '150', category: 'Food' },
        { name: 'Bus Ride', amount: '30', category: 'Transportation' },
        { name: 'Notebook', amount: '120', category: 'Utilities' }
    ];
    let totalExpenses = 0.00;

    expenses.forEach(expense => updateTotal(parseFloat(expense.amount)));
    loadExpenses(expenses);

    function updateTotal(amount) {
        totalExpenses += amount;
        totalAmount.textContent = totalExpenses.toFixed(2);
    }

    function addExpense(expense) {

        const tr = document.createElement('tr');

        tr.innerHTML = `<td>${expense.name}</td>
                <td><span class="badge badge-food">${expense.category}</span></td>
                <td class="amount">&#x20B1;${expense.amount}</td>
                <td class="actions">
                  <button type="button" class="btn btn-update">Update</button>
                  <button type="button" class="btn btn-delete">Delete</button>
                </td> `;

        expenseList.appendChild(tr);

    }

    function loadExpenses(array) {
        array.forEach(item => addExpense(item));
    }

    filterCategory.addEventListener('change', () => {

        expenseList.innerHTML = '';

        if (filterCategory.value == "all") {
            loadExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => filterCategory.value == expense.category);
            loadExpenses(filtered);
        }


    });

    expenseForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const expense = {
            name: expenseName.value,
            amount: expenseAmount.value,
            category: expenseCategory.value
        };

        expenses.push(expense);
        addExpense(expense);
        updateTotal(parseFloat(expense.amount));

        filterCategory.dispatchEvent(new Event('change'));

        expenseForm.reset();
    });
});