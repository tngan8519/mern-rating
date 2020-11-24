import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components";
import {
  HomeScreen,
  SearchScreen,
  DetailScreen,
  LoginScreen,
  RegisterScreen,
  AdminRegisterScreen,
  CreateIndividualScreen,
  EditIndividualScreen,
  PrivateRoute,
} from "./screens";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search" exact component={SearchScreen} />
          <Route path="/individual/:id" component={DetailScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/admin-register" component={AdminRegisterScreen} exact />
          <PrivateRoute path="/create-individual" exact>
            <CreateIndividualScreen />
          </PrivateRoute>
          <PrivateRoute path="/individual/:id/edit" exact>
            <EditIndividualScreen />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
