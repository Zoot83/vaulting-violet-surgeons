var dataI = document.getElementById("calorieinput");
var goalI = document.getElementById("goalinput");
var nameI = document.getElementById("nameinput")
var userCall = localStorage.getItem('userName');
var userGoal = localStorage.getItem("calorieGoal");
var userDaily = document.querySelector('userData');
dataI.textContent = localStorage.getItem("data");
goalI.textContent = localStorage.getItem("calorieGoal");
nameI.textContent = localStorage.getItem("userName");