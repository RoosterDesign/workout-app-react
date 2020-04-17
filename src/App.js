import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav'
import Home from './Components/Home'
import WorkoutList from './Components/WorkoutList'
import WorkoutDetail from './Components/WorkoutDetail'
import ManageWorkouts from './Components/ManageWorkouts'
import AddExercise from './Components/AddExercise';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path ="/" exact component={Home} />
          <Route path ="/add/exercise" exact component={AddExercise} />
          <Route path ="/workouts" exact component={WorkoutList} />
          <Route path="/workouts/:id" component={WorkoutDetail} />
          <Route path ="/manage" component={ManageWorkouts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
