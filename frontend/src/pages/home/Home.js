import React, { useState, useEffect } from "react";
import { getOptions } from "../../_helper/authHeader";

import { useHistory } from "react-router-dom";

import Massive from "../../components/massive/Massive";
import Poll from "../../components/poll/Poll";

import Wrapper from "../_pageHelper/Wrapper";

function Home(props) {
    const [massives, setMassives] = useState([]);

    let history = useHistory();

    useEffect(() => {
        document.title = "AabbbbBbba";
        let feedUrl = process.env.REACT_APP_API_URL + "/wall/introduce";
        console.log(fetch(feedUrl, getOptions(feedUrl)));
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                let puttingSomePollsIntoIt = [];
                for (let i = 0; i < 1; i++) {
                    puttingSomePollsIntoIt.push("poll");
                }
                for (let i = 0; i < data.length; i++) {
                    puttingSomePollsIntoIt.push(data[i]);
                }
                setMassives(puttingSomePollsIntoIt);
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
                      if (massive === "poll") {
                          return (
                              <div>
                                  <Poll
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
                              onClick={() => {
                                  let pathToGoTo =
                                      "/massive/" + massive.postNumber;
                                  history.push(pathToGoTo);
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
