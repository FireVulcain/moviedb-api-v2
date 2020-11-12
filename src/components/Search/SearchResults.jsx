import React, {useEffect, useState} from 'react';
import axios from 'axios';

/* Components */
import { Movie } from './SearchResults/Movie';
import { Tv } from './SearchResults/Tv';
import { Person } from './SearchResults/Person';
import { Keyword } from './SearchResults/Keyword';

export const SearchResults = ({queryString, type}) => {
    
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();

        if(queryString){
            axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}`, {cancelToken: source.token}).then((response) => {
                setSearchResult([...response.data.results]);
            }).catch(err => {
                console.log("Search: " + err.message);
            });
        }
        return () => {
            source.cancel("Component got unmounted");
        };
    }, [queryString, type])

    const renderResult = (searchResult) => {
        if(type === "movie"){
            return <Movie searchResult={searchResult} />
        }else if(type === "tv"){
            return <Tv searchResult={searchResult} />
        }else if(type === "person"){
            return <Person searchResult={searchResult} />
        }else if(type === "keyword"){
            return <Keyword searchResult={searchResult} />
        }
    }

    return (
        <div className="search-results">
            {searchResult.length > 0 ? (
                renderResult(searchResult)
            ) : "There are no results that matched your query."}
        </div>
    )
}
