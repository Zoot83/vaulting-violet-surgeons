var submitEl = document.getElementById("submitBtn");
var nameEl = document.getElementById('name');
var calorieEl = document.getElementById('userCal');
var userName = localStorage.getItem("userName");
var caloriesGoal = localStorage.getItem("calorieGoal");
var currentAmountEl = document.getElementById("currentAmount");
var clearBtnEl = document.getElementById("clearBtn");
var dailyCalTotal = 0;
var arrayOfNames = [];


var inputVar = {
  type: "",
  foodName: "",
  quantity: 0,
  calAmount: 0
}


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f7db058726msh40d09fddf6983c8p1c2668jsn3bc5fa88698f',
    'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
  }
};



function saveInfo(event) {
  event.preventDefault();

  inputVar.type = document.getElementById("food-type").value;
  inputVar.foodName = document.getElementById("myInput").value;
  inputVar.quantity =document.getElementById("food-amount").value;
  addToSection(inputVar);

}


function addToSection(inputValues) {
  var caloriesCount=0;
  var food = inputValues.foodName.split(" ");
  let newFoodName = document.createElement("li");
  newFoodName.innerHTML=inputValues.foodName;
  var listEl = document.getElementById(inputValues.type)
  newFoodName.classList.add("list-elem");
  fetch('https://nutritionix-api.p.rapidapi.com/v1_1/search/'+ food +'?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat', options)
	.then(response => response.json())
	.then(response => {
    
    caloriesCount = calculateCalories(inputValues.quantity, response.hits[0].fields.nf_calories);
    newFoodName.innerHTML+=" Calories: "+caloriesCount;
    addToTotalCount(caloriesCount);
    dailyCalTotal += caloriesCount; 
    currentAmountEl.innerHTML = "Your daily total is: "+dailyCalTotal;
    getUsersInfo;

  })
  .catch(err => {
    alert("Please enter a valid food.")
  });
  listEl.appendChild(newFoodName);

}

function calculateCalories(quantity, calPerServing){

  totalCalories=(quantity*calPerServing);

  return totalCalories;
}

function addToTotalCount(count) {

  if(localStorage.getItem('data')=== null){
    var data = 0;
    var dataToInt = parseInt(data);
    dataToInt=count;
    localStorage.setItem("data", dataToInt);
  }else{
    var data = localStorage.getItem("data");
    var dataToInt = parseInt(data);
    dataToInt+=count;
    
    localStorage.setItem("data", dataToInt);
  }

}

function clearAllListElements(){
  var listElements = document.querySelectorAll('.list-elem');
  listElements.forEach(function(elem){
    elem.remove();
  })
  dailyCalTotal=0;
  localStorage.setItem("data", 0);
  currentAmountEl.innerHTML = "Your daily total is: 0";
}

function autocomplete(inp) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    arrayOfNames = [];
    var a, b, i, val = this.value;

    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");

    a.setAttribute("id", this.id + "autocomplete-list");

    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    fetch("https://nutritionix-api.p.rapidapi.com/v1_1/search/" + val + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat", options)
      .then(response => response.json())
      .then(response => {
        for (var i = 0; i < 10; i++) {
          arrayOfNames[i] = response.hits[i].fields.item_name;
        }


    /*for each item in the arrayOfNamesay...*/
    for (i = 0; i < arrayOfNames.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arrayOfNames[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arrayOfNames[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arrayOfNames[i].substr(val.length);
        /*insert a input field that will hold the current arrayOfNamesay item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arrayOfNames[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  })
  .catch(err => {
    alert("Please enter a valid food");
  });
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrayOfNamesow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }


  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function getUsersInfo(){

  if(userName===null || caloriesGoal===null){
    calorieEl.innerHTML= "Your calorie goal: 0";
    currentAmountEl.innerHTML = "Your daily total is: " + dailyCalTotal;
  }else if(caloriesGoal!=null&& userName===null){
    calorieEl.innerHTML= "Your calorie goal: " + caloriesGoal;
    currentAmountEl.innerHTML = "Your daily total is: " + dailyCalTotal;
  }else{
    nameEl.innerHTML=userName;
    calorieEl.innerHTML= "Your calorie goal: " + caloriesGoal;
    currentAmountEl.innerHTML = "Your daily total is: " + dailyCalTotal;
  }
}

getUsersInfo();
autocomplete(document.getElementById("myInput"));

submitEl.addEventListener("click", saveInfo);
clearBtnEl.addEventListener("click", clearAllListElements);