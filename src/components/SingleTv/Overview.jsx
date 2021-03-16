import React from 'react';
import { Link } from "react-router-dom";

export const Overview = ({ infoTv }) => {
    
    return (
        <div className="overview">
            <h2 className="tagline">{infoTv.tagline}</h2>
            <h2 className="title-overview">Overview</h2>
            <div className="overview-text">
                <p>{infoTv.overview}</p>
            </div>
            <ol className="creator">
                {infoTv.created_by.map((creator, key) => {
                    return(
                        <li key={key} className="profile">
                            <Link to={`/person/${creator.id}`}>{creator.name}</Link>
                            <p className="character">Creator</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
