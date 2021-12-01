rimport React from "react";

import EngagementContainer from "../engagementContainer/EngagementContainer";

import LeftBox from "./components/LeftBox";

import "./Reply.css";

function Reply(props) {
    function replyingTo(people) {
        // console.log(people);
        // unfortunately this component cannot be tested as it is unreachable by tests! bah, closures!
        if (people.length === 1) {
            return `Replying to @${people[0].username}`;
        } else if (people.length === 2) {
            return `Replying to @${people[0].username} and @${people[1].username}`;
        } else if (people.length < 4) {
            let statement = "Replying to ";
            for (let i = 0; i < people.length; i++) {
                if (i < people.length - 1) {
                    statement += `@${people[i].username}, `;
                } else {
                    statement += `and @${people[i].username}`;
                }
            }
            return statement;
        } else {
            return `Replying to @${people[0].username} and ${
                people.length - 1
            } others`;
        }
    }

    return (
        <div className="notification bg-blue-highlight pb-2 pr-2">
            <div className="d-flex">
                <LeftBox />
                <div className="flex-basis-80 mr-4">
                    <div className="mt-3 mr-2">
                        {/* Todo: Make replier's display name bold */}
                        <p className="m-0">
                            From {props.replier.displayName} @
                            {props.replier.username}
                        </p>
                        <span>{replyingTo(props.to)}</span>
                    </div>
                    <p className="mid-line-height text-grey my-2">
                        {props.content}
                        {/* TODO: implement 4 line max for content, 3 line max for
                        OPcontent */}
                    </p>
                    <EngagementContainer
                        replies={26}
                        amplifies={133}
                        likes={2311}
                        views={110392}
                        cap={140000}
                    />
                </div>
            </div>
        </div>
    );
}

export default Reply;
