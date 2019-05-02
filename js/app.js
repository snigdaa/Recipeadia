// from recipeJS.js
var entries = recipeData;

// YOUR CODE HERE!

//input is what the user enters into the form
var filterClick = d3.select("#filter-btn");

filterClick.on("click", function() {
      //it won't refresh
      d3.event.preventDefault();

      //these are the criteria for multiple inputs
      var searchDict = {}
      if(d3.select("#datetime").property("value")){
        searchDict['datetime'] = [d3.select("#datetime").property("value")]; }
      if(d3.select("#city").property("value")){
        searchDict['city'] = [d3.select("#city").property("value").toLowerCase()]; }
      if(d3.select("#state").property("value")){
        searchDict['state'] = [d3.select("#state").property("value").toLowerCase()]; }
      if(d3.select("#country").property("value")){
        searchDict['country'] = [d3.select("#country").property("value").toLowerCase()]; }
      if(d3.select("#shape").property("value")){
        searchDict['shape'] = [d3.select("#shape").property("value").toLowerCase()]; }
      
      //see what they've entered as criteria
      console.log(searchDict);

      //clear inputs
      d3.select("#datetime").node().value = "";
      d3.select("#city").node().value = "";
      d3.select("#state").node().value = "";
      d3.select("#country").node().value = "";
      d3.select("#shape").node().value = "";
  
      //make a function that'll filter multiple criteria
      function multiFilter(dataArray, filters) {
        const filterKeys = Object.keys(filters);
        //filter only elements passing all criteria
        return dataArray.filter((sighting) => {
          return filterKeys.every(key => {
            return filters[key].includes(sighting[key]);
          })
        })
      }

      //filter by all criteria that has been entered
      filteredData = multiFilter(sightings, searchDict);
      console.log(filteredData);

      //remove tbody and append again to remove previously queried information
      d3.select("#dataTable").remove();
      d3.select("#ufoTable").append("tbody").attr("id","dataTable");
  
      var tbody = d3.select("tbody");

      //now loop through the data and append the found data to the table
      filteredData.forEach((sighting) => {
        row = tbody.append("tr");
        row.append("td").text(sighting.datetime);
        row.append("td").text(sighting.city.toUpperCase());
        row.append("td").text(sighting.state.toUpperCase());
        row.append("td").text(sighting.country.toUpperCase());
        row.append("td").text(sighting.shape);
        row.append("td").text(sighting.durationMinutes);
        row.append("td").text(sighting.comments);
      })      
})