import React, { Component } from "react";

import BackButton from "../../images/icons8-back-arrow-48-wh.png";
import Photo from "../../images/mountain-32.png";
import Gif from "../../images/gif-48.png";
import Poll from "../../images/poll-48.png";
import Emoji from "../../images/happy-48.png";
import Nicolai from "../../images/markZuckerberg.jpeg";

import Wrapper from "../helper/Wrapper";

import "./Post.css";

class Post extends Component {
    render() {
        return (
            <Wrapper
                pagename="post"
                sectionName="post_main"
                onSearchPage={false}
                breakpoints={this.props.breakpoints}
            >
                <div id="post_headline" className="mt-2">
                    <h3>Post A Massiv</h3>
                </div>
                <div id="post_back-button-container" className="d-flex p-1">
                    <img
                        id="post_back-button"
                        src={BackButton}
                        alt="go back"
                    ></img>
                </div>
                <div className="mt-4 d-flex justify-content-center">
                    <div id="post_profile-pic" className="post_spacer">
                        <img src={Nicolai} alt="profile pic"></img>
                    </div>
                    <div className="post_middle px-2">
                        <div className="">
                            <p>Audience Size:</p>
                            <input
                                type="radio"
                                id="lowEnd"
                                name="audienceSize"
                                value="lowEnd"
                            />
                            <label htmlFor="lowEnd">100</label>
                            <br />
                            <input
                                type="radio"
                                id="midRange"
                                name="audienceSize"
                                value="midRange"
                            />
                            <label htmlFor="midRange">1000</label>
                            <br />
                            <input
                                type="radio"
                                id="highEnd"
                                name="audienceSize"
                                value="highEnd"
                            />
                            <label htmlFor="highEnd">10000</label>
                            <br />
                            <input
                                type="radio"
                                id="premium"
                                name="audienceSize"
                                value="premium"
                            />
                            <label htmlFor="premium">100000</label>
                            <br />
                            <label htmlFor="content">Content</label>
                            <br />
                            <textarea
                                id="content"
                                type="text"
                                name="content"
                            ></textarea>
                        </div>
                        <div id="post-targeting">
                            <div>
                                <img src={Photo} alt="upload a pic"></img>
                                <img src={Gif} alt="select gif"></img>
                                <img src={Poll} alt="start poll"></img>
                                <img src={Emoji} alt="pick emoji"></img>
                            </div>
                            <p>
                                {/* TODO: steal from Facebook's ad targeting. Allow
                            targeting by age, gender. */}
                            </p>
                        </div>
                        <div>
                            <p>Price: $1,039.83</p>
                        </div>
                    </div>
                    <div className="post_spacer"></div>
                </div>
            </Wrapper>
        );
    }
}

export default Post;

// TODO-MUCH-LATER: Dynamically generate audience sizes based on monthly(?) pageviews
// TODO-LATER: wire up the price to the server's generated price

// REMEMBER: The idea is to price posts as an auction. Or like a stock market
// the site is getting lots of views = price goes down. few views and lots of posts = price goes up.
