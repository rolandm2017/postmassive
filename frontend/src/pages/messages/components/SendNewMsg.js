import { postOptions } from "../../../_helper/authHeader";

export function tellTheServerAboutTheNewMsg(username, message, recipient) {
    if (message.length) {
        let body = {
            username: username,
            users: [username, recipient],
            userMsg: {
                sender: username,
                content: message,
            },
        };
        const sendMsgUrl = process.env.REACT_APP_API_URL + "/messages/send";
        fetch(sendMsgUrl, postOptions(sendMsgUrl, undefined, undefined, body))
            .then((res) => {
                console.log(18, res);
            })
            .catch((err) => {
                console.log(err, 22);
            });
    }
}
