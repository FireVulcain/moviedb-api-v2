import React from 'react'
import { Link } from "react-router-dom";

import OfficialLinkImg from '../../../assets/images/official-link.svg'


export const Sidebar = ({info}) => {
    console.log(info)
    return (
        <>
        {info && Object.keys(info).length === 0 && info.constructor === Object ? null : (
            <>
                {info.homepage ? (
                    <a href={info.homepage} target="_blank" rel="noreferrer" className="social-link">
                        <img src={OfficialLinkImg} alt="offical link icon" width="30" height="30"/>
                    </a> 
                ) : null}
                <h4>Facts</h4>
                <div>
                    <p className="sidebar-title">Original name</p>
                    <p>{info.original_name}</p>
                </div>

                <div>
                    <p className="sidebar-title">Status</p>
                    <p>{info.status}</p>
                </div>

                {info.networks.length ? (
                    <div>
                        <p className="sidebar-title">Network</p>
                        {info.networks.map((network, key) => {
                            return (
                                <img key={key} src={`https://image.tmdb.org/t/p/h30/${network.logo_path}`} alt={network.name} />
                            )
                        })}
                    </div>
                ) : null}

                <div>
                    <p className="sidebar-title">Type</p>
                    <p>{info.type}</p>
                </div>
                <div>
                    <p className="sidebar-title">Original Language</p>
                    <p>{new Intl.DisplayNames(['en'], {type: 'language'}).of(info.original_language)}</p>
                </div>

                {info.keywords ? (
                    <div>
                        <p className="sidebar-title">Keywords</p>
                        <ul className="sidebar-keywords">
                            {info.keywords.results.map((keyword, key) => {
                                return (
                                    <li key={key}>
                                        <Link className="rounded-keyword" to={`/keywords/${keyword.id}`}>{keyword.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ) : null}
            </>
        )}
            
        </>
    )
}
