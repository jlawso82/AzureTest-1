/**
 * Created by 1403557 on 15/04/2016.
 */
function getResultsFromAbsolute () {
    $.ajax({
        type: "GET",
        url: "http://addb.absolutdrinks.com/ingredients/?apiKey=358923c93ff0436bb76cb445300b70f1&pageSize=500",
        dataType: 'jsonp',
        success: function(response){
            console.log(response);

            var htmlstring = "";
            //iterate over the collection of results
            var drinks=response["result"];
;            for (var i in drinks)
            {
            var x=drinks[i];
               var title = x["name"];
                htmlstring += "<li>" + title + "</li>";
            }
            //for (var i = 0; i < 10; i++) {
            //    var title = jsondata.response[i].name;
            //    htmlstring += "<li>" + title + "</li>";
            //}

            //inject the HTML into our empty list
            $("#helpmelist").append(htmlstring);

        }
    });
}





