// moved into its own .js file because
// in auctioneer.ts I couldn't figure out how to get
// postOptions to import correctly w/o throwing an error
import { postOptions } from "./authHeader";

export function postPost(
    username,
    content,
    price,
    floor,
    stylings,
    handleGoToHome
) {
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
                handleGoToHome(); // redirect to /home
                console.log("sent data to server successfully");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
