//Global variables
var counter = 0; //Counts

//Function to confirm the user is over the age of 18
function checkDate(){



    //Set the minimum age
    var age = 18;

    //Set the user input
    var userDay = $("#dayDropdown").val(); //Get the users day of birth
    var userMonth = $("#monthDropdown").val(); //Get the users month of birth
    var userYear = $("#yearDropdown").val(); //Get the users year of birth
    var userDate = new Date();
    userDate.setFullYear(userYear, userMonth - 1, userDay);

    //Set the other dates
    var currDate = new Date(); //Set today's date
    var setDate = new Date(); //Set the valid date
    setDate.setFullYear(userDate.getFullYear() + age, userMonth-1, userDay);

    //If statement to allow access to home.html if valid date of birth is displayed
    if ((currDate-setDate) >= 0){
        //You are 18 or above
        window.location.replace("home.html"); //Takes you to home.html
    }
    else{
        //You are below 18
        if (counter === 0){
            //Display a warning message that the user cannot enter
            warningMessage = document.createElement('h3');
            warningMessage.innerHTML = "Sorry! You're not old enough to Mix It Up :(";
            warningMessage.style.visibility = "show";
            document.getElementById("innerSquare").appendChild(warningMessage);
        }
        else{
            //Do Nothing
        }

    }

    //Increment the counter
    counter++;
}

//Function to check what checkboxes are selected
function getSearchByIngredient(){

    //Get input for the spirits checkboxes
    var vodkaBox = $("#Vodka").is(":checked");
    var ginBox = $("#Gin").is(":checked");
    var sambucaBox = $("#Sambuca").is(":checked");
    var wineBox = $("#Wine").is(":checked");
    var rumBox = $("#Rum").is(":checked");
    var kahluaBox = $("#Kahlua").is(":checked");
    var whiskeyBox = $("#Whiskey").is(":checked");
    var vermouthBox = $("#Vermouth").is(":checked");
    var brandyBox = $("#Brandy").is(":checked");
    var absintheBox = $("#Absinthe").is(":checked");
    var beerBox = $("#Beer").is(":checked");
    var ciderBox = $("#Cider").is(":checked");

    //Get input for the mixers and fruit checkboxes
    var orangeJuiceBox = $("#Orangejuice").is(":checked");
    var lemonadeBox = $("#Lemonade").is(":checked");
    var pineappleJuiceBox = $("#Pineapplejuice").is(":checked");
    var lemonBox = $("#Lemon").is(":checked");
    var limeBox = $("#Lime").is(":checked");
    var cranberryJuiceBox = $("#Cranberryjuice").is(":checked");
    var coconutMilkBox = $("#Coconutmilk").is(":checked");


    //Declare the return variable
    var x;

    //If statement to see what box is selected
    if(vodkaBox == true) {
         x = "http://rheanneapp.azurewebsites.net/theprox.php?url=http://www.thecocktaildb.com/api/json/v1/1/filter.php&i=Vodka";
    }
    else if(ginBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=gin";
    }
    else if(sambucaBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=sambuca";
    }
    else if(wineBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=wine";
    }
    else if(rumBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum";
    }
    else if(kahluaBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=kahlua";
    }
    else if(whiskeyBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=whiskey";
    }
    else if(vermouthBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vermouth";
    }
    else if(brandyBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=brandy";
    }
    else if(absintheBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=absinthe";
    }
    else if(beerBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=beer";
    }
    else if(ciderBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=cider";
    }
    else if(orangeJuiceBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Orange juice";
    }
    else if(lemonadeBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lemonade";
    }
    else if(pineappleJuiceBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Pineapple juice";
    }
    else if(lemonBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lemon";
    }
    else if(limeBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Lime";
    }
    else if(cranberryJuiceBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Cranberry juice";
    }
    else if(coconutMilkBox == true){
        x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Coconut milk";
    }
    else{
        x = "http://www.thecocktaildb.com/api/json/v1/1/random.php"
    }

    //Return x
    return x;
}

