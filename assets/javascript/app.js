
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
// 2. Button for adding trains
$("#submit").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainTime = moment($("#time").val().trim(), "hh:mm").format("X");
  var trainFrequency = $("#frequency").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };
  // Uploads employee data to the database
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
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
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

    /*var tFrequency = trainFrequency;
    // Time is 3:30 AM
    var firstTime = trainTime;
    parseInt(firstTime);
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + moment(diffTime).format("m"));
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("MINUTES TIL Train:" + tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));*/
  
  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);
  // Prettify the employee start
  var trainTimeFormatted = moment.unix(trainTime).format("HH:mm");
  
  // Add each train's data into the table
  $("#userInput > tbody")
  .append("<tr>").data("id", childSnapshot.key) 
  .append($("<td>").text(trainName))
  .append($("<td>" + trainDestination + "</td>"))
  //.append($("<td>" + trainTimeFormatted + "</td>"))
  .append($("<td>" + trainFrequency + "</td>"))
  .append($("<td>" + nextTrain + "</td>"))
  .append($("<td>" + tMinutesTillTrain + "</td>"))
  .append($("<td>"));
    //append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" 
  //+ trainTimeFormatted + "</td></\td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td></tr>"
  //);
});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume time of first train is 11:00
// Assume frequency (interval) of 30 minutes, therefore runs on every hour and every half hour
// Assume current time of 11:00
// Next train will arrive in 30 minutes
// currentTime will be a variable created from moment.js
// next train will be time until next interval
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
 // Assumptions
    