import React, {useEffect, useState} from 'react';

/* Components */
import axios from 'axios';
import { Poster } from '../components/SingleMovie/Poster';
import { Overview } from '../components/SingleMovie/Overview';
import { ScoreTrailer } from '../components/SingleMovie/ScoreTrailer';
import { Title } from '../components/SingleMovie/Title';

export const SingleMovie = ({match}) => {
    const [infoMovie, setInfoMovie] = useState({});
    
    useEffect(() => {
        const paramId = match.params.id;
        axios.get(`https://api.themoviedb.org/3/movie/${paramId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=credits,release_dates,videos`).then((response) => {
            setInfoMovie(response.data);
        });
    }, [match.params.id]);

    return (
        <main>
            {Object.keys(infoMovie).length !== 0 && infoMovie.constructor === Object ? (     
                <div className="header-single" style={{backgroundImage: `url('//image.tmdb.org/t/p/w1920_and_h800_multi_faces/${infoMovie.backdrop_path}')`}}>
                    <div className="header-filter">
                        <div className="header-wrapper container">
                            <Poster infoMovie={infoMovie}/>
                            <div className="header-infos">
                                <Title infoMovie={infoMovie} />
                                <ScoreTrailer infoMovie={infoMovie} />
                                <Overview infoMovie={infoMovie} />
                            </div>
                        </div>
                    </div>                    
                </div>
            ) : null}
        </main>
    )
}
