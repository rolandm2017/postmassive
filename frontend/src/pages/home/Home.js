import React, { useState, useEffect } from "react";
import { getOptions } from "../../_helper/authHeader";

import { useHistory } from "react-router-dom";

import Wrapper from "../_pageHelper/Wrapper";
import Massive from "../../components/massive/Massive";
import Poll from "../../components/poll/Poll";
import testMassives from "./testContent/testMassives";

import "../../components/textStyling/TextStyling.css"; // this file will be imported in many places
import "../../components/textStyling/TextStyling.css";

function Home(props) {
    const [massives, setMassives] = useState([]);
    // console.log(15, testMassives);

    let history = useHistory();

    useEffect(() => {
        let feedUrl = process.env.REACT_APP_API_URL + "/wall/introduce";
        console.log(fetch(feedUrl, getOptions(feedUrl)));
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let puttingSomePollsIntoIt = [];
                // for (let i = 0; i < 1; i++) {
                //     puttingSomePollsIntoIt.push("poll");
                // }
                // console.log(data, 32);
                for (let i = 0; i < data.length; i++) {
                    puttingSomePollsIntoIt.push(data[i]);
                }
                // fixme: Error: Objects are not valid as a React child (found: object with keys {special, value, styling, numberOfStylings}). I
                // setMassives(puttingSomePollsIntoIt.slice(0, 2));
                setMassives(data.slice(0, 1));
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
                ? massives.map((massive, index) => {
                      if (massive === "poll") {
                          return (
                              <div key={index}>
                                  <Poll
                                      key={index}
                                      pollText={
                                          "hey look this is a hardcoded poll lah dee dah"
                                      }
                                      possibilities={6}
                                      options={[
                                          {
                                              text: "i love it",
                                              percentage: 20,
                                          },
                                          {
                                              text: "I don't love it",
                                              percentage: 0,
                                          },
                                          {
                                              text: "foo",
                                              percentage: 10,
                                          },
                                          {
                                              text: "bar",
                                              percentage: 70,
                                          },
                                          { text: "baz", percentage: 0 },
                                          {
                                              text: "star trek",
                                              percentage: 0,
                                          },
                                      ]}
                                  />
                              </div>
                          );
                      }
                      return (
                          <div
                              key={index}
                              onClick={() => {
                                  let pathToGoTo =
                                      "/massive/" + massive.postNumber;
                                  history.push(pathToGoTo);
                              }}
                          >
                              <Massive
                                  key={Math.floor(Math.random() * 10000)}
                                  author={massive.postedByUser}
                                  displayName={massive.displayName}
                                  content={testMassives[3].content}
                                  stylings={testMassives[3].stylings}
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
