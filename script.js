document.addEventListener("DOMContentLoaded", () => {
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const filterCategory = document.getElementById('filter-category');
    const expenseForm = document.getElementById('expense-form');

    const expenseName = document.getElementById('expense-name');
    const expenseAmount = document.getElementById('expense-amount');
    const expenseCategory = document.getElementById('expense-category');

    const filterContainer = document.querySelector('.filter-group');

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

    function checkExpenseSize(array) {
        if (array.length == 0) {
            expenseList.innerHTML = 
            `<td class="empty-message">
            <span>No Expenses in this Category</span>
            </td>
            <td></td>
            <td></td>
            <td></td>`;
        } else {
            loadExpenses(array);
        }
    }

    function refreshList() {

        if (filterCategory.value === "all") {
            checkExpenseSize(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.category === filterCategory.value);
            checkExpenseSize(filtered);
        }

        controlBtns();
    }

    let indexEditing = null;

    function addActions(updateBtn, deleteBtn, expense) {

        updateBtn.addEventListener('click', () => {
            const clickedIndex = parseInt(expense.dataset.index, 10);

            indexEditing = clickedIndex;

            expenseName.value = expenses[clickedIndex].name;
            expenseAmount.value = expenses[clickedIndex].amount;
            expenseCategory.value = expenses[clickedIndex].category;

            expenseName.focus();

            isBtnsDisable = true;
            controlBtns();

            expenseForm.querySelector('button').textContent = "Update Expense";
            document.querySelector('.form-column h2').textContent = "Update Expense";
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
                <td><span class="badge badge-${expense.category.toLowerCase()}">${expense.category}</span></td>
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

    const addedCategory = document.getElementById('added-category');
    const addedCategoryForm = document.querySelector('.add-category');
    const addCategoryBtn = document.querySelector('.btn-add-category');
    const cancelBtn = document.querySelector('.btn-cancel');

    function showAddCategory(show) {

        if(show){
        addedCategory.focus();

        addedCategoryForm.classList.remove('hidden');
        filterContainer.classList.add('hidden');
        } else {
         addedCategoryForm.classList.add('hidden');
        filterContainer.classList.remove('hidden');
        }

    }

    addedCategoryForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const newCategoryValue = addedCategory.value.trim();
        const newCategory = document.createElement('option');
        newCategory.textContent = newCategoryValue;
        newCategory.value = newCategoryValue;

        const newOption = document.createElement('option');
        newOption.textContent = newCategoryValue;
        newOption.value = newCategoryValue;

        filterCategory.appendChild(newCategory);

        expenseCategory.appendChild(newOption);
        expenseCategory.value = newCategoryValue;
        expenseCategory.focus();

        addedCategoryForm.reset();

        showAddCategory(false);
    });

    addCategoryBtn.addEventListener('click', () => {
        showAddCategory(true);
    });

    cancelBtn.addEventListener('click', ()=> {
        showAddCategory(false);
    });

    filterContainer.addEventListener('change', (event) => {
        if (event.target.id === 'filter-category') {
            refreshList();
        }
    });

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (indexEditing !== null) {
            // update path
            expenses[indexEditing].name = expenseName.value;
            expenses[indexEditing].amount = expenseAmount.value;
            expenses[indexEditing].category = expenseCategory.value;

            isBtnsDisable = false;
            indexEditing = null;

            expenseForm.querySelector('button').textContent = "Add Expense";
            document.querySelector('.form-column h2').textContent = "Add Expense";
        } else {
            // add path
            const expense = {
                name: expenseName.value,
                amount: expenseAmount.value,
                category: expenseCategory.value
            };

            expenses.push(expense);
            addExpense(expense, expenses.indexOf(expense));
        }

        updateTotal();
        refreshList();
        expenseForm.reset();
    });

});