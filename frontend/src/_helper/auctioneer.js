export function getAuctioneerResponse() {
    // talks to server's auctioneer to get price of post
    let auctioneerSays = Math.random() * 1000;
    console.log(36, auctioneerSays);
    let asMoney = auctioneerSays.toString().split(".")[0];
    let decimalValue = Math.ceil(Math.random() * 99)
        .toString()
        .substring(0, 3);

    let price = asMoney + "." + decimalValue;

    return price;
}

export function postPost(username, content, price, floor, stylings) {
    // let displayName = user.displayName; // todo: get displayName for data
    let postContentWithStyling = {
        username: username,
        content: content,
        price: price,
        floor: floor,
        stylings: stylings,
    };
    // TODO: stick it into localHistory so browser can reload the data upon pgBack
    console.log("Sending ........", postContentWithStyling);
    // send a post to the server to
    let postingUrl = process.env.REACT_APP_API_URL + "/post/post";
    fetch(
        postingUrl,
        postOptions(postingUrl, false, 51, postContentWithStyling)
    ) // todo: content packages stuff into json.
        .then((x) => {
            if (200) {
                handleClick(); // redirect to /home
                console.log("sent data to server successfully");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
