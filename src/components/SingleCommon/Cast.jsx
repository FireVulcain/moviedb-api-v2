import React from 'react'
import { Link } from "react-router-dom";

export const Cast = ({casts, type ,id}) => {
    return (
        <>
            <h3>Casts</h3>
            <ol className="people">
                {casts.map((cast, key) => {
                    return(
                        <li key={key}>
                            <a href={`/person/${cast.id}`}>
                                {cast.profile_path ? (
                                    <img src={`//image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}`} alt=""/>
                                ) : <div className="no-poster-cast"></div>}
                            </a>
                            <p>
                                <a href={`/person/${cast.id}`}>
                                    {cast.name}
                                </a>
                            </p>
                            <p className="character">{cast.character}</p>
                        </li>
                    )
                })}
            </ol>
            <Link className="link-all-cast" to={`/${type}/${id}/casts`}>Full Cast & Crew</Link>
        </>
    )
}
