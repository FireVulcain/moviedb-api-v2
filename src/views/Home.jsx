import React from 'react'
import { Upcoming } from '../components/Home/Upcoming'
import { Popular } from '../components/Home/Popular'
import { Trending } from '../components/Home/Trending'

export const Home = () => {
    return (
        <main className="container">
            <Popular />
            <Trending />
            <Upcoming />
        </main>
    )
}
