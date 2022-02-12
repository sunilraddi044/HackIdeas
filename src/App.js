import "./App.css";
import Home from "./Components/home/Home";
import Login from "./Components/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import AddIdeas from "./Pages/addIdeas/AddIdeas";
import ShowIdeas from "./Pages/showIdeas/ShowIdeas";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <Router>
      <Home loginStatus={loginStatus} />
      {!loginStatus && <Login setLoginStatus={setLoginStatus} />}

      <Switch>
        {loginStatus && (
          <Route path="/addideas">
            <AddIdeas />
          </Route>
        )}

        {loginStatus && (
          <Route path="/showideas">
            <ShowIdeas />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
