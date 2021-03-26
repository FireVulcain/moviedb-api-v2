import React, {useEffect, useState} from 'react';
import moment from 'moment';

/* Components */
import axios from 'axios';
import { Poster } from '../components/SingleMovie/Poster';
import { Overview } from '../components/SingleMovie/Overview';
import { ScoreTrailer } from '../components/SingleMovie/ScoreTrailer';
import { Title } from '../components/SingleMovie/Title';
import { Cast } from "../components/SingleCommon/Cast";
import {Sidebar} from '../components/SingleMovie/Sidebar/Sidebar'
import Head from "./../components/layouts/Head";

export const SingleMovie = ({match}) => {
    const [infoMovie, setInfoMovie] = useState({});
    
    useEffect(() => {
        const source = axios.CancelToken.source();

        const paramId = match.params.id;
        axios.get(`https://api.themoviedb.org/3/movie/${paramId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=keywords,credits,release_dates,videos`, {cancelToken: source.token}).then((response) => {
            setInfoMovie(response.data);
        }).catch();

        return () => {
            source.cancel("Component got unmounted");
        };
    }, [match.params.id]);

    return (
        <Head
            pageMeta={{
                title: `${infoMovie.title ? infoMovie.title : ""} (TV Series ${infoMovie.release_date ? moment(infoMovie.release_date).format("YYYY") : ""}- ) — MovieDB`,
                description: infoMovie.overview,
            }}
        >
            <main>
                {Object.keys(infoMovie).length !== 0 && infoMovie.constructor === Object ? (     
                    <div className="header-single" style={infoMovie.backdrop_path ? {backgroundImage: `url('//image.tmdb.org/t/p/w1920_and_h800_multi_faces/${infoMovie.backdrop_path}')`} : null}>
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
                <div className="column-wrapper">
                    <div className="main-content">
                        <div className="left-column">
                            {infoMovie.credits ? ( 
                                <section className="casts">
                                    <Cast casts={infoMovie.credits.cast} type="movie" id={infoMovie.id}/>
                                </section>
                            )
                            : null}
                        </div>
                        <div className="right-column">
                            <Sidebar info={infoMovie} />
                        </div>
                    </div>
                </div>
            </main>
        </Head>
    )
}
