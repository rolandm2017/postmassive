function Styling({
    option,
    handleClick,
    stylingInfo,
    previousStyleEnd,
    nextStyleStart,
    currentlyChecked,
}) {
    return (
        <div className="post_styling-container d-flex flex-row  align-items-start">
            <div className="post_options-container d-flex flex-row align-items-start justify-content-center">
                <div>
                    <input
                        type="radio"
                        onChange={(event) => {
                            handleClick(event.target.value);
                        }}
                        checked={option === currentlyChecked}
                    />
                    <span className="mx-1">{option}.</span>
                </div>
            </div>
            <div className="d-flex flex-column">
                <div className=" d-flex justify-content-start align-items-center">
                    <div className="post_label-container">
                        <span className="post_start-end-text">Start:</span>
                    </div>
                    <input
                        // value={valueOfRangeFinder}
                        min={previousStyleEnd}
                        max={nextStyleStart}
                        type="range"
                        onChange={(event) => {
                            console.log(event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">{previousStyleEnd}</span>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="post_label-container">
                        <span className="post_start-end-text">End:</span>
                    </div>
                    <input
                        min={previousStyleEnd}
                        max={nextStyleStart}
                        type="range"
                    />
                    <span className="color-white">{nextStyleStart}</span>
                </div>
            </div>
            <div className="post_options-container d-flex flex-column">
                <p className="color-white post_start-end-text">{stylingInfo}</p>
                {/* // want be able to add 2nd and 3rd type here */}
            </div>
        </div>
    );
}

export default Styling;
