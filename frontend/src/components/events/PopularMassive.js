import React from "react";

import ProcessAmount from "../ProcessAmount";

import styles from "./PopularMassive.module.css";

function PopularMassive(props) {
    return (
        <div
            className={`${styles.popularMassiveContainer} bg-blue-highlight pl-2 pt-1`}
        >
            <h3 className={`${styles.headline} mt-1`}>{props.headline}</h3>
            <p className={`${styles.text}`}>{props.content}</p>
            <p className={`${styles.text}`}>
                {ProcessAmount(props.statistic.amount)} {props.statistic.type}
            </p>
        </div>
    );
}

export default PopularMassive;
