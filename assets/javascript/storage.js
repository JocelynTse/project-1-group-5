// Initialize Firebase/
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

// Set variables for inputs

let name = "";
let address = "";
let phone = "";
let dob = "";
let age = "";
let gender = "";
let parent = "";
let parentPhone = "";
let phoneType = "";
let parentEmail = "";



// Capture input values on submit

$("#submit").on("click", function (event) {
    event.preventDefault();

    $("#emptyFields").text(""); //clears modal text on new submit button click

    let emptyFieldsCheck = false;


    let valueArray = [$("#nameFirstPlayer"), $("#nameLastPlayer"),
    $("#addressPlayer"), $("#cityPlayer"),
    $("#statePlayer"), $("#phoneNumberPlayer"),
    $("#DOBPlayer"), $("#agePlayer"),
    $("#genderPlayer"), $("#genderPlayer"),
    $("#nameFirstParent"), $("#nameLastParent"),
    $("#phoneNumberParent"), $("#phoneTypeParent"), $("#parentEmail")]; // This array holds all form element ids

    for (i = 0; i < valueArray.length; i++) { // looping through the above array to find any empty fields

        if (valueArray[i].val() == "") {

            $("#submit").addClass("modal-trigger"); // adding this class triggers the modal

            $("#emptyFields").append("<h6>" + "You are missing: " + $(valueArray[i]).attr("id") + "</h6>"); //spitting out empty field names into the modal
            console.log($(valueArray[i]).attr("id"));

            emptyFieldsCheck = true;



        }

    }

    if (!emptyFieldsCheck) {

        var nameNew = $("#nameFirstPlayer").val() + " " + $("#nameLastPlayer").val();
        var addressNew = $("#addressPlayer").val() + ", " + $("#cityPlayer").val() + ", " + $("#statePlayer").val();
        var phoneNew = $("#phoneNumberPlayer").val();
        var dobNew = $("#DOBPlayer").val();
        var ageNew = $("#agePlayer").val();
        var genderNew = $("#genderPlayer").val();
        var parentNew = $("#nameFirstParent").val() + " " + $("#nameLastParent").val();
        var parentPhoneNew = $("#phoneNumberParent").val();
        var phoneTypeNew = $("#phoneTypeParent").val();
        var parentEmailNew = $("#parentEmail").val();

        console.log(nameNew);
        console.log(addressNew);
        console.log(phoneNew);
        console.log(dobNew);
        console.log(ageNew);
        console.log(genderNew);
        console.log(parentNew);
        console.log(parentPhoneNew);
        console.log(phoneTypeNew);
        console.log(parentEmailNew);

        // Store input values to firebase

        database.ref().push({
            name: nameNew,
            address: addressNew,
            phone: phoneNew,
            dob: dobNew,
            age: ageNew,
            gender: genderNew,
            parent: parentNew,
            parentPhone: parentPhoneNew,
            phoneType: phoneTypeNew,
            parentEmail: parentEmailNew,

        });
        $("#register")[0].reset(); //reset form
    }
});

// Pull stored input values to playerlist

database.ref().on("child_added", function (childSnapshot) {

    name = childSnapshot.val().name;
    address = childSnapshot.val().address;
    phone = childSnapshot.val().phone;
    dob = childSnapshot.val().dob;
    age = childSnapshot.val().age;
    gender = childSnapshot.val().gender;
    parent = childSnapshot.val().parent;
    parentPhone = childSnapshot.val().parentPhone;
    phoneType = childSnapshot.val().phoneType;
    parentEmail = childSnapshot.val().parentEmail;

    let tRow = $("<tr>");

    let nameTab = $("<td>").text(name);
    let addressTab = $("<td>").text(address);
    let phoneTab = $("<td>").text(phone);
    let dobTab = $("<td>").text(dob);
    let ageTab = $("<td>").text(age);
    let genderTab = $("<td>").text(gender);
    let parentTab = $("<td>").text(parent);
    let parentPhoneTab = $("<td>").text(parentPhone);
    let phoneTypeTab = $("<td>").text(phoneType);
    let parentEmailTab = $("<td>").text(parentEmail);

    tRow.append(nameTab, addressTab, phoneTab, dobTab, ageTab, genderTab, parentTab, parentPhoneTab, phoneTypeTab, parentEmailTab);
    $("tbody").append(tRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code)
});



