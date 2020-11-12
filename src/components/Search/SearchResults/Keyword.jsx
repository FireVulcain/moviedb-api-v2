import React from 'react'

export const Keyword = ({searchResult}) => {
    return (
        <>
            {
                searchResult.map((result, key) => {
                    return (
                        <div key={key}>
                            {result.name}
                        </div>
                    )
                })
            }
        </>
    )
}
