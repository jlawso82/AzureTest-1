//Global variables
var counter = 0; //Counts

//Function to confirm the user is over the age of 18
function checkDate(){

    //Get todays date and change the month setting
    var todaysDate = new Date(); //Get todays date

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
            warningMessage.innerHTML = "Sorry! You're not old enough to Mix It Up :("
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

    var vodkaBox = $("#Vodka").is(":checked");
    var ginBox = $("#Gin").is(":checked");
    var sambucaBox = $("#Sambuca").is(":checked");
    var wineBox = $("#Wine").is(":checked");
    var x;

    if(vodkaBox == true) {
         x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka";
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

    return x;
}

function getResults(){

    //URL for each ingredient that is selected
    var urlToUse = getSearchByIngredient();

    //Use ajax to get the name of the cocktails which are generated from the set url
    $.ajax({
        type: "GET",
        url: urlToUse,
        success: function(response){

            //Iterate over the collection of results
            var drinks = response.drinks;

            //Go through the array to get the title and thumbnail of each cocktail
            for (var i = 0; i < drinks.length; i++){
                console.log(i);
                var x = drinks[i]; //Set x to the first element in the array
                var title = x.strDrink; //Get the title of the cocktail
                var thumbnail = x.strDrinkThumb; //Get the thumbnail of the cocktail
                var drinkid = x.idDrink;

                //Create a div for each cocktail
                mNewObj = document.createElement('div'); //Create the div
                mNewObj.className = "singleCard"; //Add a class to the card
                mNewObj.id = ("N" + drinkid); //Create a new id
                mNewObj.style.visibility = "show"; //Show the div
                document.getElementById("cardContainer").appendChild(mNewObj); //Add the new div to the main section on the web page

                rightDiv = document.createElement('div'); //Create the div
                rightDiv.className = "rightDiv"; //Add a class to the card
                rightDiv.id = ("R" + drinkid); //Create a new id
                rightDiv.style.visibility = "show"; //Show the div
                document.getElementById("N" + drinkid).appendChild(rightDiv);

                leftDiv = document.createElement('div'); //Create the div
                leftDiv.className = "leftDiv"; //Add a class to the card
                leftDiv.id = ("L" + drinkid); //Create a new id
                leftDiv.style.visibility = "show"; //Show the div
                document.getElementById("N" + drinkid).appendChild(leftDiv);
                //$('#N' + newdrinkid).append(newIngredList));

                //Create and add the header
                newHeader = document.createElement('h4'); //Create a h3 element
                newHeader.className = "titleText";
                newHeader.innerHTML = title; //Set the new element to the title of the cocktail
                document.getElementById("L" + drinkid).appendChild(newHeader); //Add the header to the singleCard div

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
                    url: "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + title,
                    success: function(response){

                        var cocktails = response.drinks;
                        //console.log(cocktails);
                        for(var j = 0; j <cocktails.length; j++) {
                            var y = cocktails[j];
                            //console.log(y['strMeasure1']);
                            var listInstructions = "";
                            var instructions = listInstructions.concat(y.strInstructions);
                            //console.log(instructions);
                            var newdrinkid = y.idDrink;

                            newInstructionsTitle = document.createElement('h3');
                            newInstructionsTitle.className = "instructionsTitle"
                            newInstructionsTitle.innerHTML = "Instructions";
                            $('#R' + newdrinkid).append(newInstructionsTitle);

                            newInstructions = document.createElement('p'); //Create the paragraph element
                            newInstructions.className = "instructionsText";
                            newInstructions.innerHTML = instructions;
                            $('#R' + newdrinkid).append(newInstructions);

                            var measure = "";

                            for(var k = 1; k <=15; k++){

                                measure += y['strMeasure'+ k];
                                measure += y['strIngredient'+ k];
                                console.log(measure);
                            }

                            //document.getElementById('N' + newdrinkid).appendChild(newIngredlist); //Add the new div to the main section on the web page

                            newIngredientsTitle = document.createElement('h3');
                            newIngredientsTitle.className = "ingredientsTitle"
                            newIngredientsTitle.innerHTML = "Ingredients";
                            $('#R' + newdrinkid).append(newIngredientsTitle);


                            newIngredients = document.createElement('p');
                            newIngredients.className = "newIngredientsText";
                            newIngredients.innerHTML = measure;
                            $('#R' + newdrinkid).append(newIngredients);

                        }






                    }
                })

            }
        }
    });



}






