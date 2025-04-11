import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Callback from "./Components/Callback";
import Search from "./Components/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/callback" component={Callback} />
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
}

export default App;