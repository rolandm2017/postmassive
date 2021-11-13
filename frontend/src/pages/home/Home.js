import React, { useState, useEffect } from "react";

import Massive from "../../components/massive/Massive";

import { getOptions } from "../../_helper/authHeader";

import Wrapper from "../_pageHelper/Wrapper";

function Home(props) {
    const [massives, setMassives] = useState([]);

    // useEffect(() => {
    //     let feedUrl = process.env.REACT_APP_API_URL + "/wall/introduce";

    //     fetch(feedUrl, getOptions(feedUrl)).then((res) => {
    //         console.log(res)

    //     // res.json().then((massives) => {
    //     // console.log(7, massives);
    //     // setMassives(massives);}
    //     // });
    // }, []);

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
                      );
                  })
                : null}
        </Wrapper>
        // <div>foo</div>
    );
}

export default Home;
