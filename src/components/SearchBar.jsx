import React, {useState, useRef, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';

import { FaTimes } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';


export const SearchBar = ({ open, setOpen, currentPath }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [displayResult, setDisplayResult] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if(open) inputRef.current.focus();
    }, [open]);

    useEffect(() => {
        setOpen(false);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if(searchValue !== ""){
            axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${searchValue}`, {cancelToken: source.token}).then((response) => {
                setSearchResult([...response.data.results]);
            }).catch();
        }else{
            axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&region=US`, {cancelToken: source.token}).then((response) => {
                setSearchResult([...response.data.results]);
            }).catch();
        }

        return () => {
            source.cancel("Component got unmounted");
        };
    }, [searchValue]);

    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setDisplayResult(false);
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    

    return (
        <div onBlur={(e) => handleBlur(e)} className={`search-bar ${open ? 'open-search' : 'close-search'}`}>
            <form id="search_form" action="/search" method="get" className="container">
                <FaSearch />
                <DebounceInput
                    inputRef={inputRef}
                    id="search-input" 
                    name="query"
                    placeholder="Search for a movie, tv show, person..."
                    onFocus={() => setDisplayResult(true)}
                    minLength={1}
                    debounceTimeout={500}
                    onChange={e => handleChange(e)} 
                    value={searchValue} />
                <FaTimes onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchValue('');
                }} />
            </form>
            <div  className={`searchbar-results ${displayResult ? 'display-result' : 'hide-result'}`}>
                <ul>
                    {searchResult.slice(0, 10).map((result, key) => {
                        const title = result.title ? result.title : result.original_name ? result.original_name : result.name
                        return (
                            <li key={key}>
                                <Link to={`/search?query=${title}`} onClick={() => {
                                     setOpen(false);
                                     setSearchValue("");
                                }}>
                                    <div className="container">
                                        <FaSearch />
                                        <p>{title}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
        </div>
    )
}
