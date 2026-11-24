document.addEventListener('DOMContentLoaded', function() {
    const loadAccountsBtn = document.getElementById('loadAccounts');
    const accountListDiv = document.getElementById('accountListJson');

    loadAccountsBtn.addEventListener('click', function() {
        accountListDiv.innerHTML = '<p>Loading data...</p>'; //
        // Display loading message

        fetch('account_data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load account data: ' +
                        response.statusText);
                }
                return response.json();
            })
            .then(data => {
                let htmlContent = '<h2>Loaded Account List:</h2><ul>';
                data.forEach(account => {
                    htmlContent += `<li><strong>Code:</strong>
                    ${account.code}, <strong>Name:</strong> ${account.name},
                    <strong>Category:</strong> ${account.category}</li>`;
                });
                htmlContent += '</ul>';
                accountListDiv.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error('Error:', error);
                accountListDiv.innerHTML = `<p style="color:
                red;">${error.message}</p>`;
            });
    });
});