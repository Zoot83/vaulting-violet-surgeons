# vaulting-violet-surgeons  

In this project we created a website that is a calorie tracker. We creaeted 3 different different pages to the website all doing utilizing the informaition
that was added in the homepage. On the homepage we ask the user for their name and what they want their daily calorie goal to be. We save thins information for the 
other pages. Also on the homepage we added 3 sections with a rotation of recipes that are going to be shown by selecting the ne recipe there will be
a new receipe for that section. 

On the tracker page we utilize the name and goal of the user. We display that information at the top so when they are adding foods to the list
they can see what their daily total is vs their daily goal. In this section we do an api search with nutitionix and use the information from their 
extensive database for calculating the calories of the food that was entered. This information is then added to the list of food for the day. 

On the results page we pull all the information together and display it while letting them know ideas and tips to help them. 
## Authors

- [@marshallrizzuto](https://github.com/Zoot83)
- [@Saeedelmakki](https://github.com/14elmaksh)
- [@nicholasmaier](https://github.com/NicholasMaier)

Website: https://github.com/Zoot83/vaulting-violet-surgeons
## Features

- Javascript
- API's
- Heirarchy 
- Function returned values
- Local storage
- Query Selectors
- Arrays
- JSON



## Demo

    ![](../../Downloads/image.png)
    ![](../../OneDrive/Desktop/Home.gif)
## Usage/Examples

  In this snippet of code it demonstartes the ability to make an api call that will return information that will be utilized throughout the code. 
  This code shows the  way that we go the recipes from a third party api and were able to store the information into the page. 

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
        console.log(data);
        displayRecipes(recipesCount, divArray, data);
        })
    .catch(err => console.error(err));
}



This snipped of code shows that on the click event for any of the values that were created with the dropdown menu. 

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
