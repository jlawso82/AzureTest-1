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

            console.log(response.drinks);

            var htmlstring = "";
            //iterate over the collection of results
            var drinks = response.drinks;

            for (var i = 0; i < drinks.length; i++){
                var x = drinks[i];
                console.log(x);
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

                        var y = response.strInstructions;
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






