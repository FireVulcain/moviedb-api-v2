import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Components */
import { Navbar } from "./components/Navbar";
/* Page */
import { Home } from "./views/Home";
import { SingleTv } from "./views/SingleTv";

const customHistory = createBrowserHistory();

function App() {
    return (
        <Router history={customHistory}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}></Route>

                <Route exact path="/tv/:id" component={SingleTv}></Route>
            </Switch>
        </Router>
    );
}

export default App;
