import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Filter = ({queryString, type}) => {
    const [nbMovie, setNbMovie] = useState("0");
    const [nbTv, setNbTv] = useState("0");
    const [nbPerson, setNbPerson] = useState("0");
    const [nbKeyword, setNbKeyword] = useState("0");

    const typePath = queryString ? `?query=${queryString}` : ""

    useEffect(() => {
        const source = axios.CancelToken.source();
        
        if(queryString){
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}`, {cancelToken: source.token}).then((response) => {
                setNbMovie(response.data.total_results);
            }).catch(() => {});
            axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}`, {cancelToken: source.token}).then((response) => {
                setNbTv(response.data.total_results);
            }).catch(() => {});
            axios.get(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}`, {cancelToken: source.token}).then((response) => {
                setNbPerson(response.data.total_results);
            }).catch(() => {});
            axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}`, {cancelToken: source.token}).then((response) => {
                setNbKeyword(response.data.total_results);
            }).catch(() => {});
        }
        return () => {
            source.cancel("Component got unmounted");
        };
    }, [queryString])

    return (
        <div className="filter">
            <h3>Search Results</h3>
            <div>
                <Link 
                    className={`${type === "movie" ? "active-search-type" : ""}`} 
                    to={`/search/movie${typePath}`}>
                        Movies <span>{nbMovie}</span>
                </Link>
                <Link 
                    className={`${type === "tv" ? "active-search-type" : ""}`} 
                    to={`/search/tv${typePath}`}>
                        TV Shows <span>{nbTv}</span>
                </Link>
                <Link 
                    className={`${type === "person" ? "active-search-type" : ""}`} 
                    to={`/search/person${typePath}`}>
                        People <span>{nbPerson}</span>
                </Link>
                <Link 
                    className={`${type === "keyword" ? "active-search-type" : ""}`} 
                    to={`/search/keyword${typePath}`}>
                        Keywords <span>{nbKeyword}</span>
                </Link>
            </div>
        </div>
    )
}
