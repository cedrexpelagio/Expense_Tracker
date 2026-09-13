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

    function addExpense(expense, index) {

        const tr = document.createElement('tr');

        tr.dataset.index = index;

        tr.innerHTML = `<td>${expense.name}</td>
                <td><span class="badge badge-food">${expense.category}</span></td>
                <td class="amount">&#x20B1;${expense.amount}</td>
                <td class="actions">
                  <button type="button" class="btn btn-update">Update</button>
                  <button type="button" class="btn btn-delete">Delete</button>
                </td> `;

        console.log(`Index of ${expense.name} is ${tr.dataset.index}`);

        const updateBtn = tr.querySelector('.btn-update');
        const deleteBtn = tr.querySelector('.btn-delete');

        updateBtn.addEventListener('click', () => {
            const clickedIndex = parseInt(tr.dataset.index, 10);
            // your update logic here
        });

        deleteBtn.addEventListener('click', () => {
            const clickedIndex = parseInt(tr.dataset.index, 10);

            updateTotal(-1 * expenses[clickedIndex].amount);
            expenses.splice(clickedIndex, 1);
            tr.remove();
            loadExpenses(expenses);
        });

        expenseList.appendChild(tr);
    }

    function loadExpenses(array) {

        expenseList.innerHTML = '';

        array.forEach(item => {
            const realIndex = expenses.indexOf(item);
            addExpense(item, realIndex);
        });
    }

    filterCategory.addEventListener('change', () => {

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

        const index = expenses.indexOf(expense);

        addExpense(expense, index);

        updateTotal(parseFloat(expense.amount));

        filterCategory.dispatchEvent(new Event('change'));

        expenseForm.reset();
    });
});