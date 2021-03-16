import React from 'react'

export const Cast = ({casts}) => {
    return (
        <>
            <h3>Casts</h3>
            <ol className="people">
                {casts.map(cast => {
                    return(
                        <li>
                            <a href={`/person/${cast.id}`}>
                                <img src={`//image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}`} alt=""/>
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
            
        </>
    )
}
