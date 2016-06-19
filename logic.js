var dataRef = new Firebase("hyruletrak.firebaseIO.com");
var name;
var destination;
var firstTrain;
var frequency;


$(document).ready(function() {

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
 
   return false;
});

dataRef.on("child_added", function(childSnapshot) {

    displayData(childSnapshot);
});


dataRef.orderByChild("dateAdded").on("child_added", function(snapshot){
    
    $("#nameDisplay").html(snapshot.name.val());
    $("#destinationDisplay").html(snapshot.destination.val());
    $("#firstTrainDisplay").html(snapshot.firstTrain.val());
    $("#frequencyDisplay").html(snapshot.frequency.val());
  });
/*
    //full list of items to the well (well is from recentUser app)

    $('#full-member-list').append(
        "<div class='well'><span id='name'> " + childSnapshot.val().name+" </span><span id="role"
        + childSnapshot.val().startDate+" </span><span id="role"
*/


function displayData(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    
}

});