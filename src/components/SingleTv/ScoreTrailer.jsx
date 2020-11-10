import React, {useEffect, useState} from 'react';

/* Component */
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ModalVideo from 'react-modal-video';

/* Function */
import {pathColorPercentage, trailColorPercentage} from './../../utils/function';

/* Icons */
import { FaPlay } from 'react-icons/fa';

export const ScoreTrailer = ({infoTv}) => {
    const [isOpen, setOpen] = useState(false);
    const [trailer, setTrailer] = useState([]);

    useEffect(() => {
        setTrailer(infoTv.videos.results.filter(function (video) { return video.type === "Trailer"; }));
    }, [infoTv.videos]);

    return (
        <div className="score-trailer">
            <div className="chart">
                <CircularProgressbar background={true} value={infoTv.vote_average * 10} text={`${infoTv.vote_average * 10}`} styles={buildStyles({
                    pathColor: pathColorPercentage(infoTv.vote_average* 10),
                    textColor: '#fff',
                    trailColor: trailColorPercentage(infoTv.vote_average* 10),
                    backgroundColor: '#081c22',
                })} />
                <p>User <br/> Score</p>
            </div>
            <div className="video">
                {trailer.length > 0 ? (
                    <>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailer[0].key} onClose={() => setOpen(false)} />

                        <button className="btn-modal" onClick={()=> setOpen(true)}>
                            {<FaPlay />} Play trailer
                        </button>
                        
                    </>
                ) : null}
            </div>
        </div>
    )
}
