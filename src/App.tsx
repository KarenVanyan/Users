import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Profile from './features/profile/Profile';
import DashBoard from './features/dashboard/DashBoard';
import Users from './features/users/Users';
import Header from './shared/Header/Header';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route exact path='/dashboard'>
        <DashBoard />
      </Route>
      <Route exact path='/users'>
        <Users />
      </Route>
    </Switch>
  </Router>
);

export default App;
