var config = {
    apiKey: "AIzaSyAIppJOD83Cl6ZRNnzGT1-rhFpWx4DqUXA",
    authDomain: "soccerleague-d87ef.firebaseapp.com",
    databaseURL: "https://soccerleague-d87ef.firebaseio.com",
    projectId: "soccerleague-d87ef",
    storageBucket: "soccerleague-d87ef.appspot.com",
    messagingSenderId: "662272603731"
};
firebase.initializeApp(config);

let database = firebase.database();

let localCopy = [];
let gameDt = "";
let homeTm = "";
let visitorTm = "";
let gameTm = "";
let fielNm = "";
let uDivision = "";

let dataDate = function (gamedt, homeTm,visitorTm, gameTm, fielNm, uDivision){
    localCopy.push({gamedt, homeTm,visitorTm, gameTm, fielNm, uDivision}) };

$("#submit").on("click", function (event) {
    event.preventDefault();

    var dateNew = $("#gameDate").val().trim();
    var homeNew = $("#homeTeam").val().trim();
    var visitorNew = $("#visitTeam").val().trim();
    var timeNew = $("#gameTime").val().trim();
    var fielNew = $("#fieldNum").val().trim();
    var divNew = $("#divNum").val().trim();

    // console.log(homeNew);

    database.ref().push({
        gameDt: dateNew,
        homeTm: homeNew,
        visitorTm: visitorNew,
        gameTm: timeNew,
        fielNm: fielNew,
        uDivision: divNew,
    });
});

database.ref().on("child_added", function (childSnapshot) {

    gameDt = childSnapshot.val().gameDt
    homeTm = childSnapshot.val().homeTm;
    visitorTm = childSnapshot.val().visitorTm;
    gameTm = childSnapshot.val().gameTm;
    fielNm = childSnapshot.val().fielNm;
    uDivision = childSnapshot.val().uDivision;

    let txRow = $("<tr>");


    let homeTab = $("<td>").text(homeTm);
    let visitorTab = $("<td>").text(visitorTm);
    let timeTab = $("<td>").text(gameTm);
    let fieldTab = $("<td>").text(fielNm);
    let divTab = $("<td>").text(uDivision);

    dataDate(gameDt, homeTm,visitorTm, gameTm, fielNm, uDivision);
// console.log (localCopy);
    txRow.append(homeTab, visitorTab, timeTab,
        fieldTab, divTab);

$("#schedule-info").append(txRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

// console.log (localCopy);
let choosenDate=[];

$("#dateGame").change(function () {
    $("#schedule-info").empty();
choosenDate = localCopy.filter(function(entry) {
return entry.gamedt == $("#dateGame").val();
});
for (i=0;i< choosenDate.length;i++) {
    let txRow = $("<tr>");

    let homeTab = $("<td>").text(choosenDate[i].homeTm);
    let visitorTab = $("<td>").text(choosenDate[i].visitorTm);
    let timeTab = $("<td>").text(choosenDate[i].gameTm);
    let fieldTab = $("<td>").text(choosenDate[i].fielNm);
    let divTab = $("<td>").text(choosenDate[i].uDivision);

    txRow.append(homeTab, visitorTab, timeTab,
        fieldTab, divTab);

$("#schedule-info").append(txRow);

}
 
});

const Calendar = document.querySelector('.datepicker');
M.Datepicker.init(Calendar,{
format: 'mm/dd/yy'
});
