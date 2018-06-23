// Initialize Firebase
var config = {
    apiKey: "AIzaSyA_3PFPpf3AUpdeSzeKIH-Uf_dD5X89BgY",
    authDomain: "sportsreghub.firebaseapp.com",
    databaseURL: "https://sportsreghub.firebaseio.com",
    projectId: "sportsreghub",
    storageBucket: "sportsreghub.appspot.com",
    messagingSenderId: "1003875518898"
  };
  firebase.initializeApp(config);
  
  let database = firebase.database();
  
  let name = "";
  let dob = "";
  let parent = "";
  let phone = "";
  
  $("#submit").on("click", function (event) {
    event.preventDefault();
  
    var nameNew = $("#nameFirstPlayer").val() + " " + $("#nameLastPlayer").val().trim();
    var dobNew = $("#DOBPlayer").val();
    var parentNew = $("#nameParent").val().trim() + " " + $("#nameLastEmer1").val().trim();
    var phoneNew = $("#phoneNumberPlayer").val();
  
    console.log($("#nameFirstPlayer").val());
    console.log($("#DOBPlayer").val());

    //name = $("#nameFirstPlayer").val();

    console.log(nameNew);

    database.ref().push({
      name: nameNew,
      dob: dobNew,
      //parent: parentNew,
      //phone: phoneNew,
    })
  });
  
  database.ref().on("child_added", function (childSnapshot) {
  
    name = childSnapshot.val().name;
    dob = childSnapshot.val().dob;
    parent = childSnapshot.val().parent;
    phone = childSnapshot.val().phone;
  
    let tRow = $("<tr>");
  
    let nameTab = $("<td>").text(name);
    let dobTab = $("<td>").text(dob);
    let parentTab = $("<td>").text(parent);
    let phoneTab = $("<td>").text(phone);
  
    tRow.append(nameTab, dobTab, parentTab, phoneTab);
    $("tbody").append(tRow);
  
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code)
  });
  
  