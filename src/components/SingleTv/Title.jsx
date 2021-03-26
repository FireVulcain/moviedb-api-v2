import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';

import {formatRuntime} from './../../utils/function';

export const Title = ({infoTv}) => {
    const [rating, setRating] = useState([]);
    
    useEffect(() => {
        if(infoTv.content_ratings.results.length > 0){
            setRating(infoTv.content_ratings.results.filter(function (rating) { return rating.iso_3166_1 === "US"}));
        }
        
    }, [infoTv.content_ratings]);

    return (
        <div className="title">
            <h1>
                {infoTv.name ? infoTv.name : infoTv.original_name}
                <span className="release-date">({moment(infoTv.first_air_date).format("YYYY")})</span>
            </h1>
            <div className="facts">
                {rating.length > 0 ? (
                    <span className="certification">
                        {rating[0].rating}
                    </span>
                ) : infoTv.content_ratings.length > 0 ? (
                    <span className="certification">
                        {infoTv.content_ratings.results[0].rating}
                    </span>
                ) : null}

                <span className="genres">
                    {infoTv.genres.map((genre, key) => {
                        return (
                            <React.Fragment key={key}>
                                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
                                {key !== infoTv.genres.length - 1 && (<span className="separator">, </span>)}
                            </React.Fragment>
                        )
                    })}
                </span>
                <span className="runtime">{formatRuntime(infoTv.episode_run_time[0])}</span>
            </div>
        </div>
    )
}
