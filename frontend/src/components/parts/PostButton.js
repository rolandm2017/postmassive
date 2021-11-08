import React from "react";
import { useHistory } from "react-router-dom";

import View from "../../images/PostMassiv-Satellite.png";

import "./PostButton.scss";

// *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***
// NOTE: KEEP this component based on props BECAUSE then its style can be decided based on a prop.
//       The alternative is to assign styling based on media queries, *which is less flexible than a prop.*
// *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** *** ***

function PostButton(props) {
    const history = useHistory();

    let btnStyle = {
        backgroundColor: `#00bbff`,
        color: "white",
        width: `130px`,
        fontWeight: `bold`,
        borderRadius: `8px`,
    };

    // allows Post btn to be reused elsewhere with a thinner frame
    if (props.mini === true) {
        btnStyle = {
            backgroundColor: `#00bbff`,
            color: "white",
            width: `50px`, // changed when mini
            fontWeight: `bold`,
            borderRadius: `25px`, // changed when mini
        };
    }

    function iconBtnIfMini(mini) {
        if (mini) {
            // show a button with image
            return (
                <input
                    onClick={() => {
                        console.log("HEY");
                        history.push("/" + props.username + "/post/");
                    }}
                    id="post-btn"
                    style={btnStyle}
                    type="image"
                    src={View}
                    alt="Post"
                />
            );
        } else {
            // show a button with text
            return (
                <button id="post-btn" style={btnStyle}>
                    Post
                </button>
            );
        }
    }

    return <div>{iconBtnIfMini(props.mini)}</div>;
}

export default PostButton;
