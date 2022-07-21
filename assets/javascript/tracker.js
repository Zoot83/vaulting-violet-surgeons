
var foodListEl = document.querySelector("#food-list");
var foodInputEl = document.querySelector("#myInput")
var searchEl = document.getElementById("searchBtn");

var submitEl = document.getElementById("submitBtn");
var nameEl = document.getElementById('name');
var calorieEl = document.getElementById('userCal');
var userName = localStorage.getItem("userName");
var caloriesGoal = localStorage.getItem("calorieGoal");
var currentAmountEl = document.getElementById("currentAmount");
var clearBtnEl = document.getElementById("clearBtn");

var removeEl=document.querySelector("#food-remove");
var removeBtnEl = document.getElementById('removeBtn');

let foods=[];
var foodAdded=[];
var dailyCalTotal = 0;

var foodsCalories=0;

var numberOfFood=0;

var inputVar = {
  type: "",
  foodName: "",
  quantity: 0,
  calAmount: 0,
  id:0
}

var foodCalAmount =0;

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f7db058726msh40d09fddf6983c8p1c2668jsn3bc5fa88698f',
    'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
  }
};


function fetchfoods(input){

  if(input){
  fetch('https://nutritionix-api.p.rapidapi.com/v1_1/search/'+input+'?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat', options)
    .then(response => response.json())
    .then((data)=>{ 
      for(var i=0; i<data.hits.length;i++){
        foods[i]=data.hits[i];
      }
    loadData(foods,foodListEl);
    });
  }
}



function loadData(data,element){
  
  if(data){
    element.innerHTML = "";
    let innerElement="";
     data.forEach((item)=>{
       innerElement+= `
       <li class="auto-list-elem" id="auto-list-elem" value=${item.fields.nf_calories}>${item.fields.item_name} Brand: (${item.fields.brand_name})</li>`;
     });
     element.innerHTML=innerElement;
  }
}

function filterData(data, searchText){
  return data.filter((x)=> x.toLowerCase().includes(searchText.toLowerCase()))
  ;
}

foodInputEl.addEventListener("input", function(){

  const filteredData = filterData(foods, foodInputEl.value);

  loadData(foods, foodListEl);

});

searchEl.addEventListener("click", function(e){
  fetchfoods(foodInputEl.value);
});

$(document).on('click', '#auto-list-elem',function(){
  foodInputEl.innerHTML= this.innerHTML;
  foodInputEl.value = this.innerHTML;
  foodsCalories= this.value;
  var liEl = document.querySelectorAll('.auto-list-elem');
  liEl.forEach(function(elem){
    elem.remove();
  })
  foods=[];
  submitEl.removeAttribute("disabled");
});



//************************************* */



function saveInfo(event) {
  event.preventDefault();
  submitEl.setAttribute("disabled", "true");
  inputVar.type = document.getElementById("food-type").value;
  inputVar.foodName = document.getElementById("myInput").value;
  inputVar.calAmount = foodsCalories;
  inputVar.quantity =document.getElementById("food-amount").value;
  numberOfFood++;
  inputVar.id=numberOfFood;

  addToSection(inputVar);

}

function addToSection(inputValues) {
  var caloriesCount=0;

  let newFoodName = document.createElement("li");
  newFoodName.innerHTML=inputValues.foodName;
  newFoodName.value=inputValues.id;
  var listEl = document.getElementById(inputValues.type)
  newFoodName.classList.add("list-elem");
  caloriesCount = calculateCalories(inputValues.quantity, inputValues.calAmount);
  inputValues.calAmount=caloriesCount;
  newFoodName.innerHTML+=" Calories: "+caloriesCount;
  addToTotalCount(caloriesCount);
  dailyCalTotal += caloriesCount; 
  currentAmountEl.innerHTML = "Your daily total is: "+dailyCalTotal.toFixed(2);
  getUsersInfo;

  
  listEl.appendChild(newFoodName);
 
  foodInputEl.innerHTML="";
  foodInputEl.value='';
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
  numberOfFood=0;

  foodAdded=[];
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

submitEl.addEventListener("click", saveInfo);
clearBtnEl.addEventListener("click", clearAllListElements);


$(document).keypress(function(event){
  if(event.which == '13'){
    event.preventDefault();
  }
});
