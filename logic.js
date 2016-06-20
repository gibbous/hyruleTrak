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


//Load train information from firebase to timetable

dataRef.orderByChild("dateAdded").on("child_added", function(snapshot){
    
    var trainName = snapshot.val().name;
    var trainDestination =snapshot.val().destination;
    var trainStart = snapshot.val().firstTrain;
    var trainFreq = snapshot.val().frequency;

// Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFreq + "</td><td>" + "nextArrival" + "</td><td>" + "minutesAway" + "</td></tr>");

  });

    
});