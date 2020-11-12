import React from 'react';
import { Filter } from '../components/Search/Filter';
import { SearchResults } from '../components/Search/SearchResults';

export const Search = ({location, match}) => {
    const queryString = new URLSearchParams(location.search).get('query');
    const type = match.params.type ? match.params.type : "movie";
    
    return (
        <div className="search-page container">
           <Filter queryString={queryString} type={type} />
           <SearchResults queryString={queryString} type={type} />
        </div>
    )
}
