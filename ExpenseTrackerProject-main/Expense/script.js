const current-balance = document.getElementById('current-balance');
const money_plus = document.getElementById('money.plus');
const money_minus = document.getElementById('money.minus');
const form = document.getElementById('form');
const text = document.getElementById('form');
const amount = document.getElementById('amount');

const localStorageTransactions =  JSON.parse(
    localStorage.getItem('transactions')
);

let transactions = 
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDFefault();

    if(text.value.trim() === '' || amounts.value.trim() === '') {
        alert('Add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amounts.value
        };
      
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
   
    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
   
    const income = (
	    amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
    ).toFixed(2);
	
    const expense = (
        amount.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);

    money_balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = ``;

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener(`submit`, addTransaction);