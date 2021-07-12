import React, { Component } from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import Logo from "../../images/gps-searching.png";

import "./massive.css";

class Massiv extends Component {
    render() {
        return (
            <div className="background-blue">
                <div className="massiv-container d-flex flex-column border-top">
                    <div className="d-flex">
                        <div className="m-profile-pic-container">
                            <img
                                className="massiv-profile-pic profile-pic"
                                src={Logo}
                                alt="dish"
                            />
                        </div>
                        <div className="width-control text-left">
                            <div className="m-author-container mt-1 d-flex">
                                <p className="mr-2 mb-2">
                                    <strong>
                                        {this.props.author.displayName}
                                    </strong>
                                </p>
                                <p className="m-author-handle mb-0">
                                    {" "}
                                    @{this.props.author.username}{" "}
                                </p>
                            </div>

                            <p className="mt-0 text-left">
                                {this.props.content}
                            </p>
                        </div>
                    </div>
                    <EngagementContainer
                        replies={this.props.replies}
                        amplifies={this.props.amplifies}
                        likes={this.props.likes}
                        views={this.props.views}
                        cap={this.props.cap}
                        inFeed={true}
                    />
                </div>
            </div>
        );
    }
}

export default Massiv;
