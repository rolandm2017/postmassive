import React from "react";

import ProcessAmount from "../ProcessAmount";

import styles from "./Popularmassive.module.css";

function PopularMassiv(props) {
    return (
        <div className={`${styles.popularMassivContainer} pl-2 pt-1`}>
            <h3 className={`${styles.headline} mt-1`}>{props.headline}</h3>
            <p className={`${styles.text}`}>{props.content}</p>
            <p className={`${styles.text}`}>
                {ProcessAmount(props.statistic.amount)} {props.statistic.type}
            </p>
        </div>
    );
}

export default PopularMassiv;
