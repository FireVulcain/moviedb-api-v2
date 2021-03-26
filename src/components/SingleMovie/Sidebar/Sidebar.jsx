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

                <div>
                    <p className="sidebar-title">Original Language</p>
                    <p>{new Intl.DisplayNames(['en'], {type: 'language'}).of(info.original_language)}</p>
                </div>
                <div>
                    <p className="sidebar-title">Budget</p>
                    <p>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(info.budget)}</p>
                </div>
                <div>
                    <p className="sidebar-title">Revenue</p>
                    <p>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(info.revenue)}</p>
                </div>

                {info.keywords ? (
                    <div>
                        <p className="sidebar-title">Keywords</p>
                        <ul className="sidebar-keywords">
                            {info.keywords.keywords.map((keyword, key) => {
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
