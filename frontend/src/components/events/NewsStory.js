import React from "react";

import styles from "./NewsStory.module.css";

function NewsStory(props) {
    return (
        <div className={`${styles.newsStoryContainer} pl-2 pt-1`}>
            <h3 className={`${styles.headline} mt-1`}>
                {props.headline} {"\u2022"} {props.time}
            </h3>
            <p className={`${styles.text}`}>{props.content}</p>
        </div>
    );
}

export default NewsStory;
