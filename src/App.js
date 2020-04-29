import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import colours from './config/colours';
import mediaQueries from './config/mediaQueries';
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
import bgImgMobile from './assets/images/bg-mobile.jpg';
import bgImgTablet from './assets/images/bg-tablet.jpg';
import bgImgDesktop from './assets/images/bg-desktop.jpg';
import bgImgDesktopLarge from './assets/images/bg-desktop-lg.jpg';

function App() {
	return (
		<Router>
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
			<style jsx global>{`
				html {
					box-sizing: border-box;
				}
				*,
				*:before,
				*:after {
					box-sizing: inherit;
				}
				html,
				body,
				#root {
					height: 100%;
				}
				body {
					background-image: url(${bgImgMobile});
					background-position: 50% 0;
					background-repeat: no-repeat;
					background-color: ${colours.greenBlack};
					background-size: cover;
					color: ${colours.white};
					font-size: 62.5%;
					margin: 0;
					padding: 0;
					font-family: 'Rubik', sans-serif;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					text-align: center;
				}
				@media ${mediaQueries.tablet} {
					body {
						background-image: url(${bgImgTablet});
					}
				}
				@media ${mediaQueries.desktop} {
					body {
						background-image: url(${bgImgDesktop});
					}
				}
				@media ${mediaQueries.desktopLarge} {
					body {
						background-image: url(${bgImgDesktopLarge});
					}
				}
			`}</style>
		</Router>
	);
}

export default App;
