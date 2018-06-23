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
let address = "";
let phone = "";
let dob = "";
let age = "";
let gender = "";
let parent = "";
let parentPhone = "";
let phoneType = "";

$("#submit").on("click", function (event) {
    event.preventDefault();

    var nameNew = $("#nameFirstPlayer").val() + " " + $("#nameLastPlayer").val().trim();
    var addressNew = $("#addressPlayer").val() + ", " + $("#cityPlayer").val() + ", " + $("#statePlayer").val();
    var phoneNew = $("#phoneNumberPlayer").val();
    var dobNew = $("#DOBPlayer").val();
    var ageNew = $("#agePlayer").val();
    var genderNew = $("#genderPlayer").val();
    var parentNew = $("#nameFirstParent").val() + " " + $("#nameLastParent").val();
    var parentPhoneNew = $("#phoneNumberParent").val();
    var phoneTypeNew = $("#phoneTypeParent").val();

    console.log(nameNew);
    console.log(addressNew);
    console.log(phoneNew);
    console.log(dobNew);
    console.log(ageNew);
    console.log(genderNew);
    console.log(parentNew);
    console.log(parentPhoneNew);
    console.log(phoneTypeNew);

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

    })
});

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

    tRow.append(nameTab, addressTab, phoneTab, dobTab, ageTab, genderTab, parentTab, parentPhoneTab, phoneTypeTab);
    $("tbody").append(tRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code)
});

