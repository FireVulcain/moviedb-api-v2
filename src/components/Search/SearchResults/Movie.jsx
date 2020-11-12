import React from 'react';

import { Link } from 'react-router-dom';
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const Movie = ({searchResult}) => {
    return (
        <>
            {
                searchResult.map((result, key) => {
                    return (
                        <div className="search-results-item" key={key}>
                            <Link className="image" to={`/movie/${result.id}`} >
                                {result.poster_path ? (
                                    <LazyLoadImage
                                        width={94}
                                        height={141}
                                        alt={result.title}
                                        title={result.title}
                                        effect="opacity"
                                        src={`//image.tmdb.org/t/p/w188_and_h282_bestv2${result.poster_path}`}/>
                                ) : (
                                    <div className="no-poster"></div>
                                ) }
                            </Link>
                            
                            <div className="details">
                                <Link to={`/movie/${result.id}`} >
                                    <h2>{result.title}</h2>
                                </Link>
                                <span className="release-date">{moment(result.release_date).format('MMMM DD, YYYY')}</span>

                                <div className="overview">
                                    <p>{result.overview}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
