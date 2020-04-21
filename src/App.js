import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav'
import Home from './Components/Home'
import WorkoutList from './Components/WorkoutList'
import WorkoutDetail from './Components/WorkoutDetail'

import Add from './Components/Add/index';
import AddWorkout from './Components/Add/AddWorkout';
import AddExercise from './Components/Add/AddExercise';

import Edit from './Components/Edit/index'
import EditWorkoutsList from './Components/Edit/EditWorkoutsList'
// import EditWorkout from './Components/EditWorkout'
import EditExercisesList from './Components/Edit/EditExercisesList'

import NotFoundPage from './Components/NotFoundPage'

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path ="/" exact component={Home} />
          <Route path ="/workouts" exact component={WorkoutList} />
          <Route path="/workouts/:id" component={WorkoutDetail} />

          <Route path ="/add" exact component={Add} />
          <Route path ="/add/workout" exact component={AddWorkout} />
          <Route path ="/add/exercise" exact component={AddExercise} />         

          <Route path ="/edit" component={Edit} />
          <Route path ="/edit/workouts" component={EditWorkoutsList} />
          {/* <Route path="/edit/workouts/:id" component={EditWorkout} /> */}
          <Route path ="/edit/exercises" component={EditExercisesList} />
          {/* <Route path="/edit/exercises/:id" component={EditExercise} /> */}
          <Route path="*" component={NotFoundPage} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
