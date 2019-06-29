// Paste this in your browser console
// an IIFE that scrapes the people page
// and logs the number of people by region
(function (times, _callback) {
    // scrolling
    let myVar = setInterval(function () {
        window.scrollTo(0, document.body.scrollHeight);
        console.log("scrolling"); }, 1500);
  
    setTimeout(function () { _callback(myVar) }, times);
})(20000, function (myVar) {
    clearInterval(myVar);
    let peopleTable = document.getElementById("people-list");
    let peopleTableChildren = peopleTable.children;
    let numberByLocations = {};

    // populate numberByLocations
    for (let i = 0; i < peopleTableChildren.length; i++) {
        let location = peopleTableChildren[i].getElementsByClassName("location")[0]["innerText"];
        if (numberByLocations[location]) {
            numberByLocations[location] += 1;
        } else {
            numberByLocations[location] = 1;
        }
    }

    console.log(numberByLocations);
    let total = 0;
    for (let location in numberByLocations) {
        total += numberByLocations[location];
    }

    console.log("total there are: " + total + " people");
});


