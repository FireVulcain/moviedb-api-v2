import React from "react";
import { Helmet } from "react-helmet";

const Head = ({ pageMeta, children }) => (
    <>
        <Helmet>
            <title>{`${pageMeta.title}`}</title>

            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="author" content="Nicolas DISANT" />

            <meta name="description" content={pageMeta.description} />
        </Helmet>
        {children}
    </>
);

export default Head;
