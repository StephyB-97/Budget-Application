//Create initial references
let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
const percentageAmount = document.getElementById("percentage-amount");
let tempAmount = 0;

//Implement function to set budget
/*------------------------------------------------------
Piece of code that will display the budget amount and
will check for correct values.
No negatives or empty values are accepted.
 -------------------------------------------------------*/
totalAmountButton.addEventListener("click", ()=> {
    tempAmount = totalAmount.value;
    //validation to check if there is an empty or negative input
    if(tempAmount === "" || tempAmount < 0){
        errorMessage.classList.remove("hide");
    }else{
        errorMessage.classList.add("hide");
        //set the budget
        amount.innerHTML = tempAmount;
        //set the balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        //Proceed to clean up the box
        totalAmount.value = "";
    }
});

//function to disable Edit/Delete buttons
/*------------------------------------------------------
Piece of code to disable teh edit and delete options in
the expenses list.
 -------------------------------------------------------*/
const disableButtons = (bool) =>{
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element)=>{
        element.disabled = bool;
    });
};

//create function to modify list items
/*------------------------------------------------------
Piece of code to modify the elements in list (expenses
list)
 -------------------------------------------------------*/
const modifyElement= (element, edit = false) =>{
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;      //current value in the balance space
    let currentExpense= expenditureValue.innerText;  //current value in expenses space
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value= parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance)+ parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

//create function to create a list
/*------------------------------------------------------
Piece of code to create the functionality of the list.
Users can edit or delete elements from their list.
Values are edited or deleted only.
function contains HTML code to create the innerHTML in
the List class created in the main.HTML file
 -------------------------------------------------------*/
const listCreator = (expenseName, expenseValue) =>{

    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `
    <p class="product">${expenseName}</p>
    <p class="amount">${expenseValue}</p>
    `;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize="1.2em";
    editButton.addEventListener("click", ()=>{
        modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize="1.2em";
    deleteButton.addEventListener("click", ()=>{
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

//event to
/*------------------------------------------------------

 -------------------------------------------------------*/
checkAmountButton.addEventListener("click",
    ()=>{
        //empty checks
        if(!userAmount.value || !productTitle.value){
            productTitleError.classList.remove("hide");
            return false;
        }
        //enable buttons
        disableButtons(false);
        let expenditure = parseInt(userAmount.value);    //expense
        //total expense, including existing + new
        let sum = parseInt(expenditureValue.innerText) + expenditure;
        expenditureValue.innerHTML=sum;



        //total balance to show (budget - total expenses)
        const totalBalance = tempAmount - sum;
        balanceValue.innerText= totalBalance;

        //calculations of percentage of money spent
        let percentage = (sum*100) / tempAmount;
        percentageAmount.innerText = parseInt(percentage) + "%";



        //create list
        listCreator(productTitle.value, userAmount.value);

        //empty inputs
        productTitle.value = "";
        userAmount.value = "";


    });
