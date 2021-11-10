import { getOptions } from "../../_helper/authHeader";

export default function getMassivesFromServer(setMassives) {
    let feedUrl = process.env.REACT_APP_API_URL + "/wall/introduce";
    return fetch(feedUrl, getOptions(feedUrl)).then((res) => {
        return res.json().then((massives) => {
            return massives;
        });
    });
}
