import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

/* Components */
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import ReactTooltip from 'react-tooltip';

/* Function */
import {pathColorPercentage, trailColorPercentage} from './../../utils/function';


export const Popular = () => {
    const FADE_DURATION = 1000;
    const [typeState, setTypeState] = useState('movie');
    const [listPopular, setListPopular] = useState([]);
    const [fadeTransition, setFadeTransition] = useState(null);
    const [fadeState, setFadeState] = useState("fade-in");

    useEffect(() => {
        const source = axios.CancelToken.source();
        
        setListPopular([]);
        axios.get(`https://api.themoviedb.org/3/${typeState}/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=1`, {cancelToken: source.token}).then((response) => {
                setListPopular([...response.data.results])
            }).then(() => {
                axios.get(`https://api.themoviedb.org/3/${typeState}/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=2`, {cancelToken: source.token}).then((response) => {
                    setListPopular(prevState => [...prevState, ...response.data.results])
                }).catch();
            }).catch();

        return () => {
            source.cancel("Component got unmounted");
        };
    }, [typeState]);

    const handleClick = (type) => {

        if(type === typeState) return false;


        const timeout = setTimeout(() => {
            setTypeState(type);
            setFadeTransition(null);
            setFadeState("fade-in");
        }, FADE_DURATION);
    
        clearTimeout(fadeTransition);

        setFadeTransition(timeout);
        setFadeState("fade-out");
        
    }

    return (
        <section id="popular">
            <div className="section-header">
                <h2>What's popular</h2>
                <div className="selector-wrap">
                    <button onClick={() => handleClick('movie')} className={typeState === "movie" ? 'selected' : ''}>Movie</button>
                    <button onClick={() => handleClick('tv')} className={typeState === "tv" ? 'selected' : ''}>Series</button>
                </div>
            </div>
            
            <div className={`list ${fadeState}`}>
                {listPopular.map((list, key) => {
                    const title = list.title ? list.title : list.name;
                    const date = list.release_date ? list.release_date : list.first_air_date;
                    const percentage = list.vote_average * 10;
                    const pathColor = pathColorPercentage(percentage);
                    const trailColor = trailColorPercentage(percentage);
                    return (
                        <div className="item" key={key}>
                            <Link to={`${typeState}/${list.id}`}>
                            <LazyLoadImage
                                width={150}
                                height={225}
                                alt={title}
                                title={title}
                                effect="opacity"
                                src={`//image.tmdb.org/t/p/w220_and_h330_face${list.poster_path}`}/>
                            </Link>
                            <div className="item-content">
                                <CircularProgressbar background={true} value={percentage} text={`${percentage}`} styles={buildStyles({
                                    pathColor: pathColor,
                                    textColor: '#fff',
                                    trailColor: trailColor,
                                    backgroundColor: '#081c22',
                                })} />
                                <h3 className="title" data-tip data-for={`popular-${key}`}><Link to={`${typeState}/${list.id}`}>{title}</Link></h3>
                                <p className="date">{moment(date).format("MMM D, YYYY")}</p>
                                <ReactTooltip id={`popular-${key}`} delayShow={500} place="bottom" effect="solid">
                                    <span>{title}</span>
                                </ReactTooltip>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
