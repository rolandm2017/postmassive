import React from "react";

import styles from "./InboxItem.module.scss";

function InboxItem(props) {
    console.log(props, 6);
    const formatDate = (date) => {
        // console.log("formatting...", date);
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [month, day].join("/");
    };

    const processDateToString = (inputDate) => {
        let output;
        // const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        // const oneDayAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
        const ONE_HOUR = 60 * 60 * 1000; /* ms */
        const ONE_DAY = 60 * 60 * 1000 * 24; /* ms */
        const ONE_WEEK = 60 * 60 * 1000 * 24 * 7;
        const now = new Date();

        const parsedInput = new Date(inputDate);
        // const parsedInput = Date.parse(inputDate.toString());
        const differenceInMilliseconds = Date.now() - parsedInput;

        if (now - parsedInput < ONE_HOUR) {
            const diffMins = Math.round(
                ((differenceInMilliseconds % 86400000) % 3600000) / 60000
            ); // minutes
            output = diffMins.toString() + "m";
        } else if (now - parsedInput < ONE_DAY) {
            const diffHrs = Math.floor(
                (differenceInMilliseconds % 86400000) / 3600000
            ); // hours
            output = diffHrs.toString() + "h";
        } else if (now - parsedInput < ONE_WEEK) {
            const diffDays = Math.floor(differenceInMilliseconds / 86400000); // days
            output = diffDays.toString() + "d";
        } else {
            console.log("aa", output, parsedInput);
            output = formatDate(parsedInput);
        }
        // console.log(output);
        return output;
    };

    return (
        <div className={`${styles.itemBox} d-flex`} onClick={props.showMsg}>
            <div
                className={`${styles.profilePicContainer} d-flex justify-content-center align-items-center`}
            >
                <img
                    src={props.profilePic}
                    className={`${styles.profilePicIsBlue}`}
                    alt="profile pic"
                ></img>
            </div>
            <div className={`${styles.theNonProfilePicPart}`}>
                <div className={`${styles.theTextPart} mt-3`}>
                    <div>
                        <h3 className={`${styles.truncateText} my-0`}>
                            {/* <span className={`${styles.displayName}`}>
                                {props.displayName}
                            </span>{" "} */}
                            <span className={`${styles.usernameOrMessage}`}>
                                @{props.usernames[0]} and @{props.usernames[1]}
                            </span>
                        </h3>
                    </div>
                    <div>
                        <p className={`${styles.truncateText}`}>
                            {props.content[0].content}
                        </p>
                    </div>
                    <div
                        className={`${styles.deliveryDate} d-flex justify-content-start align-items-center`}
                    >
                        <p className="my-0">
                            {processDateToString(props.deliveryDate)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InboxItem;
