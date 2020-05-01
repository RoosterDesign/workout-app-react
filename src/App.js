import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import colours from './config/colours';
import mediaQueries from './config/mediaQueries';
import Header from './components/Header';
import Footer from './components/Footer';
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

const App = () => {
	const routes = [
		{
			path: '/',
			exact: true,
			Component: Home,
		},
		{
			path: '/workouts',
			exact: true,
			Component: WorkoutList,
		},
		{
			path: '/workouts/:id',
			Component: WorkoutDetail,
		},
		{
			path: '/add',
			exact: true,
			Component: Add,
		},
		{
			path: '/add/workout',
			exact: true,
			Component: AddWorkout,
		},
		{
			path: '/add/exercise',
			exact: true,
			Component: AddExercise,
		},
		{
			path: '/edit',
			exact: true,
			Component: Edit,
		},
		{
			path: '/edit/workouts',
			exact: true,
			Component: EditWorkoutsList,
		},
		{
			path: '/edit/workouts/:id',
			Component: EditWorkout,
		},
		{
			path: '/edit/exercises',
			exact: true,
			Component: EditExercisesList,
		},
		{
			path: '/edit/exercises/:id',
			Component: EditExercise,
		},
		{
			path: '*',
			Component: NotFoundPage,
		},
	];

	return (
		<Router>
			<Header />
			<Switch>
				{routes.map(({ path, exact, Component }, key) => (
					<Route exact={exact} path={path} key={key} component={Component} />
				))}
			</Switch>
			<Footer />
			<style jsx global>{`
				html {
					box-sizing: border-box;
					font-size: 62.5%;
				}
				*,
				*:before,
				*:after {
					box-sizing: inherit;
				}
				body {
					background-image: url(${bgImgMobile});
					background-position: 50% 0;
					background-repeat: no-repeat;
					background-color: ${colours.greenBlack};
					background-size: 100% auto;
					color: ${colours.white};
					margin: 0;
					min-height: 100vh;
					padding: 0;
					position: relative;
					font-family: 'Rubik', sans-serif;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
				h1 {
					color: ${colours.peppermint};
					font-size: 5rem;
					font-weight: normal;
					margin: 0 0 5px;
				}
				p {
					color: ${colours.grey};
					font-size: 1.8rem;
					margin: 0 0 50px;
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
};

export default App;
