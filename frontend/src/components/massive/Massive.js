import React, { Component } from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import Logo from "../../images/gps-searching.png";

import "./Massive.css";

class Massive extends Component {
    convertEngagementText(inputNum) {
        // will receive views and likes in the millions.
        // convert 10,000-999,999 -> 10.0k - 999.9k
        // 1,000,000 to 999m -> 1.00m - 999.9m
        const lengthOfSingleDigitThousands = String(1000).length;
        const lengthOfSingleDigitMillions = String(1000 * 1000).length;
        const stringVer = String(inputNum);
        switch (
            inputNum // i am totally anticipating switch evaluating in order...
        ) {
            case inputNum < 1000:
                return String(inputNum);
            case inputNum < 1000000: // thousands
                if (stringVer.length === lengthOfSingleDigitThousands) {
                    // single digit thousands, special case
                    return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
                }
                const lengthPreDecimal = stringVer.length - 3;
                const decimal = stringVer.slice(
                    lengthPreDecimal,
                    lengthPreDecimal + 1
                );
                return lengthPreDecimal + "." + decimal + "k";
            case inputNum < 1000000000: // millions
                if (stringVer.length === lengthOfSingleDigitMillions) {
                    // single digit millions, special case
                    return stringVer.slice(0, 1) + "." + stringVer.slice(1, 2);
                }
                const lengthPreDecimal = stringVer.length - 6; // 6: slice off the 0's in 13,000,000, for instance
                const decimal = stringVer.slice(
                    lengthPreDecimal,
                    lengthPreDecimal + 1
                );
                return lengthPreDecimal + "." + decimal + "m";
            default:
                // if ever launch, replace this w/ a bug reporting mechanism
                console.log("oops:", inputNum);
                return inputNum;
        }
    }

    render() {
        return (
            <div className="background-blue">
                <div className="massive-container d-flex flex-column border-top">
                    <div className="d-flex">
                        <div className="m-profile-pic-container">
                            <img
                                className="massive-profile-pic profile-pic"
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

export default Massive;
