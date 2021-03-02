const url = "http://127.0.0.1:8080/";

function sendMassive() {
    const username = "Pharah";
    const textToSend = document.getElementById("text").value;
    console.log("sending" + username);
    fetch(url + "massive/post", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, text: textToSend }),
    })
        .then((x) => {
            console.log(x);
        })
        .catch((err) => {
            console.log(err);
        });
}

function getMassives() {
    fetch(url + "massive/get").then((res) => {
        res.json().then((massives) => {
            console.log(massives);
        });
    });
}

function getByUsername() {
    const username = document.getElementById("user").value;
    fetch(url + "massive/get/" + username).then((res) => {
        res.json().then((massives) => {
            console.log(massives);
        });
    });
}
