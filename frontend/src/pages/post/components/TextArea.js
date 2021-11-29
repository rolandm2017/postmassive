import React from "react";

function TextArea({ setContent }) {
    return (
        <div className="">
            <div className="d-flex flex-column align-items-center">
                <label htmlFor="content">What do you want to say?</label>
                {/* <br /> */}
                <textarea
                    id="post_text-area-content"
                    type="text"
                    name="content"
                    default="hello i am writing some text into the textbox so it has value by default"
                    onChange={(event) => {
                        // console.log(170, event.target.value);
                        setContent(event.target.value);
                    }}
                ></textarea>
            </div>
        </div>
    );
}

export default TextArea;
