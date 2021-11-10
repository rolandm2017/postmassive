import React, { useState, useEffect } from "react";

import getMassivesFromServer from "./HomeLogic";

import Massive from "../../components/massive/Massive";

import Wrapper from "../_helper/Wrapper";

function Home(props) {
    const [massives, setMassives] = useState([]);
    // const [jwt, setJwt] = useState("");

    useEffect(() => {
        getMassivesFromServer(setMassives);
    }, []);

    // componentDidMount() {
    // const feedUrl = process.env.REACT_APP_API_URL + "/mock/feed";
    // console.log("inspect:", getOptions(feedUrl)); //fixme:bad auth header. Sus its bc rToken timer isnt refreshing after 13m
    // fetch(feedUrl, getOptions(feedUrl))
    //     .then((res) => {
    //         res.json().then((massives) => {
    //             console.log(massives[0]);
    //             this.setState({ massives: massives });
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }

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
                              content={massive.text}
                              replies={massive.replies}
                              amplifies={massive.amps}
                              likes={massive.likes}
                              views={massive.viewsFloor}
                              cap={massive.cap}
                          />
                      );
                  })
                : null}
        </Wrapper>
    );
}

export default Home;
