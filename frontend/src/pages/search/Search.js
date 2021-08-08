import React, { Component } from "react";

import { Link } from "react-router-dom";

import Button from "../../components/parts/Button";

import Wrapper from "../_helper/Wrapper";

import "./Search.scss";

const articlesList = [
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">The Witcher 3</h3>
        <p className="search_massive-text">
            Truly an exceptional game, I'm sure it is folks, what an exceptional
            game. Except I'll never play it, as I have better things to do! Wow,
            reality is better than a game, it really is folks! That's what
            they're saying.
        </p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">Trending in the USA</h3>
        <p className="search_massive-text">
            Pariatur incididunt fugiat ipsum proident.
        </p>
        <p>2,707 Massives</p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">
            This is my portfolio - Trending
        </h3>
        <p className="search_massive-text">
            Voluptate veniam mollit aute proident non commodo magna non aliquip
            esse sit laborum adipisicing. Is that really Latin? Who knows. It
            could be Greek!
        </p>
        <p>306K Amplifies</p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">Canadian News - LIVE</h3>
        <p className="search_massive-text">
            Enim aliqua sint et occaecat dolore ipsum est aute excepteur. We
            need some longer text here, the best writers are saying we need
            better text. Script writers, speech writers, authors, they're all
            saying it. All saying it. Longer text.
        </p>
        <p>106K Amplifies</p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">Placeholder - this morning</h3>
        <p className="search_massive-text">
            Ipsum pariatur minim consectetur irure excepteur nostrud occaecat
            exercitation do duis enim.
        </p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">This is just some text</h3>
        <p className="search_massive-text">
            Pariatur incididunt fugiat ipsum proident. I would like to play
            Pokemon.
        </p>
        <p>2,707 Massives</p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">Entertainment - Trending</h3>
        <p className="search_massive-text">
            Voluptate veniam mollit aute proident non commodo magna non aliquip
            esse sit laborum adipisicing. Penn Badgley is the most charming
            stalker ever in You. Great series. Wow. Much creep very stalk, wow.
        </p>
        <p>306K Amplifies</p>
    </div>,
    <div className="search_popular-massive">
        <h3 className="search_massive-headline">Canadian News - LIVE</h3>
        <p className="search_massive-text">
            Enim aliqua sint et occaecat dolore ipsum est aute excepteur.
        </p>
    </div>,
];

class Search extends Component {
    state = {
        content: 10,
    };

    loadMoreContent() {
        console.log("loading content...");
        const currentContent = this.state.content;
        const newContent = currentContent + 5;
        this.setState({ content: newContent });
    }

    renderContent(articles) {
        console.log(articles, "hi");
        const content = [];
        for (let i = 0; i < this.state.content; i++) {
            content.push(
                articlesList[Math.floor(Math.random() * articlesList.length)]
            );
        }
        return content;
    }

    render() {
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
                        className="mx-5 my-2 p-1 dark-mode-input"
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
                    <div>
                        <div></div>
                        <Link className="search_width-fix">For you</Link>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <Link className="search_width-fix">Trending</Link>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <Link className="search_width-fix">News</Link>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <Link className="search_width-fix">Influencers</Link>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <Link className="search_width-fix">Art</Link>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <Link className="search_width-fix">Entertainment</Link>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                        <Link className="search_width-fix">Commerce</Link>
                        <div></div>
                    </div>
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
                <div id="search_explore-massives">
                    {/* TODO: make into its own component. dynamically generated. reuse components where possible */}
                    {this.renderContent(this.state.content)}
                    <div className="search_rounded d-flex justify-content-center p-3 mb-4">
                        <Button
                            text={"Show more"}
                            blueBg={false}
                            authed={true}
                            onClick={() => {
                                this.loadMoreContent();
                            }}
                        ></Button>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default Search;

// TODO-LATER (important): implement infinite scroll on Search page
