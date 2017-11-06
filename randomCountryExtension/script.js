$(document).ready(function (){
var countryURL = "http://localhost/REST/api.php/country/";
var cityURL = "http://localhost/REST/api.php/city/";

mainfunction();

    function mainfunction(){
    $.get(countryURL, function(data){
        //parse JSON data
        var countryData = JSON.parse(data);
        //get maxIndex from data array
        var maxIndex = countryData.length;
        //generate random number between 1 and maxIndex
        var ranNum = Math.floor((Math.random() * maxIndex) + 1);
        //get info on random country
        var country = countryData[ranNum].Name;
        var continent = countryData[ranNum].Continent;
        var pop = countryData[ranNum].Population;
        var gnp = countryData[ranNum].GNP;

            //get capital number and JSON data for that city
            var capitalNum = countryData[ranNum].Capital;
            $.get((cityURL + capitalNum), function(data2){
                var capitalData = JSON.parse(data2);
                var capital = capitalData.Name;

                //get other cities and ignore capital
                $.get(cityURL, function(data3){
                    cityData = JSON.parse(data3);
                    var citiesArray = [];
                    for (var i = 0; i < cityData.length; i++) {
                        if (cityData[i].CountryCode == countryData[ranNum].Code){
                            if(cityData[i].ID != capitalNum){
                                citiesArray.push(cityData[i].Name);
                            }
                        }
                    }

                    //setup infotext
                    var infoText = "<h3>" + country + "</h3>";
                    infoText += "<p>Continent: " + continent + "</p>";
                    infoText += "<p>Population: " + pop + "</p>";
                    infoText += "<p>GNP: " + gnp + "</p>";
                    infoText += "<p>Capital: " + capital + "</p>";
                    infoText += "<p>Other major cities:";

                    citiesArray.forEach(function(element, index) {
                        infoText += " " + element;
                        if(citiesArray[index + 1]){
                            infoText += ",";
                        } else {
                            infoText += ".";
                        }
                    }, this);

                    infoText += "</p>";
        
                    //append to infoText div
                    $("#infoText").empty();
                    $("#infoText").append(infoText);
                });
            });
        });
    }

    $("#newButton").click(function (){
        mainfunction();
    });
});