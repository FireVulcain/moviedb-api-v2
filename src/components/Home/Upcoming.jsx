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


export const Upcoming = () => {
    const [listUpcoming, setListUpcoming] = useState([]);

    useEffect(() => {
        setListUpcoming([]);
        
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=1`).then((response) => {
                setListUpcoming([...response.data.results])
            }).then(() => {
                axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US&page=2`).then((response) => {
                    setListUpcoming(prevState => [...prevState, ...response.data.results])
                })
            })
    }, []);

    return (
        <section id="upcoming">
            <h2>Upcoming</h2>
            <div className="list">
                {listUpcoming.map((list, key) => {
                    
                    const title = list.title ? list.title : list.name;
                    const date = list.release_date ? list.release_date : list.first_air_date;
                    const percentage = list.vote_average * 10;
                    const pathColor = pathColorPercentage(percentage);
                    const trailColor = trailColorPercentage(percentage);

                    return (
                        <div className="item" key={key}>
                            <Link to={`movie/${list.id}`}>
                                {list.poster_path ? (
                                    <LazyLoadImage
                                        width={150}
                                        height={225}
                                        alt={title}
                                        title={title}
                                        effect="opacity"
                                        src={`//image.tmdb.org/t/p/w220_and_h330_face${list.poster_path}`}/>
                                ) : (
                                    <div className="no-poster"></div>
                                ) }
                                
                            </Link>
                            <div className="item-content">
                                <CircularProgressbar background={true} value={percentage} text={`${percentage > 0 ? percentage : "NR"}`} styles={buildStyles({
                                    pathColor: pathColor,
                                    textColor: '#fff',
                                    trailColor: trailColor,
                                    backgroundColor: '#081c22',
                                })} />
                                <h3 className="title" data-tip data-for={`upcoming-${key}`}><Link to={`movie/${list.id}`}>{title}</Link></h3>
                                <p className="date">{moment(date).format("MMM D, YYYY")}</p>
                                <ReactTooltip id={`upcoming-${key}`} delayShow={500} place="bottom" effect="solid">
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
