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
        console.log(id, feedUrl);
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(23, data)
                setMassive(data);
            });
    }, [id]);

    return (
        <Wrapper
            pageName="massive"
            sectionName="massive_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div>{massive.length !== 0 ? <div
                              key={index}
                              onClick={() => {
                                  let pathToGoTo =
                                      "/massive/" + massive._id;
                                  history.push(pathToGoTo);
                              }}
                          >
                              <Massive
                                  key={index}
                                  author={massive.postedByUser}
                                  displayName={massive.displayName}
                                  content={massive.text}
                                  stylings={massive.stylings}
                                  replies={massive.replies}
                                  amps={massive.amps}
                                  likes={massive.likes}
                                  views={massive.viewsFloor}
                                  cap={massive.viewsFloor}
                              />
                          </div> : null}</div>
        </Wrapper>
    );
}

export default Massive;
