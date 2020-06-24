import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import colours from './config/colours';
import mediaQueries from './config/mediaQueries';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './components/Register';
import WorkoutList from './Components/WorkoutList';
import WorkoutDetail from './Components/WorkoutDetail';
import AddWorkout from './Components/Add';
import Edit from './Components/Edit';
import EditWorkout from './Components/Edit/EditWorkout';
import SortExercises from './Components/SortExercises';
import NotFoundPage from './Components/NotFoundPage';
import bgImgMobile from './assets/images/bg-mobile.jpg';
import bgImgTablet from './assets/images/bg-tablet.jpg';
import bgImgDesktop from './assets/images/bg-desktop.jpg';
import bgImgDesktopLarge from './assets/images/bg-desktop-lg.jpg';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Switch>
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute exact path="/workouts" component={WorkoutList} />
					<PrivateRoute path="/workouts/:id" component={WorkoutDetail} />
					<PrivateRoute exact path="/add" component={AddWorkout} />
					<PrivateRoute exact path="/edit" component={Edit} />
					<PrivateRoute exact path="/edit/:id" component={EditWorkout} />
					<PrivateRoute exact path="/edit/sort/:id" component={SortExercises} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route path="*" component={NotFoundPage} />
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
						padding: 100px 0 0;
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
						line-height: 1.4;
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
		</AuthProvider>
	);
};

export default App;
