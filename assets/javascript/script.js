var submitBtn = document.getElementById("submitBtn");


submitBTn.addEventListener("click", submition);


function submition () {
    var userName = nameTextBox.value;
    var calorieGoal = calorieGoalTextBox.value;
    localStorage.setItem("userName", userName);
    localStorage.setItem("calorieGoal", calorieGoal);
}
