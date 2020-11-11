import React from 'react';
import { Upcoming } from '../components/Home/Upcoming';
import { Popular } from '../components/Home/Popular';
import { Trending } from '../components/Home/Trending';
import Head from "./../components/layouts/Head";

export const Home = () => {
    return (
        <Head
            pageMeta={{
                title: `MovieDB`,
                description: "MovieDB let you find movies, TV shows and celebrity content. Find trailers, teasers, ratings and reviews for the newest movie and TV shows",
            }}
        >
            <main className="container">
                <Popular />
                <Trending />
                <Upcoming />
            </main>
        </Head>
    )
}
