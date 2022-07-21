var submitBtn = document.getElementById("submitBtn");
var nameTextBox = document.getElementById("nameTextBox");
var calorieGoalTextBox = document.getElementById("calorieGoalTextBox");
var recipe1Div = document.getElementById("recipe1Div");
var recipe1Button = document.getElementById("recipe1Button");
var recipe2Div = document.getElementById("recipe2Div");
var recipe2Button = document.getElementById("recipe2Button");
var recipe3Div = document.getElementById("recipe3Div");
var recipe3Button = document.getElementById("recipe3Button");


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

getRecipes(3, [recipe1Div, recipe2Div, recipe3Div]);



function getRecipes (recipesCount, divArray) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c9ecfd15f0mshd815ab6571d82bep10cfb3jsn15dff0bd4a42',
            'X-RapidAPI-Host': 'random-recipes.p.rapidapi.com'
        }
    };

    fetch('https://random-recipes.p.rapidapi.com/ai-quotes/' + recipesCount, options)
    .then(response => response.json())
    .then(function (data) {
        displayRecipes(recipesCount, divArray, data);
        })
    .catch(err => console.error(err));
}

function displayRecipes (recipesCount, divArray, recipeArray) {
    for (let i = 0; i < recipesCount; i++) {
		var remover = divArray[i].querySelectorAll(".list-elem");
		remover.forEach(element => {
			element.remove();
		});
        divArray[i].querySelector(".title").innerHTML = recipeArray[i].title;
		divArray[i].querySelector(".image").setAttribute("src", recipeArray[i].image);
		for (let k = 0; k < recipeArray[i].ingredients.length; k++) {
			var li = document.createElement('li');
            var br = document.createElement('br');
            li.innerHTML = recipeArray[i].ingredients[k];
			li.classList.add("list-elem");
			br.classList.add("list-elem");
            divArray[i].querySelector(".ingredients").appendChild(li);
            divArray[i].querySelector(".ingredients").appendChild(br);
		}
        for (let j = 0; j < recipeArray[i].instructions.length; j++) {
            var li = document.createElement('li');
            var br = document.createElement('br');
            li.innerHTML = recipeArray[i].instructions[j].text;
			li.classList.add("list-elem");
			br.classList.add("list-elem");
            divArray[i].querySelector(".instructions").appendChild(li);
            divArray[i].querySelector(".instructions").appendChild(br);
        }
    }
}

recipe1Button.addEventListener("click", function () {
    getRecipes(1, [recipe1Div])
});

recipe2Button.addEventListener("click", function () {
    getRecipes(1, [recipe2Div])
});

recipe3Button.addEventListener("click", function () {
    getRecipes(1, [recipe3Div])
});
