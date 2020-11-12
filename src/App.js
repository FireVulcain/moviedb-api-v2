import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

/* Components */
import { Navbar } from "./components/Navbar";
/* Page */
import { Home } from "./views/Home";
import { SingleTv } from "./views/SingleTv";
import { SingleMovie } from "./views/SingleMovie";

function App({ location }) {
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        const { pathname } = location;

        setCurrentPath(pathname);
    }, [location]);

    return (
        <>
            <Navbar currentPath={currentPath} />
            <Switch>
                <Route exact path="/" component={Home}></Route>

                <Route exact path="/movie/:id" component={SingleMovie}></Route>
                <Route exact path="/tv/:id" component={SingleTv}></Route>
            </Switch>
        </>
    );
}

export default withRouter(App);
