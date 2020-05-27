import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import colours from './config/colours';
import mediaQueries from './config/mediaQueries';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Components/Home';
import WorkoutList from './Components/WorkoutList';
import WorkoutDetail from './Components/WorkoutDetail';
import AddWorkout from './Components/Add';
import EditWorkoutList from './Components/Edit';
import EditWorkout from './Components/Edit/EditWorkout';
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
			Component: AddWorkout,
		},
		{
			path: '/edit',
			exact: true,
			Component: EditWorkoutList,
		},
		{
			path: '/edit/:id',
			Component: EditWorkout,
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
				html,
				body {
					height: 100%;
					min-height: 100%;
				}
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
					background-attachment: fixed;
					background-position: 50% 0;
					background-repeat: no-repeat;
					background-color: ${colours.greenBlack};
					background-size: cover;
					color: ${colours.white};
					margin: 0;
					padding: 0;
					position: relative;
					font-family: 'Rubik', sans-serif;
					font-weight: 300;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
				#root {
					display: flex;
					flex-direction: column;
					min-height: 100%;
					padding: 20px 0;
				}
				h1 {
					color: ${colours.peppermint};
					font-size: 5rem;
					font-weight: 300;
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
