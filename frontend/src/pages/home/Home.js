import React, { useState, useEffect } from "react";

import getMassivesFromServer from "./HomeLogic";

import Massive from "../../components/massive/Massive";

import Wrapper from "../_helper/Wrapper";

function Home(props) {
    const [massives, setMassives] = useState([]);
    // const [jwt, setJwt] = useState("");

    useEffect(() => {
        let massivesToSet = getMassivesFromServer();
        massivesToSet.then((theMassives) => {
            console.log("aaaaaaa:", theMassives);
            setMassives(theMassives);
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
                              author={massive.author.username}
                              displayName={massive.author.displayName}
                              content={massive.text}
                              replies={massive.replies}
                              amps={massive.amplifies}
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
