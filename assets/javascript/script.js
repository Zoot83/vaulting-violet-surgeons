var submitBtn = document.getElementById("submitBtn");
var nameTextBox = document.getElementById("nameTextBox");
var calorieGoalTextBox = document.getElementById("calorieGoalTextBox");


submitBtn.addEventListener("click", submition);


function submition () {
    if(nameTextBox!=null && calorieGoalTextBox!=null){
    var userName = nameTextBox.value;
    var calorieGoal = calorieGoalTextBox.value;
    localStorage.setItem("userName", userName);
    localStorage.setItem("calorieGoal", calorieGoal);
    console.log("Button Clicked");
    }
}


