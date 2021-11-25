import Choice from "./Choice";

import "./ChoiceMaker.css";

function ChoiceMaker({
    menuOption,
    handleClick,
    stylingInfo,
    currentMin,
    currentMax,
    adjustStart,
    adjustEnd,
    currentlyChecked,
    handleRemoval,
    styling,
    setter,
}) {
    return (
        <div className="styling_styling-parent-container d-flex flex-row align-items-start">
            <div className="styling_options-container d-flex flex-row align-items-start justify-content-center">
                <div>
                    <input
                        type="radio"
                        onChange={(event) => {
                            handleClick(event.target.value);
                        }}
                        checked={menuOption === currentlyChecked}
                    />
                    <span className="mx-1">{menuOption}.</span>
                </div>
            </div>
            <div className="d-flex flex-column">
                <div className=" d-flex justify-content-start align-items-center">
                    <div className="styling_label-container">
                        <span className="styling_start-end-text">Start:</span>
                    </div>
                    {/* ##### */}
                    {/* // TODO: Remove the need for stylings to not overlap, and
                    allow order to be 3, 1, 2|| 1,3,2||3,2,1 etc */}
                    <input
                        className="styling_slider"
                        // value={valueOfRangeFinder}
                        min={currentMin}
                        max={currentMax}
                        type="range"
                        onChange={(event) => {
                            adjustStart(menuOption, event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">Min: {currentMin}</span>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="styling_label-container">
                        <span className="styling_start-end-text">End:</span>
                    </div>
                    {/* ###### */}
                    <input
                        className="styling_slider"
                        min={currentMin}
                        max={currentMax}
                        type="range"
                        onChange={(event) => {
                            adjustEnd(menuOption, event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">Max: {currentMax}</span>
                </div>
            </div>
            <div className="styling_options-right-container d-flex flex-column">
                <div className="color-white styling_choice-list">
                    {stylingInfo
                        ? stylingInfo.map((choice, index) => {
                              return (
                                  <Choice
                                      key={index}
                                      choice={choice}
                                      onClick={() =>
                                          handleRemoval(
                                              styling,
                                              choice,
                                              menuOption,
                                              setter
                                          )
                                      }
                                      // styling, type, index, setter
                                  />
                              );
                          })
                        : null}
                </div>
                {/* // want be able to add 2nd and 3rd type here */}
            </div>
        </div>
    );
}

export default ChoiceMaker;
