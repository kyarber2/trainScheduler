
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDZZ8eWvSgJwwlm9s4rwAy3Paf9nJWqDTo",
    authDomain: "train-scheduler-f562d.firebaseapp.com",
    databaseURL: "https://train-scheduler-f562d.firebaseio.com",
    projectId: "train-scheduler-f562d",
    storageBucket: "",
    messagingSenderId: "733048575390"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
// Button for adding trains
$("#submit").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainTime = moment($("#time").val().trim(), "hh:mm").format("X");
  var trainFrequency = $("#frequency").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  


  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});
//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  var timeRemaining = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency;
  var tMinutesTillTrain = trainFrequency - timeRemaining;

  var nextTrain = moment().add(tMinutesTillTrain, "m").format("hh:mm A");
  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);
  // Format the train time start
  var trainTimeFormatted = moment.unix(trainTime).format("HH:mm");
  
  // Add each train's data into the table
  $("#userInput > tbody")
  .append("<tr>").data("id", childSnapshot.key) 
  .append($("<td>").text(trainName))
  .append($("<td>" + trainDestination + "</td>"))
  .append($("<td>" + trainFrequency + "</td>"))
  .append($("<td>" + nextTrain + "</td>"))
  .append($("<td>" + tMinutesTillTrain + "</td>"))
  .append($("<td>"));
   
});

    