//Function to return the results after clicking mix it up
function getResults(){

    //URL for each ingredient that is selected
    var urlToUse = getSearchByIngredient();

    //Use ajax to get the name of the cocktails which are generated from the set url
    $.ajax({
        type: "GET",
        url: urlToUse,
        success: function(response){

            //Get the collection of drinks
            var drinks = response.drinks;

            //Go through the array to get the title and thumbnail of each cocktail
            for (var i = 0; i < drinks.length; i++){

                //Set x to the first drink in the array
                var x = drinks[i]; //Set x to the first element in the array

                var title = x.strDrink; //Get the title of the cocktail
                var thumbnail = x.strDrinkThumb; //Get the thumbnail of the cocktail
                var drinkid = x.idDrink; //Get the id of the cocktail

                //Create a div for each cocktail
                mNewObj = document.createElement('div'); //Create the div
                mNewObj.className = "singleCard"; //Add a class to the card
                mNewObj.id = ("N" + drinkid); //Create a new id - using the drink id
                mNewObj.style.visibility = "show"; //Show the div
                document.getElementById("cardContainer").appendChild(mNewObj); //Add the new div to the main section on the web page

                rightDiv = document.createElement('div'); //Create the right hand side div
                rightDiv.className = "rightDiv"; //Add a class to the card
                rightDiv.id = ("R" + drinkid); //Create a new id - using the drink id
                rightDiv.style.visibility = "show"; //Show the div
                document.getElementById("N" + drinkid).appendChild(rightDiv); //Add the new div to the right hand side of the card container div

                leftDiv = document.createElement('div'); //Create the left hand side div
                leftDiv.className = "leftDiv"; //Add a class to the card
                leftDiv.id = ("L" + drinkid); //Create a new id - using the drink id
                leftDiv.style.visibility = "show"; //Show the div
                document.getElementById("N" + drinkid).appendChild(leftDiv); //Add the new div to the left hand side of the card container div

                //Create and add the header
                newHeader = document.createElement('h4'); //Create a h4 element
                newHeader.className = "titleText"; //Call the h4 element to the titleText
                newHeader.innerHTML = title; //Set the new element to the title of the cocktail
                document.getElementById("L" + drinkid).appendChild(newHeader); //Add the header to leftDiv

                //Add thumbnail
                if (thumbnail == null){
                    //Add a basic image if no image is found
                    $('#L' + drinkid).append('<img id="theImg" src="Images/thumbnail.jpg">')
                }
                else{
                    //Else add the current image
                    $('#L' + drinkid).append('<img id="theImg" src="'+thumbnail+'">')
                }

                //Use ajax to get all the other information about an individual cocktail
                $.ajax({
                    type: "GET",
                    url: "http://rheanneapp.azurewebsites.net/theprox.php?url=http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + title,
                    success: function(response){

                        //Get the response from the API
                        var cocktails = response.drinks;

                        //Create a for loop to iterate through every cocktail
                        for(var j = 0; j <cocktails.length; j++) {

                            //Get the first cocktail
                            var y = cocktails[j];

                            //Create a string to store the instructions
                            var listInstructions = "";

                            //Add each instruction on
                            var instructions = listInstructions.concat(y.strInstructions);

                            //Get the drink id
                            var newdrinkid = y.idDrink;

                            //Create the instructions title
                            newInstructionsTitle = document.createElement('h3'); //Create the h3 title element
                            newInstructionsTitle.className = "instructionsTitle"; //Add a class name
                            newInstructionsTitle.innerHTML = "Instructions"; //Make the title "instructions"
                            $('#R' + newdrinkid).append(newInstructionsTitle); //Add to the right div

                            //Create the instructions text
                            newInstructions = document.createElement('p'); //Create the paragraph element
                            newInstructions.className = "instructionsText"; //Add a class name
                            newInstructions.innerHTML = instructions; //Add the instructions from the API to the newInstructions element
                            $('#R' + newdrinkid).append(newInstructions); //Add to the right div


                            //Create a measure variable to store the measures
                            var measure = "";

                            //Loop through to get the measures (maximum 15)
                            for(var k = 1; k <=15; k++){

                                //If statement to check the measures and ingredients aren't empty
                                if(y['strMeasure'+ k] != "" && y['strIngredient'+ k] != "" ){
                                    measure += y['strMeasure'+ k]; //Add the measure
                                    measure += y['strIngredient'+ k]; //Add the ingredient
                                    measure += "; "; //Add a semi colon
                                }
                            }

                            //Create the ingredients title
                            newIngredientsTitle = document.createElement('h3'); //Create the h3 title element
                            newIngredientsTitle.className = "ingredientsTitle"; //Add a class name
                            newIngredientsTitle.innerHTML = "Ingredients"; //Make the title "ingredients"
                            $('#R' + newdrinkid).append(newIngredientsTitle); //Add to the right div

                            //Create the ingredients text
                            newIngredients = document.createElement('p'); //Create the paragraph element
                            newIngredients.className = "newIngredientsText"; //Add a class name
                            newIngredients.innerHTML = measure; //Add the ingredients from the API to the newIngredients element
                            $('#R' + newdrinkid).append(newIngredients); //Add to the right div

                        }
                    }
                })
            }
        }
    });
}






