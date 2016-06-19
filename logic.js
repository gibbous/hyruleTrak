//VARIABLES
var dataRef = new Firebase("hyruletrak.firebaseIO.com");
var name;
var destination;
var firstTrain;
var frequency;

//FUNCTIONS


$(document).ready(function() {
//Firebase watcher + initial loader HINT: .on("value")
dataRef.on("value", function(snapshot) {

  var train = snapshot.val();
  // Log everything that's coming out of snapshot
  console.log(train);

  // Change the HTML to reflect
  $("#namedisplay").html(snapshot.val().name);
  $("#emaildisplay").html(snapshot.val().email);
  $("#agedisplay").html(snapshot.val().age);
  $("#commentdisplay").html(snapshot.val().comment);


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

/*
dataRef.on("child_added", function(childSnapshot) {

    displayData(childSnapshot);
});


dataRef.orderByChild("dateAdded").on("child_added", function(snapshot){
    
    $("#nameDisplay").html(snapshot.name.val());
    $("#destinationDisplay").html(snapshot.destination.val());
    $("#firstTrainDisplay").html(snapshot.firstTrain.val());
    $("#frequencyDisplay").html(snapshot.frequency.val());
  });

    //full list of items to the well (well is from recentUser app)

    $('#full-member-list').append(
        "<div class='well'><span id='name'> " + childSnapshot.val().name+" </span><span id="role"
        + childSnapshot.val().startDate+" </span><span id="role"



function displayData(childSnapshot) {
    console.log(childSnapshot.name.val);
    console.log(childSnapshot.destination.val);
    console.log(childSnapshot.firstTrain.val);
    console.log(childSnapshot.frequency.val);
    
}
*/
});