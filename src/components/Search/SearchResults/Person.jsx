import React from 'react'

export const Person = ({searchResult}) => {
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
