document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const refNoInput = document.getElementById('refNo');
    const descriptionInput = document.getElementById('description');
    const accountInput = document.getElementById('account');
    const debitInput = document.getElementById('debit');
    const creditInput = document.getElementById('credit');
    const addRowButton = document.getElementById('addRowBtn');
    const saveJournalButton = document.getElementById('saveJournalBtn');
    const transactionTableBody = document.getElementById('transactionTableBody');

    // Clear the Credit input when Debit is filled
    debitInput.addEventListener('input', function() {
        if (debitInput.value !== '') {
            creditInput.value = '';
        }
    });

    // Clear the Debit input when Credit is filled
    creditInput.addEventListener('input', function() {
        if (creditInput.value !== '') {
            debitInput.value = '';
        }
    });

    // Add a new transaction row to the table
    function addTransactionRow() {
        const date = dateInput.value;
        const refNo = refNoInput.value;
        const description = descriptionInput.value;
        const account = accountInput.value;
        const debit = debitInput.value;
        const credit = creditInput.value;

        if ((debit === '' && credit === '') || (debit !== '' && credit !== '')) {
            alert('Please fill in either Debit or Credit, not both.');
            return;
        }

        if (date === '' || refNo === '' || description === '' || account === '') {
            alert('Please complete all journal transaction details.');
            return;
        }

        const newRow = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        newRow.appendChild(dateCell);

        const refNoCell = document.createElement('td');
        refNoCell.textContent = refNo;
        newRow.appendChild(refNoCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = description;
        newRow.appendChild(descriptionCell);

        const accountCell = document.createElement('td');
        accountCell.textContent = account;
        newRow.appendChild(accountCell);

        const debitCell = document.createElement('td');
        debitCell.textContent = debit === '' ? '' : debit;
        newRow.appendChild(debitCell);

        const creditCell = document.createElement('td');
        creditCell.textContent = credit === '' ? '' : credit;
        newRow.appendChild(creditCell);

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteBtn');
        deleteButton.addEventListener('click', function() {
            this.parentNode.parentNode.remove();
        });
        actionCell.appendChild(deleteButton);
        newRow.appendChild(actionCell);

        transactionTableBody.appendChild(newRow);

        // Clear all form inputs after successful addition
        dateInput.value = '';
        refNoInput.value = '';
        descriptionInput.value = '';
        accountInput.value = '';
        debitInput.value = '';
        creditInput.value = '';
    }

    // Add event listener for the Add Transaction Row button
    addRowButton.addEventListener('click', addTransactionRow);

    // Save Journal (Dummy) button
    saveJournalButton.addEventListener('click', function() {
        alert('Journal successfully saved! (Data is not persistent)');
        transactionTableBody.innerHTML = '';
    });
});