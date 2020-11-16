import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';

import {formatRuntime} from './../../utils/function';

export const Title = ({infoMovie}) => {
    const [rating, setRating] = useState([]);
    const [language, setLanguage] = useState("");
    
    useEffect(() => {
        let us_certification = infoMovie.release_dates.results.filter(function (country) { return country.iso_3166_1 === "US"});
        if(us_certification.length > 0){
            setRating(us_certification[0].release_dates.filter((c) => c.type >= 3));
            setLanguage("US");
        }else{
            let original_language = infoMovie.original_language;
            let new_certification = infoMovie.release_dates.results.filter(function(c) { return c.release_dates[0].iso_639_1 === original_language });
            
            setRating(new_certification[0].release_dates.filter((c) => c.type >= 3))
            setLanguage(new_certification[0].iso_3166_1);
        }
        
    }, [infoMovie.release_dates, infoMovie.original_language]);

    return (
        <div className="title">
            <h2>
                <Link to={`/movie/${infoMovie.id}`}>
                    {infoMovie.title}
                </Link>
                <span className="release-date">({moment(infoMovie.release_date).format("YYYY")})</span>
            </h2>
            <div className="facts">
                {rating.length > 0 ? rating[0].certification !== "" ? (
                    <span className="certification">
                        {rating[0].certification}
                    </span>
                ) : null : (
                        <span className="certification">
                            {infoMovie.release_dates.results[0].release_dates[0].certification}
                        </span>
                    )
                }
                
                
                {rating.length > 0 ? rating.map((r, i) => {
                    if(r.type === 3){
                        return (
                            <span className="releases" key={i}>
                                {moment(rating[0].release_date).format("MM/DD/YYYY")} ({language})
                            </span>
                        )
                    }else{
                        return (
                            <span className="releases" key={i}>
                                {moment(infoMovie.release_date).format("MM/DD/YYYY")}
                            </span>
                        )
                    }
                }) : null}
                
                <span className="genres">
                    {infoMovie.genres.map((genre, key) => {
                        return (
                            <React.Fragment key={key}>
                                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                                {key !== infoMovie.genres.length - 1 && (<span className="separator">, </span>)}
                            </React.Fragment>
                        )
                    })}
                </span>
                <span className="runtime">{formatRuntime(infoMovie.runtime)}</span>
            </div>
        </div>
    )
}
