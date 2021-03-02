import React, { Component } from "react";

import Massiv from "../../components/massiv/Massiv";

import Wrapper from "../helper/Wrapper";

import { getOptions } from "../../_helper/authHeader";

class Home extends Component {
    state = {
        massivs: null,
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

        const feedUrl = process.env.REACT_APP_API_URL + "/feed";
        fetch(feedUrl, getOptions(feedUrl)).then((res) => {
            res.json().then((massivs) => {
                console.log(massivs[0]);
                this.setState({ massivs: massivs });
            });
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
                {this.state.massivs
                    ? this.state.massivs.map((massiv) => {
                          return (
                              <Massiv
                                  key={massiv.id}
                                  author={massiv.author}
                                  content={massiv.content}
                                  replies={massiv.replies}
                                  amplifies={massiv.amplifies}
                                  likes={massiv.likes}
                                  views={massiv.views}
                                  cap={massiv.cap}
                              />
                          );
                      })
                    : null}
            </Wrapper>
        );
    }
}

export default Home;
