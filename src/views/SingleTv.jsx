import React, {useEffect, useState} from 'react';
import moment from 'moment';

/* Components */
import axios from 'axios';
import { Poster } from '../components/SingleTv/Poster';
import { Overview } from '../components/SingleTv/Overview';
import { ScoreTrailer } from '../components/SingleTv/ScoreTrailer';
import { Title } from '../components/SingleTv/Title';
import Head from "./../components/layouts/Head";

export const SingleTv = ({match}) => {
    const [infoTv, setInfoTv] = useState({});
    
    useEffect(() => {
        const source = axios.CancelToken.source();

        const paramId = match.params.id;
        axios.get(`https://api.themoviedb.org/3/tv/${paramId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&append_to_response=content_ratings,videos,tagline&region=US`, {cancelToken: source.token}).then((response) => {
            setInfoTv(response.data);
        }).catch();
        

        return () => {
            source.cancel("Component got unmounted");
        };
    }, [match.params.id]);

    return (
        <Head
            pageMeta={{
                title: `${infoTv.original_name ? infoTv.original_name : ""} (TV Series ${infoTv.first_air_date ? moment(infoTv.first_air_date).format("YYYY") : ""}- ) — MovieDB`,
                description: infoTv.overview,
            }}
        >
            <main>
                {Object.keys(infoTv).length !== 0 && infoTv.constructor === Object ? (     
                    <div className="header-single" style={infoTv.backdrop_path ? {backgroundImage: `url('//image.tmdb.org/t/p/w1920_and_h800_multi_faces/${infoTv.backdrop_path}')`} : null}>
                        <div className="header-filter">
                            <div className="header-wrapper container">
                                <Poster infoTv={infoTv}/>
                                <div className="header-infos">
                                    <Title infoTv={infoTv} />
                                    <ScoreTrailer infoTv={infoTv} />
                                    <Overview infoTv={infoTv} />
                                </div>
                            </div>
                        </div>                    
                    </div>
                ) : null}
            </main>
        </Head>
    )
}
