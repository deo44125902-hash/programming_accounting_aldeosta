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
    const tableError = document.getElementById('tableError');

    const formInputs = [dateInput, refNoInput, descriptionInput, accountInput, debitInput, creditInput];

    // Today's date in YYYY-MM-DD (local time, toISOString() uses UTC and can be a day off)
    function getToday() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return now.getFullYear() + '-' + month + '-' + day;
    }
    dateInput.max = getToday();

    // ---------- Error helpers ----------

    function showError(input, message) {
        document.getElementById(input.id + 'Error').textContent = message;
        input.classList.add('invalid');
    }

    function clearError(input) {
        document.getElementById(input.id + 'Error').textContent = '';
        input.classList.remove('invalid');
    }

    function clearAllErrors() {
        formInputs.forEach(clearError);
    }

    // ---------- Validation (return true when valid) ----------

    function validateDate() {
        if (dateInput.value === "") {
            showError(dateInput, "Date is required.");
            return false;
        }
        if (dateInput.value > getToday()) {
            showError(dateInput, "Date cannot be later than today.");
            return false;
        }
        clearError(dateInput);
        return true;
    }

    function validateRefNo() {
        if (refNoInput.value.trim() === "") {
            showError(refNoInput, "Reference number is required.");
            return false;
        }
        clearError(refNoInput);
        return true;
    }

    function validateDescription() {
        const value = descriptionInput.value.trim();
        if (value === "") {
            showError(descriptionInput, "Description is required.");
            return false;
        }
        if (value.length < 3) {
            showError(descriptionInput, "Description must be at least 3 characters.");
            return false;
        }
        clearError(descriptionInput);
        return true;
    }

    function validateAccount() {
        if (accountInput.value === "") {
            showError(accountInput, "Please select an account.");
            return false;
        }
        clearError(accountInput);
        return true;
    }

    // Only Debit OR Credit may be filled, and the amount must be > 0
    function validateDebitCredit() {
        const debit = debitInput.value.trim();
        const credit = creditInput.value.trim();

        clearError(debitInput);
        clearError(creditInput);

        if (debit === "" && credit === "") {
            showError(debitInput, "Fill in either Debit or Credit.");
            showError(creditInput, "Fill in either Debit or Credit.");
            return false;
        }

        if (debit !== "" && credit !== "") {
            showError(debitInput, "Fill only one: Debit or Credit.");
            showError(creditInput, "Fill only one: Debit or Credit.");
            return false;
        }

        const filledInput = debit !== "" ? debitInput : creditInput;
        const amount = parseFloat(filledInput.value);

        if (isNaN(amount) || amount <= 0) {
            showError(filledInput, "Amount must be a number greater than 0.");
            return false;
        }
        return true;
    }

    // Run all validators so every error shows at once
    function validateForm() {
        const results = [
            validateDate(),
            validateRefNo(),
            validateDescription(),
            validateAccount(),
            validateDebitCredit()
        ];
        return results.every(Boolean);
    }

    // ---------- Load accounts from JSON (Fetch API) ----------

    function loadAccounts() {
        fetch('account_data.json')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Failed to load account data (' + response.status + ').');
                }
                return response.json();
            })
            .then(function(accounts) {
                accounts.forEach(function(acc) {
                    const option = document.createElement('option');
                    option.value = acc.code;
                    option.textContent = acc.code + ' - ' + acc.name;
                    accountInput.appendChild(option);
                });
            })
            .catch(function(error) {
                console.error('Error:', error);
                showError(accountInput, "Could not load accounts. Open this page through a local server (XAMPP/Laragon), not file://.");
            });
    }

    // ---------- Auto-clear Debit / Credit ----------

    // Clear credit when debit is entered
    debitInput.addEventListener('input', function() {
        if (debitInput.value !== "") {
            creditInput.value = "";
        }
        validateDebitCredit();
    });

    // Clear debit when credit is entered
    creditInput.addEventListener('input', function() {
        if (creditInput.value !== "") {
            debitInput.value = "";
        }
        validateDebitCredit();
    });

    // ---------- Live feedback ----------

    dateInput.addEventListener('input', validateDate);
    refNoInput.addEventListener('input', validateRefNo);
    descriptionInput.addEventListener('input', validateDescription);
    accountInput.addEventListener('change', validateAccount);

    // ---------- Add transaction to journal ----------

    addBtn.addEventListener('click', function() {

        if (!validateForm()) {
            return; // error messages are already shown, no alert
        }

        const debit = parseFloat(debitInput.value) || 0;
        const credit = parseFloat(creditInput.value) || 0;
        const accountText = accountInput.options[accountInput.selectedIndex].textContent;

        const values = [
            dateInput.value,
            refNoInput.value.trim(),
            descriptionInput.value.trim(),
            accountText,
            debit.toLocaleString('id-ID'),
            credit.toLocaleString('id-ID')
        ];

        const row = document.createElement('tr');

        values.forEach(function(text) {
            const cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
        });

        // Delete button in the Action column
        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', function() {
            row.remove();
        });

        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);
        journalBody.appendChild(row);

        // Clear form and messages after adding transaction
        formInputs.forEach(function(input) {
            input.value = "";
        });
        clearAllErrors();
        tableError.textContent = "";

    });

    // ---------- Save journal (dummy) ----------

    saveBtn.addEventListener('click', function() {

        let canSave = true;

        // If the form is partly filled, it must be valid first (so the data isn't lost)
        const formHasInput = formInputs.some(function(input) {
            return input.value.trim() !== "";
        });
        if (formHasInput && !validateForm()) {
            canSave = false;
        }

        // The table needs at least one row
        if (journalBody.children.length === 0) {
            tableError.textContent = "Add at least one transaction before saving.";
            canSave = false;
        } else {
            tableError.textContent = "";
        }

        if (!canSave) {
            return; // only error messages, no alert
        }

        alert("Journal successfully saved!");

        journalBody.innerHTML = "";

    });

    loadAccounts();

});