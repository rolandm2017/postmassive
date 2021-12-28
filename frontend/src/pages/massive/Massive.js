import React, { useEffect, useState  } from "react";
import { useParams, useHistory } from "react-router-dom";

import { getOptions } from "../../_helper/authHeader";

import BackButton from "../../images/icons8-back-50.png"

import MassiveContainer from "../../components/massive/Massive"

import Wrapper from "../_pageHelper/Wrapper";

import "./Massive.css";

// TODO: make each Massiv have a custom URL based on Poster Username + MassivID

function Massive(props) {
    const { id } = useParams();
    const history = useHistory();

    const [massive, setMassive] = useState([]);

    useEffect(() => {
        let feedUrl = process.env.REACT_APP_API_URL + "/massive/" + id;
        console.log(id, feedUrl);
        fetch(feedUrl, getOptions(feedUrl))
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(232323, data)
                setMassive(data[0]);
            });
    }, []);

    return (
        <Wrapper
            pageName="massive"
            sectionName="massive_viewer"
            onSearchPage={false}
            onMessagePgae={false}
            breakpoints={props.breakpoints}
        >
            <div className="d-flex align-items-center">
                <div className="singularMassiveBtnContainer">

                <input type="image" src={BackButton} className="singularMassiveBtn" onClick={() => {
                    history.push("/home")
                }}/>
                </div>
                {/* // back btn */}
                <p id="singularMsvBackBtn">Massives</p>
            </div>
            <div>{massive.length !== 0 ? 
                              <MassiveContainer
                                  author={massive.postedByUser}
                                  displayName={massive.displayName}
                                  content={massive.text}
                                  stylings={massive.stylings}
                                  replies={massive.replies}
                                  amps={massive.amps}
                                  likes={massive.likes}
                                  views={massive.viewsFloor}
                                  cap={massive.viewsFloor}
                              />
                          : null}</div>
        </Wrapper>
    );
}

export default Massive;

