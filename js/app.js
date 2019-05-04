// from recipeData.js
var entries = recipeData;

var searchDict = {};

// go through recipeData and make all ingredient arrays into actual arrays
totData = [];
entries.forEach(element => {
  // element["Ingredients"] = element["Ingredients"].slice(1, -1);
  // console.log(totData)
  // console.log(element["Ingredients"])
});

//function we will use for ingredient search
function searchIngredients(searchTerms, entryArray) {
  console.log("Began search for")
  console.log(searchTerms);
  var found = false;
  var hasFound = [];
  returnArray = [];
  for (var entry of entryArray) {
    hasFound = [];
    for (var term of searchTerms){
      //make an array out of the string of an array that we have right now so we can loop through it
      ingredientsArray = entry["Ingredients"].replace(/[\[\]']+/g, '').split(",");
      console.log(ingredientsArray)
      for (var ing of ingredientsArray) {
        ing = ing.toLowerCase();
        if (ing.includes(term)) {
          found = true;
        }
      }
      //if it found the ingredient it'll push true, otherwise will push false
      hasFound.push(found);
      //reset found
      found = false;
    } //ends looping through each search term
    //if all the terms in the search array are true then conditional will be true, and we'll save the recipe
    console.log(hasFound)
    if(hasFound.every(Boolean)){
      returnArray.push(entry);
    }
  } // ends looping through each entry
  return returnArray;
} //ends function

//BUTTON CLICKS HANDLING BELOW

// this is if they click the ingredient query
var ingClick = d3.select("#filterBtnIng");
ingClick.on("click", function() {
  //don't refresh the page
  d3.event.preventDefault();
  if(d3.select("#ing1").property("value")){
    searchDict["Ing1"] = [d3.select("#ing1").property("value")]; }
  if(d3.select("#ing2").property("value")){
    searchDict["Ing2"] = [d3.select("#ing2").property("value")]; }
  if(d3.select("#ing3").property("value")){
    searchDict["Ing3"] = [d3.select("#ing3").property("value")]; }
})

//this is if they click the dietary restrictions query
var dietClick = d3.select("#filterBtnDiet");
dietClick.on("click", function() {
  d3.event.preventDefault();
  searchDict["Restrictions"] = [];
  if(d3.select("#pork").property("checked")){
    searchDict["Restrictions"].push("Pork") }
  if(d3.select("#chicken").property("checked")){
    searchDict["Restrictions"].push("Chicken") }
  if(d3.select("#beef").property("checked")){
    searchDict["Restrictions"].push("Beef") }
  if(d3.select("#milk").property("checked")){
    searchDict["Restrictions"].push("Milk") }
  if(d3.select("#cheese").property("checked")){
    searchDict["Restrictions"].push("Cheese") }
  if(d3.select("#butter").property("checked")){
    searchDict["Restrictions"].push("Butter") }
  if(d3.select("#eggs").property("checked")){
    searchDict["Restrictions"].push("Eggs") }
  if(d3.select("#sugar").property("checked")){
    searchDict["Restrictions"].push("Sugar") }
  if(d3.select("#peanuts").property("checked")){
    searchDict["Restrictions"].push("Peanuts") }
  if(d3.select("#walnuts").property("checked")){
    searchDict["Restrictions"].push("Walnuts") }
  if(d3.select("#almonds").property("checked")){
    searchDict["Restrictions"].push("Almonds") }
  if(d3.select("#cashews").property("checked")){
    searchDict["Restrictions"].push("Cashews") }
})

//this is if they click the duration query
var durClick = d3.select("#filterBtnDur");
durClick.on("click", function() {
  d3.event.preventDefault();
  searchDict['Duration'] = {};
  if(d3.select("#days").property("value")){
    searchDict.Duration.days = [d3.select("#days").property("value")]; }
  if(d3.select("#hours").property("value")){
    searchDict.Duration.hours = [d3.select("#hours").property("value")]; }
  if(d3.select("#mins").property("value")){
    searchDict.Duration.mins = [d3.select("#mins").property("value")]; }
})

//input is what the user enters into the form
var filterClick = d3.select("#filterButt");
filterClick.on("click", function(){
  console.log(searchDict);
  
  var ingTable = [], durTable = [], dietTable = [];
  // if ingredients are used in search, it will execute the following
  if(searchDict.Ing1 || searchDict.Ing2 || searchDict.Ing3) {
    var searchArray = [];
    if (searchDict.Ing1) {searchArray.push(searchDict.Ing1[0].toLowerCase());}
    if (searchDict.Ing2) {searchArray.push(searchDict.Ing2[0].toLowerCase());}
    if (searchDict.Ing3) {searchArray.push(searchDict.Ing3[0].toLowerCase());}
    
    //refer to function start on line 15
    ingTable = searchIngredients(searchArray, entries);
    console.log(ingTable);
  }

  // if dietary restrictions are used, it will execute the following
  if (searchDict.Restrictions) {
    var tempTable = [];
    var restrictions = searchDict.Restrictions;
    //use modified table if we have it, otherwise use total data
    if (ingTable.length > 0) {tempTable = ingTable}
    else {tempTable = entries}

    tempTable.forEach(element => {
      for (var restrict of restrictions) {
        if (element[restrict]) {break;}
      } //end looping through each restrictions
      //if none of the restrictions are triggered, keep the recipe
      dietTable.push(element);
    })
    console.log(dietTable)
  }
  
  // if duration is used in search, it will execute the following
  if (searchDict.Duration) {
    console.log(searchDict.Duration)

    var tempTable = [];

    //get modified tables if applicable
    if (dietTable.length > 0) {tempTable = dietTable}
    else if (ingTable.length > 0) {tempTable = ingTable}

    var days, hours, mins;

    if (searchDict.Duration.days) {days = searchDict.Duration.days}
    if (searchDict.Duration.hours) {hours = searchDict.Duration.hours}
    if (searchDict.Duration.mins) {mins = searchDict.Duration.mins}

    var entryDur;
    tempTable.forEach(entry => {
      entryDur = entry['Duration'];
      if (entryDur.contains("d")) {
        
      }
    })
  }

})

// filterClick.on("click", function() {
//       //it won't refresh
//       d3.event.preventDefault();

//       //these are the criteria for multiple inputs
      
//       if(d3.select("#datetime").property("value")){
//         searchDict['datetime'] = [d3.select("#datetime").property("value")]; }
//       if(d3.select("#city").property("value")){
//         searchDict['city'] = [d3.select("#city").property("value").toLowerCase()]; }
//       if(d3.select("#state").property("value")){
//         searchDict['state'] = [d3.select("#state").property("value").toLowerCase()]; }
//       if(d3.select("#country").property("value")){
//         searchDict['country'] = [d3.select("#country").property("value").toLowerCase()]; }
//       if(d3.select("#shape").property("value")){
//         searchDict['shape'] = [d3.select("#shape").property("value").toLowerCase()]; }
      
//       //see what they've entered as criteria
//       console.log(searchDict);

//       //clear inputs
//       d3.select("#datetime").node().value = "";
//       d3.select("#city").node().value = "";
//       d3.select("#state").node().value = "";
//       d3.select("#country").node().value = "";
//       d3.select("#shape").node().value = "";
  
//       //make a function that'll filter multiple criteria
//       function multiFilter(dataArray, filters) {
//         const filterKeys = Object.keys(filters);
//         //filter only elements passing all criteria
//         return dataArray.filter((sighting) => {
//           return filterKeys.every(key => {
//             return filters[key].includes(sighting[key]);
//           })
//         })
//       }

//       //filter by all criteria that has been entered
//       filteredData = multiFilter(sightings, searchDict);
//       console.log(filteredData);

//       //remove tbody and append again to remove previously queried information
//       d3.select("#dataTable").remove();
//       d3.select("#ufoTable").append("tbody").attr("id","dataTable");
  
//       var tbody = d3.select("tbody");

//       //now loop through the data and append the found data to the table
//       filteredData.forEach((sighting) => {
//         row = tbody.append("tr");
//         row.append("td").text(sighting.datetime);
//         row.append("td").text(sighting.city.toUpperCase());
//         row.append("td").text(sighting.state.toUpperCase());
//         row.append("td").text(sighting.country.toUpperCase());
//         row.append("td").text(sighting.shape);
//         row.append("td").text(sighting.durationMinutes);
//         row.append("td").text(sighting.comments);
//       })      
// })