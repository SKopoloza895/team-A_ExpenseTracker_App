const currencyHolder = document.getElementById("currency") //currency from html to getElementById
const balanceHolder = document.getElementById("balance") // balance from html to getElementById

const tnxdescriptionNameHolder = document.getElementById("description-Name") // description-Name from html to getElementById 
const tnxAmountolder = document.getElementById("amount") //amount from html to getElementById

const income = document.getElementById("income") // income (radio)from html to getElementById
const expense = document.getElementById("expense") // expense (radio)from html to getElementById

const saveButton = document.getElementById("save"); //save button from html to getElementById

const displayList = document.getElementById("list-of-transactions"); // list-of-transactions from html to getElementById

// we need few variable for list transactions
let symbol = "R";
let currentBalance = 0;
let listOfTransactions = [];

// Function for Edit onclick="edit(${i})" for Function
function edit(i) { // i for index
    
}

// Function for Delete onclick="deleteBtn(${i})" 
function deleteBtn(i) {
    listOfTransactions = listOfTransactions.filter((e,index) => i !== index); // [filter((e,index) => mean if return is true] [i !== index mean list otherwise it wont be in list that how filter after deleting]
    display();
}

// Function for keep Data (local storage) 
function keepData() {
    localStorage.setItem("symbol", symbol);
    localStorage.setItem("balance",currentBalance);
    localStorage.setItem("list", JSON.stringify(listOfTransactions));
}

function loadData() {
    let symbol = localStorage.getItem("symbol", symbol);
    let currentBalance = localStorage.getItem("balance",currentBalance);
    let listOfTransactions = [];
}

// Function for display (render)
function display() {
    currentBalance = listOfTransactions.reduce(
        (total,value) => {return value.type == "expense" ? total - value.amount : total + value.amount},0) 
        // (total,value) => {return total + value},0) //in order array function and take callback with value. return will reach on total plus and value
    
    displayList.innerHTML = ""; 
    
    if (listOfTransactions.length == 0) {
        displayList.innerHTML += "No Transaction found"
    }
    else{
        listOfTransactions.forEach((e,i) =>{ // forEach((e,i) from callback the function accept to 3 arguments in array. (e => element and this)
            displayList.innerHTML += `
            <li class="transaction ${e.type}"> 
                <p>${e.name}</p>
                <div class="right_side">
                    <p>${symbol}${e.amount}</p>
                    <button onclick="edit(${i})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteBtn(${i})"><i class="fas fa-trash-alt"></i></button>
                </div>
            </li>
            `;
        })
    }


    currencyHolder.innerHTML = symbol;
    balanceHolder.innerHTML = currentBalance;
    keepData();
}

saveButton.addEventListener("click", () => { // "click" event and on click event 
    if (tnxdescriptionNameHolder.value == "" || (tnxAmountolder.value) <= 0) { // if true with blank then check OR Aamount with 0 
        alert("Can't be blank!");
        return;
    }
    
    let transaction = { // use for objects
        name: tnxdescriptionNameHolder.value,
        amount: Number(tnxAmountolder.value), // convert it to number
        type: income.checked? "income" : "expense" // selected 
    };
    // console.log(transaction);
    listOfTransactions.push(transaction);
    display(); // recall function
})

display();