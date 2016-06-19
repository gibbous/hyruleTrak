//VARIABLES
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
//Firebase watcher + initial loader HINT: .on("value")
dataRef.on("value", function(childSnapshot) {


  $("#nameDisplay").html(childSnapshot.val().name);
  $("#destinationDisplay").html(childSnapshot.val().destination);
  $("#frequencyDisplay").html(childSnapshot.val().frequency);
  


// Handle the errors
}, function(errorObject){

  console.log("Errors handled: " + errorObject.code)
});

$("#submit-btn").on("click", function(){
     name = $('#nameInput').val();
    destination = $('#destinationInput').val();
    firstTrain = $('#firstTrainInput').val();
    frequency = $('#frequencyInput').val();


    dataRef.push({
       name: name,
       destination: destination,
       firstTrain: firstTrain,
       frequency: frequency,
   });
 
  document.getElementById("train").reset();
  
   return false;
});

dataRef.on("child_added", function(childSnapshot) {

    displayData(childSnapshot);
   
});




dataRef.on("child_added", function(childSnapshot) {

    displayData(childSnapshot);
});


dataRef.orderByChild("dateAdded").on("child_added", function(snapshot){
    
    $("#nameDisplay").html(snapshot.val().name);
    $("#destinationDisplay").html(snapshot.val().destination);
    $("#firstTrainDisplay").html(snapshot.val().firstTrain);
    $("#frequencyDisplay").html(snapshot.val().frequency);
  });

    
});