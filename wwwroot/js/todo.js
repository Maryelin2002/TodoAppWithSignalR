"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/todoHub").build();

//Disable send button until connection is established
document.getElementById("addButton").disabled = true;

connection.on("ReceiveTask", function (task) {
    var li = document.createElement("li");
    document.getElementById("tasksList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${task}`;
});

connection.start().then(function () {
    document.getElementById("addButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("addButton").addEventListener("click", function (event) {
    var task = document.getElementById("taskInput").value;
    connection.invoke("AddTask", task).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});