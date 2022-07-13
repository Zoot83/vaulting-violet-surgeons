var userCall = localStorage.getItem('userData');
localStorage.getItem('userData', JSON.stringify(userCall));

var userGoal = localStorage.getItem("calorieGoal");
localStorage.getItem('calorieGoal', JSON.stringify(userGoal));

document.querySelector('userData').innerHTML = userCall;
console.log(userCall);