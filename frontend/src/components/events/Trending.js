import React from "react";

import ProcessAmount from "../ProcessAmount";

import styles from "./Trending.module.css";

function Trending(props) {
    //

    return (
        <div
            className={`${styles.trendingContainer} bg-blue-highlight pl-2 pt-1`}
        >
            <h3 className={`${styles.headline} mt-1`}>
                {props.headline} {"\u2022"} Trending
            </h3>
            <p className={`${styles.text}`}>{props.content}</p>
            <p className={`${styles.text}`}>
                {ProcessAmount(props.statistic.amount)} {props.statistic.type}
            </p>
        </div>
    );
}

export default Trending;
