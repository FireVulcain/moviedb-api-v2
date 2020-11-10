import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export const Poster = ({ infoTv }) => {
    return (
        <div className="poster-wrapper">
            <div className="poster">
                <LazyLoadImage
                    width={300}
                    height={450}
                    alt={infoTv.original_name}
                    title={infoTv.original_name}
                    effect="opacity"
                    src={`//image.tmdb.org/t/p/w300_and_h450_bestv2${infoTv.poster_path}`}/>
                
            </div>
            <div className="network">
                <LazyLoadImage
                    width={100}
                    alt={infoTv.original_name}
                    title={infoTv.original_name}
                    effect="opacity"
                    src={`//image.tmdb.org/t/p/original${infoTv.networks[0].logo_path}`}/>
            </div>
        </div>
    )
}
