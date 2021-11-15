import React, { useState, useEffect, useHistory } from "react";
import { getOptions } from "../../_helper/authHeader";
import { createSlice } from "@reduxjs/toolkit";

import Massive from "../../components/massive/Massive";

import Wrapper from "../_pageHelper/Wrapper";

function Home(props) {
    const [massives, setMassives] = useState([]);

    const history = useHistory();

    useEffect(() => {
        document.title = "AabbbbBbba";
        let feedUrl = process.env.REACT_APP_API_URL + "/wall/introduce";
        console.log(fetch(feedUrl, getOptions(feedUrl)));
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMassives(data);
            });
    }, []);

    return (
        <Wrapper
            pageName="home"
            sectionName="home_feed"
            onSearchPage={false}
            breakpoints={props.breakpoints}
        >
            {massives.length > 0
                ? massives.map((massive) => {
                      return (
                          <div
                              onClick={() => {
                                  // todo: use redux to put massive data to /massive/:id
                                  history.push("/massive/" + massive._id);
                              }}
                          >
                              <Massive
                                  key={massive._id}
                                  author={massive.postedByUser}
                                  displayName={massive.displayName}
                                  content={massive.text}
                                  replies={massive.replies}
                                  amps={massive.amps}
                                  likes={massive.likes}
                                  views={massive.viewsFloor}
                                  cap={massive.viewsFloor}
                              />
                          </div>
                      );
                  })
                : null}
        </Wrapper>
        // <div>foo</div>
    );
}

export default Home;
