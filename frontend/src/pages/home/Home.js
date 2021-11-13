import React, { useState, useEffect } from "react";

import getMassivesFromServer from "./HomeLogic";

import Massive from "../../components/massive/Massive";

import Wrapper from "../_helper/Wrapper";

function Home(props) {
    const [massives, setMassives] = useState([]);
    // const [jwt, setJwt] = useState("");

    useEffect(() => {
        let massivesToSet = getMassivesFromServer();
        console.log(15, massivesToSet);
        massivesToSet
            .then((theMassives) => {
                console.log("17", theMassives); // fixme: theMassives is undefined
                setMassives(theMassives);
            })
            .catch((err) => {
                console.log(19, err);
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
    );
}

export default Home;
