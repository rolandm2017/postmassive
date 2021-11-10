import { getOptions } from "../../_helper/authHeader";

export default function getMassivesFromServer(setMassives) {
    let feedUrl = process.env.REACT_APP_API_URL + "/wall/introduce";
    fetch(feedUrl, getOptions(feedUrl)).then((res) => {
        res.json().then((massives) => {
            console.log(massives[0]);
            setMassives({ massives: massives });
        });
    });
}
