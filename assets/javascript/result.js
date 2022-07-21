var dataI = document.getElementById("calorieinput");
var goalI = document.getElementById("goalinput");
var nameI = document.getElementById("nameinput")
var userCall = localStorage.getItem('userName');
var userGoal = localStorage.getItem("calorieGoal");
var userDaily = document.querySelector('userData');
dataI.textContent = localStorage.getItem("data");
goalI.textContent = localStorage.getItem("calorieGoal");
nameI.textContent = localStorage.getItem("userName");
var remain = document.querySelector("#remainingCal");


var remainingCal = (userGoal - localStorage.getItem("data"));

if(remainingCal>0){
    remain.innerHTML = "You were above your goal for today. Your remaining total is: "+ remainingCal;
}else if(remainingCal==0){
    remain.innerHTML = "You have met you goal for today!";
}else{
    remain.innerHTML= "You were below your calorie goal for today.Your remaining total is: "+ remainingCal;
}