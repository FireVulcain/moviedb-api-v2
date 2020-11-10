import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';

export const Title = ({infoTv}) => {
    const [rating, setRating] = useState({});
    
    useEffect(() => {
        setRating(infoTv.content_ratings.results.filter(function (rating) { return rating.iso_3166_1 === "US"}));
    }, [infoTv.content_ratings]);

    return (
        <div className="title">
            <h2>
                <Link to={`/tv/${infoTv.id}`}>
                    {infoTv.original_name}
                </Link>
                <span className="release-date">({moment(infoTv.first_air_date).format("YYYY")})</span>
            </h2>
            <div className="facts">
                <span className="certification">
                    {rating.length > 0 ? rating[0].rating : infoTv.content_ratings.results[0].rating}
                </span>
                <span className="genres">
                    {infoTv.genres.map((genre, key) => {
                        return (
                            <React.Fragment key={key}>
                                <Link to={`genre/${genre.id}`}>{genre.name}</Link>
                                {key !== infoTv.genres.length - 1 && (<span className="separator">, </span>)}
                            </React.Fragment>
                        )
                    })}
                </span>
                <span className="runtime">{infoTv.episode_run_time[0]}m</span>
            </div>
        </div>
    )
}
