import React, { Component } from "react";

import Massive from "../../components/massive/Massive";

import Wrapper from "../_helper/Wrapper";

import { getOptions } from "../../_helper/authHeader";

class Home extends Component {
    state = {
        massives: null,
        jwt: null,
    };

    componentDidMount() {
        // const getJwt = async () => {
        //     const { data } = await axios.get(
        //         process.env.REACT_APP_API_URL + `/jwt`
        //     );
        //     // .catch((err) => console.log(err));
        //     this.setState({ jwt: data.token });
        //     console.log(data, data.token);
        // };

        // getJwt();

        const feedUrl = process.env.REACT_APP_API_URL + "/mock/feed";
        console.log("inspect:", getOptions(feedUrl));
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                res.json().then((massives) => {
                    console.log(massives[0]);
                    this.setState({ massives: massives });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <Wrapper
                pageName="home"
                sectionName="home_feed"
                onSearchPage={false}
                breakpoints={this.props.breakpoints}
            >
                {this.state.massives
                    ? this.state.massives.map((massive) => {
                          return (
                              <Massive
                                  key={massive.id}
                                  author={massive.author}
                                  content={massive.content}
                                  replies={massive.replies}
                                  amplifies={massive.amplifies}
                                  likes={massive.likes}
                                  views={massive.views}
                                  cap={massive.cap}
                              />
                          );
                      })
                    : null}
            </Wrapper>
        );
    }
}

export default Home;
