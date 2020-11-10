import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

/* Components */
import { Navbar } from "./components/Navbar";
/* Page */
import { Home } from "./views/Home";

const customHistory = createBrowserHistory();

function App() {
    return (
        <Router history={customHistory}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}></Route>
            </Switch>
        </Router>
    );
}

export default App;
