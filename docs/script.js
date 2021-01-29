
$(".city-button").on("click", function(){
    var city = $(".city-text").val()

    console.log(city)

    $(".city-text").val("")

    $(".today-weather").empty()

    $(".5day-forecast").empty()
    

//call search weather function
weatherSearch(city);
fiveDayCast(city);
cityList(city);
})

function weatherSearch(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=28d37e6656eadc2994bbfd340f0e904e"

    $.ajax({
    type: "GET",
    url: queryURL
    }
    ).then(function(response){
        console.log(response)

        var card = $("<div>").addClass("card")

        var body = $("<div>").addClass("card-body")

        var cityName = $("<h2>").text(response.name)

        var temp = $("<p>").text(`temp: ${response.main.temp} F°`)

        var humid = $("<p>").text(`Humidity: ${response.main.humidity}%`)

        var wind = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`)
        
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")


        body.append(cityName, img , temp, humid, wind)

        card.append(body)

        $(".today-weather").append(card)

        var lat = response.coord.lat
        var lon = response.coord.lon
        UVIndex(lat, lon)
    })
}

function UVIndex(lat, lon){

    var queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=28d37e6656eadc2994bbfd340f0e904e`

    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function(response){
        console.log(response)

        if (response.value <= 2 ){
            var UVValue = $("<p>").addClass("UVreadingGood").html( "UV index <span>" + response.value + "</span>" )

        } else if (2 < response.value <= 7) {
            var UVValue = $("<p>").addClass("UVreadingOk").html( "UV index <span>" + response.value + "</span>" )

        } else {
            var UVValue = $("<p>").addClass("UVreadingBad").html( "UV index <span>" + response.value + "</span>" )
        }

        $(".today-weather .card-body").append(UVValue)
        


    })

}

function fiveDayCast(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=28d37e6656eadc2994bbfd340f0e904e"

    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function(response){
        console.log(response)


        var weatherCast = response.list[0]

        console.log(weatherCast)

        for (var i = 0; i < response.list.length; i = i + 8) {
            var card = $("<div class = 'col-md-2'>");

            var body = $("<div>").addClass("bg-primary text-white")

            var weatherCastDay = response.list[i]

            var fiveCastDate = $("<h2>").text(weatherCastDay.dt_txt.substring(0,10))


            var fiveCastTemp = $("<p>").text(`temp: ${weatherCastDay.main.temp} F°`)


            var fiveCastHumidity = $("<p>").text(`Humidity: ${weatherCastDay.main.humidity}%`)


            var fiveCastMain = $("<p>").text(weatherCastDay.weather[0].icon)

            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weatherCastDay.weather[0].icon + ".png")
            

            body.append(fiveCastDate, img, fiveCastTemp, fiveCastHumidity)

            card.append(body)
    
            $(".5day-forecast").append(card)

        }
        
    })

}

function cityList(city){

    var list = $("<li class = 'card-body'>").html("<button class = 'cityListButton btn btn-primary'>" + city + "</button>")

    $(".cityList").append(list)

    localStorage.setItem("cityname", city)

$(".cityListButton").on("click",function(){

    var city = $(this).text()

    weatherSearch(city);
    fiveDayCast(city);


    $(".city-text").val("")

    $(".today-weather").empty()

    $(".5day-forecast").empty()

    
} )



}