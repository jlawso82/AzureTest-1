//Function to confirm the user is over the age of 18
function checkDate(){

    console.log("Im here")

    //Get todays date and change the month setting
    var todaysDate = new Date(); //Get todays date

    var age = 18;

    var userDay = $("#dayDropdown").val(); //Get the users day of birth
    var userMonth = $("#monthDropdown").val(); //Get the users month of birth
    var userYear = $("#yearDropdown").val(); //Get the users year of birth
    var userDate = new Date();
    userDate.setFullYear(userYear, userMonth - 1, userDay);

    var currDate = new Date();
    var setDate = new Date();

    setDate.setFullYear(userDate.getFullYear() + age, userMonth-1, userDay);

    if ((currDate-setDate) >= 0){
        //You are above 18
        window.location.replace("home.html");
    }
    else{
        alert("below 18");
    }




}

function getSearchByIngredient(){

    var vodkaBox = $("#Vodka").is(":checked");
    var ginBox = $("#Gin").is(":checked");
    var sambucaBox = $("#Sambuca").is(":checked");
    var x;

    if(vodkaBox == true) {
         x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=wine";
    }

    return x;
}

function createDiv(){

    mNewObj = document.createElement('div');
    mNewObj.id = "singleCard";
    mNewObj.style.visibility = "show";
    document.getElementById("cardContainer").appendChild(mNewObj);

}

function getResults(){

    var urlToUse = getSearchByIngredient();

    $.ajax({
        type: "GET",
        url: urlToUse,
        success: function(response){

            //console.log(response.drinks);

            var htmlstring = "";
            //iterate over the collection of results
            var drinks = response.drinks;

            for (var i = 0; i < drinks.length; i++){
                var x = drinks[i];
                //console.log(x);
                var title = x.strDrink;
                var thumbnail = x.strDrinkThumb;


                mNewObj = document.createElement('div');
                mNewObj.className = "singleCard";
                mNewObj.id = ("singleCard" + i);
                mNewObj.style.visibility = "show";
                document.getElementById("cardContainer").appendChild(mNewObj);

                //add header
                newHeader = document.createElement('h3');
                newHeader.innerHTML = title;
                document.getElementById("singleCard" + i).appendChild(newHeader);

                //add thumbnail
                $('#singleCard' + i).append('<img id="theImg" src="'+thumbnail+'">')

                //add

                $.ajax({
                    type: "GET",
                    url: "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + title,
                    success: function(response){

                        var cocktails = response.drinks;

                        var y = cocktails.strInstructions;
                        console.log(y);




                    }
                })

                //htmlstring += "<li>" + title + "</li>";
            }
            //console.log(htmlstring);

            //inject the HTML into our empty list
            //$("#helpmelist").append(htmlstring);
        }
    });



}






