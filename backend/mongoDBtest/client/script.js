const url = "http://127.0.0.1:8080/massive/post";

function sendMassive() {
    const user = "Crono";
    const textToSend = document.getElementById("text").value;
    console.log("sending");
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, text: textToSend }),
    })
        .then((x) => {
            console.log(x);
        })
        .catch((err) => {
            console.log(err);
        });
}
