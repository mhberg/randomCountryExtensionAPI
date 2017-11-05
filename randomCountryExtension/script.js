$(document).ready(function (){
var countryURL = "http://localhost/api.php/country/";
var cityURL = "http://localhost/api.php/city/";

$.get(countryURL, function(data){
    //parse JSON data
    var parsedData = JSON.parse(data);
    //get maxIndex from data array
    var maxIndex = parsedData.length;
    //generate random number between 1 and maxIndex
    var ranNum = Math.floor((Math.random() * maxIndex) + 1);
    //get info on random country
    var country = parsedData[ranNum].Name;
    var continent = parsedData[ranNum].Continent;
    var pop = parsedData[ranNum].Population;
    var gnp = parsedData[ranNum].GNP;

    //get capital number and JSON data for that city
    var capitalNum = parsedData[ranNum].Capital;
    $.get((cityURL + capitalNum), function(data2){
        var parsedData2 = JSON.parse(data2)
        var capital = parsedData2.Name;

        //setup infotext
        var infoText = "<h3>" + country + "</h3>";
        infoText += "<p>Continent: " + continent + "</p>";
        infoText += "<p>Population: " + pop + "</p>";
        infoText += "<p>GNP: " + gnp + "</p>";
        infoText += "<p>Capital: " + capital + "</p>";
        
        //append to infoText div
        $("#infoText").empty();
        $("#infoText").append(infoText);
    });
  });
});