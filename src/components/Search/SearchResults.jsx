import React, {useEffect, useState} from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

/* Components */
import { Movie } from './SearchResults/Movie';
import { Tv } from './SearchResults/Tv';
import { Person } from './SearchResults/Person';
import { Keyword } from './SearchResults/Keyword';

export const SearchResults = ({queryString, type}) => {
    
    const [searchResult, setSearchResult] = useState([]);

    const [hasMore, setHasMore] = useState(true);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        setSearchResult([]);
        setTotalPage(1);
        setHasMore(true);

        const source = axios.CancelToken.source();

        if(queryString){
            axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}`, {cancelToken: source.token}).then((response) => {
                setSearchResult([...response.data.results]);
                setTotalPage(response.data.total_pages);
            }).catch();
        }
       
        return () => {
            source.cancel("Component got unmounted");
        };
        
    }, [queryString, type])
    


    const querySearch = (page) => {
        if(page > totalPage) return setHasMore(false);

        const source = axios.CancelToken.source();

        axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&query=${queryString}&page=${page}`, {cancelToken: source.token}).then((response) => {
                setSearchResult((prevState) => [...prevState, ...response.data.results]);
            }).catch();

        return () => {
            source.cancel("Component got unmounted");
        };
    }

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
                <InfiniteScroll
                    pageStart={1}
                    loadMore={(p) => querySearch(p)}
                    hasMore={hasMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {renderResult(searchResult)}
                </InfiniteScroll>
                
            ) : "There are no results that matched your query."}
        </div>
    )
}
