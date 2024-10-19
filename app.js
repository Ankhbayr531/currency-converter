document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'ce57552d430cbfe3300f0dea';  
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
    
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convert');
    const convertedAmount = document.getElementById('converted-amount');

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });

    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount && from && to) {
            fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`)
                .then(response => response.json())
                .then(data => {
                    convertedAmount.textContent = data.conversion_result.toFixed(2);
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('Please fill in all fields.');
        }
    });
});