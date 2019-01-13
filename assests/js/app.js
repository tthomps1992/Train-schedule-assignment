var config = {
    apiKey: "AIzaSyAiA9XM2QW8S7klm_uQAVBX17g_XiPKvl8",
    authDomain: "train-schedule-assignmen-14070.firebaseapp.com",
    databaseURL: "https://train-schedule-assignmen-14070.firebaseio.com",
    projectId: "train-schedule-assignmen-14070",
    storageBucket: "train-schedule-assignmen-14070.appspot.com",
    messagingSenderId: "184729005746"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      train: trainName,
      destination: destination,
      start: trainStart,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainStart);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().role;
    var trainStart = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(frequency);
  
    // Prettify the Train start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(trainStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * frequency;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(nextArrival),
      $("<td>").text(frequency),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
