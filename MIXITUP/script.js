function mixItUp(){

    var vodkaBox = $("#Vodka").is(":checked");
    var ginBox = $("#Gin").is(":checked");
    var sambucaBox = $("#Sambuca").is(":checked");
    var x;

    if(vodkaBox == true) {
         x = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=wine&callback=?";
    }

    return x;
}

function createDiv(){

    mNewObj = document.createElement('div');
    mNewObj.id = "singleCard"
    mNewObj.style.visibility = "show";
    document.getElementById("cardContainer").appendChild(mNewObj);

}












function getAllInformation(){

    var newCocktail = getResults();

    $.ajax({
        type: "GET",
        url: "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + newCocktail,
        success: function(response){

            console.log(response.drinks);

        }
    })

}

function getResults(){

    var urlToUse = mixItUp();

    $.ajax({
        type: "GET",
        url: urlToUse,
        success: function(response){

            console.log(response.drinks);

            var htmlstring = "";
            //iterate over the collection of results
            var drinks = response.drinks;

            for (var i in drinks){
                var x = drinks[i];
                console.log(x);
                var title = x.strDrink;
                htmlstring += "<li>" + title + "</li>";
            }
            console.log(htmlstring);
            //for (var i = 0; i < 10; i++) {
                //var title = jsondata.response[i].name;
               //htmlstring += "<li>" + title + "</li>";
            //}

            //inject the HTML into our empty list
            $("#helpmelist").append(htmlstring);
        }
    });



}






