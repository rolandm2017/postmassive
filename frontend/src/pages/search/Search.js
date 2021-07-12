import React, { Component } from "react";

import Wrapper from "../_helper/Wrapper";

import "./Search.scss";

class Search extends Component {
    render() {
        console.log(this.props.breakpoints);
        return (
            <Wrapper
                pageName="home"
                sectionName="home_feed"
                onSearchPage={true}
                breakpoints={this.props.breakpoints}
            >
                <div
                    id="search_bar-container"
                    className="m-1 d-flex justify-content-center align-items-center"
                >
                    <input
                        className="mx-5 my-2 p-1"
                        type="text"
                        name="search-bar"
                        id="search-bar"
                        placeholder="Search PostMassiv"
                    ></input>
                    {/* TODO: give the search input a nice magnifying glass icon */}
                    {/* <Button text="Search"></Button> */}
                    {/* have the user press enter to search, or click on the (future) dropdown */}
                </div>
                <div id="search_recommendations" className="d-flex">
                    <button className="search_width-fix">For you</button>
                    <button className="search_width-fix">Trending</button>
                    <button className="search_width-fix">News</button>
                    <button className="search_width-fix">Influencers</button>
                    <button className="search_width-fix">Art</button>
                    <button className="search_width-fix">Entertainment</button>
                    <button className="search_width-fix">Commerce</button>
                </div>
                <div id="search_main-article">
                    <div id="search_main-article-container">
                        <div>
                            <span>Featured, US - 2 hours ago</span>
                            <h1>
                                Mollit minim ipsum enim do consequat amet nisi.
                            </h1>
                        </div>
                    </div>
                </div>
                <div id="rightbar_popular-massives">
                    {/* TODO: make into its own component. dynamically generated. reuse components where possible */}
                    <h2>What's happening</h2>
                    <div className="rightbar_popular-massive">
                        <h3 className="rightbar_massive-headline">
                            Placeholder - this morning
                        </h3>
                        <p className="rightbar_massive-text">
                            Ipsum pariatur minim consectetur irure excepteur
                            nostrud occaecat exercitation do duis enim.
                        </p>
                    </div>
                    <div className="rightbar_popular-massive">
                        <h3 className="rightbar_massive-headline">
                            Trending in the USA
                        </h3>
                        <p className="rightbar_massive-text">
                            Pariatur incididunt fugiat ipsum proident.
                        </p>
                        <p>2,707 Massives</p>
                    </div>
                    <div className="rightbar_popular-massive">
                        <h3 className="rightbar_massive-headline">
                            Politics - Trending
                        </h3>
                        <p className="rightbar_massive-text">
                            Voluptate veniam mollit aute proident non commodo
                            magna non aliquip esse sit laborum adipisicing.
                        </p>
                        <p>306K Amplifies</p>
                    </div>
                    <div className="rightbar_popular-massive">
                        <h3 className="rightbar_massive-headline">
                            Canadian News - LIVE
                        </h3>
                        <p className="rightbar_massive-text">
                            Enim aliqua sint et occaecat dolore ipsum est aute
                            excepteur.
                        </p>
                    </div>
                    <div className="rightbar_rounded">
                        <button className="rightbar_show-more">
                            Show more
                        </button>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default Search;

// TODO-LATER (important): implement infinite scroll on Search page
