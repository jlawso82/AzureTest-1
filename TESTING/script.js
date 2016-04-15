/**
 * Created by 1403557 on 15/04/2016.
 */
$.ajax({
    type: "GET",
    url: "http://addb.absolutdrinks.com/ingredients/?apiKey=358923c93ff0436bb76cb445300b70f1",
    dataType: 'json',
    data: "i=Gin&Vodka",
    success: function(response){
        console.log(result);
    }
});



