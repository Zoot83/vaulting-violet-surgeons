var userCall = localStorage.getItem('userName');
localStorage.getItem('userName', JSON.stringify(userCall));
console.log(userCall);

var userGoal = localStorage.getItem("calorieGoal");
localStorage.getItem('calorieGoal', JSON.stringify(userGoal));

document.querySelector('userData').innerHTML = userCall;


