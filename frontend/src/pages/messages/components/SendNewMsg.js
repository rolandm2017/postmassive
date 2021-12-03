import { postOptions } from "../../../_helper/authHeader";

function sendMessage(username, message, recipient) {
    let body = {
        users: [username, recipient],
        content: {
            sender: username,
            content: message,
        },
    };
    const sendMsgUrl =
        process.env.REACT_APP_API_URL + "/messages/send" + username;
    fetch(sendMsgUrl, postOptions(sendMsgUrl, body)).then((res) => {
        console.log(res, 14);
    });
}
