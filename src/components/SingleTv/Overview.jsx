import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

export const Overview = ({ infoTv }) => {
    const [translation, setTranslation] = useState({});

    useEffect(() => {
        setTranslation(infoTv.translations.translations.filter(function (translation) { return translation.iso_3166_1 === "US"}));
    }, [infoTv.translations]);
    return (
        <div className="overview">
            <h3 className="tagline">{translation.length > 0 && translation[0].data.tagline}</h3>
            <h3 className="title-overview">Overview</h3>
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
