//VARIABLES

//Link to Firebase
var dataRef = new Firebase("hyruletrak.firebaseIO.com");

var name;
var destination;
var firstTrain;
var frequency;

//FUNCTIONS
function displayData(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    
}


$(document).ready(function() {
//Firebase watcher + initial loader 
dataRef.on("value", function(snapshot) {

snapshot.forEach(function(snapshot) {
  $("#nameDisplay").html(snapshot.val().name);
  $("#destinationDisplay").html(snapshot.val().destination);
  $("#frequencyDisplay").html(snapshot.val().frequency);
  });




// Handle the errors
}, function(errorObject){

  console.log("Errors handled: " + errorObject.code)
});

//Grab user input
$("#submit-btn").on("click", function(){
    name = $('#nameInput').val();
    destination = $('#destinationInput').val();
    firstTrain = $('#firstTrainInput').val();
    frequency = $('#frequencyInput').val();

//Add new train to Firebase
    dataRef.push({
       name: name,
       destination: destination,
       firstTrain: firstTrain,
       frequency: frequency,
   });
 
 //Reset form fields
  document.getElementById("train").reset();
 
 //Prevent page from reloading 
   return false;
});


//Add new train to timetable
dataRef.on("child_added", function(childSnapshot, prevChildKey) {

    displayData(childSnapshot);
});


dataRef.orderByChild("dateAdded").on("child_added", function(snapshot){
    
    var trainName = snapshot.val().name;
    var trainDestination =snapshot.val().destination;
    var trainStart = snapshot.val().firstTrain;
    var trainFreq = snapshot.val().frequency;

// Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainStart + "</td><td>" + trainFreq + "</td><td>" + "placeholder" + "</td><td>" + "placeholder2" + "</td></tr>");

  var tableRow = $("<tr>");
  var tableData1 = $("<td>");
  tableData1.html(trainName);
  var tableData2 = $("<td>");
  tableData2.html(trainDestination);
  var tableData3 = $("<td>");
  var tableData4 = $("<td>");
  tableRow.append(tableData1);
  tableRow.append(tableData2);
  tableRow.append(tableData3);
  tableRow.append(tableData4);
  $("#trainTable > tbody").append(tableRow);






  });

    
});