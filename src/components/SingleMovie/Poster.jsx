import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const Poster = ({ infoMovie }) => {
    return (
        <div className="poster-wrapper">
            <div className="poster">
                <LazyLoadImage
                    width={300}
                    height={450}
                    alt={infoMovie.original_name}
                    title={infoMovie.original_name}
                    effect="opacity"
                    src={`//image.tmdb.org/t/p/w300_and_h450_bestv2${infoMovie.poster_path}`}/>
                
            </div>
        </div>
    )
}
