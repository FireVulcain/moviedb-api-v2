import React from 'react';
import { Link } from "react-router-dom";

import { filterCrew } from './../../utils/function';

export const Overview = ({ infoMovie }) => {
    
    return (
        <div className="overview">
            <h3 className="tagline">{infoMovie.tagline}</h3>
            <h3 className="title-overview">Overview</h3>
            <div className="overview-text">
                <p>{infoMovie.overview}</p>
            </div>
            <ol className="creator">
                {Object.entries(filterCrew(infoMovie.credits.crew)).map((creator, key) => {
                    return (
                        <li key={key} className="profile">
                            <Link to={`/person/${creator[1].id}`}>{creator[0]}</Link>
                            <p className="character">{creator[1].toString()}</p>
                        </li>
                    );
                })}
            </ol>
        </div>
    )
}
