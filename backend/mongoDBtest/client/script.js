const url = "http://127.0.0.1:8080/massive/post";

function sendMassive() {
    const data = { kim: "gort" };
    console.log("sending");
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ a: 1, b: "Textual content" }),
    })
        .then((x) => {
            console.log(x);
        })
        .catch((err) => {
            console.log(err);
        });
}
