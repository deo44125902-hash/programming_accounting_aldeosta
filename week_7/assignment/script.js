document.addEventListener('DOMContentLoaded', function() {

    const dateInput = document.getElementById('date');
    const refNoInput = document.getElementById('refNo');
    const descriptionInput = document.getElementById('description');
    const accountInput = document.getElementById('account');
    const debitInput = document.getElementById('debit');
    const creditInput = document.getElementById('credit');

    const addBtn = document.getElementById('addBtn');
    const saveBtn = document.getElementById('saveBtn');
    const journalBody = document.getElementById('journalBody');

    // Clear credit when debit is entered
    debitInput.addEventListener('input', function() {
        if (debitInput.value !== "") {
            creditInput.value = "";
        }
    });

    // Clear debit when credit is entered
    creditInput.addEventListener('input', function() {
        if (creditInput.value !== "") {
            debitInput.value = "";
        }
    });

    // Add transaction to journal
    addBtn.addEventListener('click', function() {

        const date = dateInput.value;
        const refNo = refNoInput.value.trim();
        const description = descriptionInput.value.trim();
        const account = accountInput.value;
        const debit = debitInput.value;
        const credit = creditInput.value;

        if (date === "" || refNo === "" || description === "" || account === "") {
            alert("Please complete all required fields!");
            return;
        }

        if (debit === "" && credit === "") {
            alert("Please enter a debit or credit amount!");
            return;
        }

        if (debit !== "" && credit !== "") {
            alert("Please enter only debit or credit!");
            return;
        }

        if (Number(debit || 0) < 0 || Number(credit || 0) < 0) {
            alert("Amount cannot be negative!");
            return;
        }

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${date}</td>
            <td>${refNo}</td>
            <td>${description}</td>
            <td>${account}</td>
            <td>${debit === "" ? "0" : Number(debit).toLocaleString('id-ID')}</td>
            <td>${credit === "" ? "0" : Number(credit).toLocaleString('id-ID')}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        journalBody.appendChild(row);

        // Delete transaction
        const deleteBtn = row.querySelector('.delete-btn');

        deleteBtn.addEventListener('click', function() {
            row.remove();
        });

        // Clear form after adding transaction
        dateInput.value = "";
        refNoInput.value = "";
        descriptionInput.value = "";
        accountInput.value = "";
        debitInput.value = "";
        creditInput.value = "";

    });

    // Save journal
    saveBtn.addEventListener('click', function() {

        if (journalBody.children.length === 0) {
            alert("There is no transaction to save!");
            return;
        }

        alert("Journal successfully saved!");

        journalBody.innerHTML = "";

    });

});