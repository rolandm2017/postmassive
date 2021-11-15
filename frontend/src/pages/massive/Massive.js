import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getOptions } from "../../_helper/authHeader";

import Wrapper from "../_pageHelper/Wrapper";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massive(props) {
    const { id } = useParams();

    const [massive, setMassive] = useState([]);

    useEffect(() => {
        let feedUrl = process.env.REACT_APP_API_URL + "/massive/" + id;
        console.log(id);
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMassive(data);
            });
    }, []);

    return (
        <Wrapper
            pageName="massive"
            sectionName="massive_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div>{massive.length !== 0 ? massive.likes : null}</div>
        </Wrapper>
    );
}

export default Massive;
