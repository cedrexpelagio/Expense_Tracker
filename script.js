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

    loadExpenses(expenses);
    updateTotal();

    let isBtnsDisable = false;

    function controlBtn(buttons) {

        if (isBtnsDisable) {
            buttons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = "0.5";
            });
        } else {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = "1";
            });
        }
    }

    function controlBtns() {
        const allUpdateBtn = document.querySelectorAll('.btn-update');
        controlBtn(allUpdateBtn);

        const allDeleteBtn = document.querySelectorAll('.btn-delete');
        controlBtn(allDeleteBtn);
    }

    function updateTotal() {
        totalExpenses = expenses.reduce((total, expense) => total += parseFloat(expense.amount), 0);
        totalAmount.textContent = totalExpenses.toFixed(2);
    }

    function deleteExpense(expense, index) {
        expenses.splice(index, 1);
        expense.remove();
        updateTotal();
        refreshList();
    }

    function refreshList() {

        if (filterCategory.value === "all") {
            loadExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.category === filterCategory.value);
            loadExpenses(filtered);
        }

        controlBtns();

    }

    let submitBtnLocked = false;
    let updateExpenseLocked = true;

    function addActions(updateBtn, deleteBtn, expense) {

        updateBtn.addEventListener('click', () => {
            const clickedIndex = parseInt(expense.dataset.index, 10);

            submitBtnLocked = true;
            updateExpenseLocked = false;

            let indexEditing = null;
            indexEditing = clickedIndex;

            expenseName.value = expenses[clickedIndex].name;
            expenseAmount.value = expenses[clickedIndex].amount;
            expenseCategory.value = expenses[clickedIndex].category;

            expenseName.focus();

            isBtnsDisable = true;
            controlBtns();

            expenseForm.querySelector('button').textContent = "Update Expense";
            document.querySelector('.form-column h2').textContent = "Update Expense";

            expenseForm.addEventListener('submit', () => {

                if (updateExpenseLocked) {
                    return;
                }

                console.log(expenses);
                console.log(indexEditing);

                expenses[indexEditing].name = expenseName.value;
                expenses[indexEditing].amount = expenseAmount.value;
                expenses[indexEditing].category = expenseCategory.value;

                isBtnsDisable = false;
                indexEditing = null;
                updateTotal();
                refreshList();
                expenseForm.reset();

                updateExpenseLocked = true;
                submitBtnLocked = false;

                expenseForm.querySelector('button').textContent = "Add Expense";
                document.querySelector('.form-column h2').textContent = "Add Expense";
            });

        });

        deleteBtn.addEventListener('click', () => {
            const clickedIndex = parseInt(expense.dataset.index, 10);

            deleteExpense(expense, clickedIndex);
        });
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

        const updateBtn = tr.querySelector('.btn-update');
        const deleteBtn = tr.querySelector('.btn-delete');

        addActions(updateBtn, deleteBtn, tr);

        expenseList.appendChild(tr);
    }

    function loadExpenses(array) {

        expenseList.innerHTML = '';

        array.forEach(item => {
            const realIndex = expenses.indexOf(item);
            addExpense(item, realIndex);
        });
    }

    filterCategory.addEventListener('change', refreshList);

    expenseForm.addEventListener('submit', (event) => {

        event.preventDefault();

        if (submitBtnLocked) {
            return;
        }

        const expense = {
            name: expenseName.value,
            amount: expenseAmount.value,
            category: expenseCategory.value
        };

        expenses.push(expense);

        const index = expenses.indexOf(expense);

        addExpense(expense, index);

        updateTotal();

        filterCategory.dispatchEvent(new Event('change'));

        expenseForm.reset();
    });
});