import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './Components/Home';
import WorkoutList from './Components/WorkoutList';
import WorkoutDetail from './Components/WorkoutDetail';
import Add from './Components/Add/';
import AddWorkout from './Components/Add/AddWorkout';
import AddExercise from './Components/Add/AddExercise';
import Edit from './Components/Edit/';
import EditWorkoutsList from './Components/Edit/EditWorkoutsList';
import EditWorkout from './Components/Edit/EditWorkout';
import EditExercisesList from './Components/Edit/EditExercisesList';
import EditExercise from './Components/Edit/EditExercise';
import NotFoundPage from './Components/NotFoundPage';

function App() {
	return (
		<Router>
			<div>
				<Nav />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/workouts" exact component={WorkoutList} />
					<Route path="/workouts/:id" component={WorkoutDetail} />
					<Route path="/add" exact component={Add} />
					<Route path="/add/workout" exact component={AddWorkout} />
					<Route path="/add/exercise" exact component={AddExercise} />
					<Route path="/edit" exact component={Edit} />
					<Route path="/edit/workouts" exact component={EditWorkoutsList} />
					<Route path="/edit/workouts/:id" component={EditWorkout} />
					<Route path="/edit/exercises" exact component={EditExercisesList} />
					<Route path="/edit/exercises/:id" component={EditExercise} />
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</div>
			<style jsx global>{`
				body {
					background-color: #282c34;
					color: white;
					margin: 0;
					padding: 0;
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					text-align: center;
				}
			`}</style>
		</Router>
	);
}

export default App;
