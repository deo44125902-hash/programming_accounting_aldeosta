document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('employeeSalaryForm');
    const employeeNameInput = document.getElementById('employeeName');
    const employeeIDInput = document.getElementById('employeeID');
    const employeeEmailInput =
        document.getElementById('employeeEmail');
    const basicSalaryInput = document.getElementById('basicSalary');

    const employeeNameError =
        document.getElementById('employeeNameError');
    const employeeIDError =
        document.getElementById('employeeIDError');
    const employeeEmailError =
        document.getElementById('employeeEmailError');
    const basicSalaryError =
        document.getElementById('basicSalaryError');

    function showError(element, message, errorSpan) {
        errorSpan.textContent = message;
        element.classList.add('invalid');
    }

    function clearError(element, errorSpan) {
        errorSpan.textContent = '';
        element.classList.remove('invalid');
    }

    function validateField(inputElement, errorSpan, validationFn) {
        const isValid = validationFn(inputElement.value);
        if (!isValid) {
            showError(inputElement, inputElement.validationMessage ||
                "Invalid input.", errorSpan);
        } else {
            clearError(inputElement, errorSpan);
        }
        return isValid;
    }

    // Specific validation functions
    function validateEmployeeName(value) {
        return value.trim() !== '';
    }

    function validateEmployeeID(value) {
        return value.trim() !== '';
    }

    function validateEmployeeEmail(value) {
        // Simple regex for email, can be more complex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) || value.trim() === ''; // Can
        // be empty if not required
    }

    function validateBasicSalary(value) {
        const numValue = parseFloat(value);
        return !isNaN(numValue) && numValue > 0;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let formIsValid = true;

        // Validate Full Name
        if (!validateField(employeeNameInput, employeeNameError,
            validateEmployeeName)) {
            showError(employeeNameInput, "Full Name is required.",
                employeeNameError);
            formIsValid = false;
        } else {
            clearError(employeeNameInput, employeeNameError);
        }

        // Validate Employee ID
        if (!validateField(employeeIDInput, employeeIDError,
            validateEmployeeID)) {
            showError(employeeIDInput, "Employee ID is required.",
                employeeIDError);
            formIsValid = false;
        } else {
            clearError(employeeIDInput, employeeIDError);
        }

        // Validate Email
        if (!validateField(employeeEmailInput, employeeEmailError,
            validateEmployeeEmail)) {
            showError(employeeEmailInput, "Invalid email format.",
                employeeEmailError);
            formIsValid = false;
        } else {
            clearError(employeeEmailInput, employeeEmailError);
        }

        // Validate Basic Salary
        if (!validateField(basicSalaryInput, basicSalaryError,
            validateBasicSalary)) {
            showError(basicSalaryInput, "Basic Salary must be greater than 0.",
                basicSalaryError);
            formIsValid = false;
        } else {
            clearError(basicSalaryInput, basicSalaryError);
        }

        // Add validation for other required inputs in
        // employee_salary_form.html
        // Example: Date of Birth, Salary Period, Gender (radio)

        // Validate Gender radio buttons
        const genderRadios =
            document.querySelectorAll('input[name="gender"]');
        let genderSelected = Array.from(genderRadios).some(radio =>
            radio.checked);
        const genderError = document.getElementById('genderError');

        if (!genderSelected) {
            showError(genderRadios[0], "Please select a gender.",
                genderError);
            formIsValid = false;
        } else {
            clearError(genderRadios[0], genderError);
        }

        // Date and month input validation can also be added
        if (formIsValid) {
            alert("Form successfully validated and ready to submit!");
            // In the next chapter, data will be sent to the server
            // (PHP)
            // this.submit(); // If you want the form to submit after
            // JS validation
        } else {
            alert("There are errors in the form. Please check again.");
        }
    });

    // Optional: Validate as input changes (real-time feedback)
    employeeNameInput.addEventListener('input', () =>
        validateField(employeeNameInput, employeeNameError,
            validateEmployeeName));

    employeeIDInput.addEventListener('input', () =>
        validateField(employeeIDInput, employeeIDError, validateEmployeeID));

    employeeEmailInput.addEventListener('input', () =>
        validateField(employeeEmailInput, employeeEmailError,
            validateEmployeeEmail));

    basicSalaryInput.addEventListener('input', () =>
        validateField(basicSalaryInput, basicSalaryError,
            validateBasicSalary));
});