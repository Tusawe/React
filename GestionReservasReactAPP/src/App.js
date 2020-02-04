import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserEdit from './UserEdit';
import FacilityList from './FacilityList';
import FacilityEdit from './FacilityEdit';
import ScheduleList from './ScheduleList';
import ScheduleEdit from './ScheduleEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/user' exact={true} component={UserList}/>
          <Route path='/user/:id' component={UserEdit}/>
          <Route path='/facility' exact={true} component={FacilityList}/>
          <Route path='/facility/:id/schedule/:idSchedule' component={ScheduleEdit}/>
          <Route path='/facility/:id/schedule' component={ScheduleList}/>
          <Route path='/facility/:id' component={FacilityEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
