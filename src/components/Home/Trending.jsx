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


export const Trending = () => {
    const FADE_DURATION = 1000;
    const [typeState, setTypeState] = useState('day');
    const [listTrending, setListTrending] = useState([]);
    const [fadeTransition, setFadeTransition] = useState(null);
    const [fadeState, setFadeState] = useState("fade-in");

    useEffect(() => {
        const source = axios.CancelToken.source();

        setListTrending([]);
        axios.get(`https://api.themoviedb.org/3/trending/all/${typeState}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=1`, {cancelToken: source.token}).then((response) => {
            setListTrending([...response.data.results])
        }).then(() => {
            axios.get(`https://api.themoviedb.org/3/trending/all/${typeState}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=2`, {cancelToken: source.token}).then((response) => {
                setListTrending(prevState => [...prevState, ...response.data.results])
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
        <section id="trending">
            <div className="section-header">
                <h2>Trending</h2>
                <div className="selector-wrap">
                    <button onClick={() => handleClick('day')} className={typeState === "day" ? 'selected' : ''}>Today</button>
                    <button onClick={() => handleClick('week')} className={typeState === "week" ? 'selected' : ''}>This week</button>
                </div>
            </div>
            <div className={`list ${fadeState}`}>
                {listTrending.map((list, key) => {
                    const title = list.title ? list.title : list.name;
                    const date = list.release_date ? list.release_date : list.first_air_date;
                    const percentage = list.vote_average * 10;
                    const pathColor = pathColorPercentage(percentage);
                    const trailColor = trailColorPercentage(percentage);
                    return (
                        <div className="item" key={key}>
                            <Link to={`${list.media_type}/${list.id}`}>
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
                                <h3 className="title" data-tip data-for={`trending-${key}`}><Link className="title" to={`${list.media_type}/${list.id}`}>{title}</Link></h3>
                                <p className="date">{moment(date).format("MMM D, YYYY")}</p>
                                <ReactTooltip id={`trending-${key}`} delayShow={500} place="bottom" effect="solid">
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
