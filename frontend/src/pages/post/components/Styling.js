import Choice from "./Choice";

import "./Styling.css";

function Styling({
    menuOption,
    handleClick,
    stylingInfo,
    previousStyleEnd,
    nextStyleStart,
    adjustStart,
    adjustEnd,
    currentlyChecked,
    handleRemoval,
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
                    <input
                        className="styling_slider"
                        // value={valueOfRangeFinder}
                        min={previousStyleEnd}
                        max={nextStyleStart}
                        type="range"
                        onChange={(event) => {
                            adjustStart(menuOption, event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">{previousStyleEnd}</span>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="styling_label-container">
                        <span className="styling_start-end-text">End:</span>
                    </div>
                    <input
                        className="styling_slider"
                        min={previousStyleEnd}
                        max={nextStyleStart}
                        type="range"
                        onChange={(event) => {
                            adjustEnd(menuOption, event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">{nextStyleStart}</span>
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
                                          handleRemoval(choice, menuOption)
                                      }
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

export default Styling;
