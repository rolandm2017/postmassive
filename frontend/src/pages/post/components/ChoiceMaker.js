import { useState } from "react";

import Choice from "./Choice";

import "./ChoiceMaker.scss";

function ChoiceMaker({
    menuOption,
    handleClick,
    stylingInfo,
    content,
    startStopInfo,
    currentMin,
    currentMax,
    adjustStart,
    adjustEnd,
    currentlyChecked,
    handleRemoval,
    styling,
    setter,
}) {
    const [startLocation, setStartLocation] = useState(0);
    const [endLocation, setEndLocation] = useState(0);

    function textPortion(inputText, styling) {
        return inputText.slice(styling.start, styling.end);
    }

    function processStylingInfo(index, info) {
        console.log(index, info, 30);
        if (info.length > 0) {
            return info.join(" ");
        }
        return info;
    }

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
                        <span className="styling_start-end-text">
                            Start: {startLocation}
                        </span>
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
                            setStartLocation(event.target.value);
                            adjustStart(menuOption, event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">Min: {currentMin}</span>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="styling_label-container">
                        <span className="styling_start-end-text">
                            End: {endLocation}
                        </span>
                    </div>
                    {/* ###### */}
                    <input
                        className="styling_slider"
                        min={currentMin}
                        max={currentMax}
                        type="range"
                        onChange={(event) => {
                            setEndLocation(event.target.value);
                            adjustEnd(menuOption, event.target.value); // prints the expected value!
                        }}
                    />
                    <span className="color-white">Max: {currentMax}</span>
                </div>
                <div className="styling_options-right-container-mobile ">
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
                <div className="d-flex justify-content-start align-items-center">
                    <div className="styling_label-container w-100">
                        <span className={`styling_start-end-text`}>
                            Selected:{" "}
                            <span
                                className={`${processStylingInfo(
                                    menuOption,
                                    stylingInfo
                                )}`}
                            >
                                {textPortion(content, startStopInfo)}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="styling_options-right-container ">
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
