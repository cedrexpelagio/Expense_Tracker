document.addEventListener("DOMContentLoaded", () => {
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const filterCategory = document.getElementById('filter-category');
    const expenseForm = document.getElementById('expense-form');

    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');

    let expenses = [];

    function addExpense(expense) {

        const tr = document.createElement('tr');

        tr.innerHTML = `<td>${expense.name}</td>
                <td><span class="badge badge-food">${expense.category}</span></td>
                <td class="amount">${expense.category}</td>
                <td class="actions">
                  <button type="button" class="btn btn-update">Update</button>
                  <button type="button" class="btn btn-delete">Delete</button>
                </td> `;

        expenseList.appendChild(tr);

    }

    expenseForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const expense = {
            name: expenseName.value,
            amount: expenseAmount.value,
            category: expenseCategory.value
        };

        expenses.push(expense);
        addExpense(expense);

        expenseForm.reset();
    });
});