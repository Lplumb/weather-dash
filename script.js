
$(".city-button").on("click", function(){
    var city = $(".city-text").val()

    console.log(city)

    $(".city-text").val("")
//call search weather function
weatherSearch(city);
fiveDayCast(city);
})

function weatherSearch(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=28d37e6656eadc2994bbfd340f0e904e"

    $.ajax({
    type: "GET",
    url: queryURL
    }
    ).then(function(response){
        console.log(response)

        var card = $("<div>").addClass("card")

        var body = $("<div>").addClass("card-body")

        var cityName = $("<h2>").text(response.name)

        var temp = $("<p>").text(`temp: ${response.main.temp}`)

        var humid = $("<p>").text(`Humidity: ${response.main.humidity}`)

        var wind = $("<p>").text(`Wind Speed: ${response.wind.speed}`)

        body.append(cityName, temp, humid, wind)

        card.append(body)

        $(".today-weather").append(card)

        var lat = response.coord.lat
        var lon = response.coord.lon
        UVIndex(lat, lon)
    })
}

function UVIndex(lat, lon){

    var queryURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=28d37e6656eadc2994bbfd340f0e904e`

    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function(response){
        console.log(response)

        var UVValue = $("<p>").text(`UV Index: ${response.value}`)
        $(".today-weather .card-body").append(UVValue)


    })

}

function fiveDayCast(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=28d37e6656eadc2994bbfd340f0e904e"

    $.ajax({
        type: "GET",
        url: queryURL
    }).then(function(response){
        console.log(response)
    })

}