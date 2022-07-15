var submitEl = document.getElementById("submitBtn");
var dailyCalTotal;

var inputVar = {
    type: "",
    foodName: "",
    calAmount: 0
}

function saveInfo(event){
    event.preventDefault();
    console.log("saveInfo");
    
    if(isNaN(document.getElementById("calories").value)){
        alert("Please enter a valid number");
    } else{
        inputVar.type=document.getElementById("food-type").value;
        inputVar.foodName=document.getElementById("food-name").value;
        inputVar.calAmount=document.getElementById("calories").value;
        addToSection(inputVar);
    }
    
}

function addToSection(inputValues){

    addToTotalCount(inputVar);
    let newFoodName = document.createElement("li");
    newFoodName.innerHTML = inputValues.foodName + " Calories= " + inputValues.calAmount;
    var listEl = document.getElementById(inputValues.type)
    newFoodName.classList.add("list-elem");
    listEl.appendChild(newFoodName);
}

function addToTotalCount(inputValues){
    dailyCalTotal += inputValues.calAmount;
    var data = JSON.parse(localStorage.getItem('data')) || {};

    localStorage.setItem("data", JSON.stringify(data));
    console.log(localStorage.getItem('data'));
}

submitEl.addEventListener("click", saveInfo);