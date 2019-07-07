// Paste this in your browser console
// an IIFE that scrapes the people page
// and logs the number of people by region
let mostRecent = {};
let peopleLeftMain = [];
(function (times, _callback) {
    // scrolling
    let myVar = setInterval(function () {
        window.scrollTo(0, document.body.scrollHeight);
        console.log("scrolling"); }, 1500);

    let lastJSON;
    setTimeout(function () { _callback(myVar, lastJSON) }, times);
})(20000, function (myVar, lastJSON) {
    clearInterval(myVar);
    let peopleTable = document.getElementById("people-list");
    let peopleTableChildren = peopleTable.children;
    let mostRecentRun = {
        "people" : new Set(),
        "num_by_loc" : {},
        "total_num" : 0,
        "date_collected" : undefined
    };

    // populate numberByLocations
    let date = new Date();
    for (let i = 0; i < peopleTableChildren.length; i++) {
        let location = peopleTableChildren[i].getElementsByClassName("location")[0]["innerText"];
        let name = peopleTableChildren[i].getElementsByClassName("name")[0]["innerText"];
        
        // appending info
        // names
        mostRecentRun.people.add(name);
        // locations
        if (mostRecentRun.num_by_loc[location]) {
            mostRecentRun.num_by_loc[location] += 1;
        } else {
            mostRecentRun.num_by_loc[location] = 1;
        }
        // total
        mostRecentRun.total_num++;
    }

    // log info collected
    displayMessage = '';
    for(let loc in mostRecentRun.num_by_loc) {
        displayMessage += `${loc}: ${mostRecentRun.num_by_loc[loc]}\n`;
    }
    displayMessage += `Total: ${mostRecentRun.total_num}`;
    console.log(displayMessage);

    // log date
    mostRecentRun.date_collected = date;

    mostRecent = mostRecentRun;

    download the most recent run
    (function (exportObj, exportName) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    })(mostRecent, new Date());

    (function (curJSON, lastJSON) {
        if(lastJSON === undefined) return;
        var peopleLeft = [];
        var curPeople = curJSON.people;
        var lastPeople = new Set(lastJSON.people);
        lastPeople.forEach(function(person) {
            if(!curPeople.has(person)) {
                peopleLeft.push(person);
            }
        });
        peopleLeftMain = peopleLeft;
    })(mostRecent, lastJSON);
});



