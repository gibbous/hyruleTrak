//VARIABLES

//Link to Firebase
var dataRef = new Firebase("hyruletrak.firebaseIO.com");

var name;
var destination;
var firstTrain;
var frequency;
var now;


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

//Calculate time of next train and minutes away
    
    var tFrequency = trainFreq
    var firstTime = trainStart

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
  
    // Current Time
    var currentTime = moment();
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency; //difference between frequency and the remainder
  
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
  
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    var nextTrainTime = moment(nextTrain).format("hh:mm")

// Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFreq + " minutes" + "</td><td>" + nextTrainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });

    
});