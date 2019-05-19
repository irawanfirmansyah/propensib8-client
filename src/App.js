import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import './App.css';
import { Home } from './screens/Home';
import { NotFound } from './screens/NotFound';
import SurveiPasien from './screens/SurveiPasien';
import { OverviewUnit } from './screens/OverviewUnit';
import { OverviewPage } from './screens/OverviewPage';
import AdminPage from './admin/AdminPage';
import LoginForm from './user/login/Login';
import createHistory from 'history/createBrowserHistory';
import { ACCESS_TOKEN, USER_ROLE } from './constants';
import { Loading } from './components/Loading';
import { PrivateRoute } from './components/PrivateRoute';
import { Dashboard } from './dashboard/Dashboard';
import { OverviewKomplain } from './screens/OverviewKomplain';

export const history = createHistory();

export class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			error: false,
		}
		this.signOut = this.signOut.bind(this);
	}

	signOut() {
		this.setState({
			usernameOrEmail: '',
			password: '',
			error: false,
		});
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(USER_ROLE);
	}

	componentWillMount() {
		document.title = "Mitra Keluarga - HQM IS";
	}

	componentDidMount() {

	}

	render() {
		if (this.state.isLoading) {
			return (
				<Loading msg="Loading..." />
			)
		}
		return (
			<Router history={history}>
				<Switch>
					<Route path='/login' exact={true} component={LoginForm} />
					<PrivateRoute path="/" exact={true} component={Home} onClick={this.signOut} roles={['ROLE_USER']} />
					<PrivateRoute path="/survei" exact={true} component={SurveiPasien} roles={['ROLE_USER']} />
					<PrivateRoute path="/overview" exact={true} component={OverviewPage} onClick={this.signOut} roles={['ROLE_CS']} />
					<PrivateRoute path="/overview/unit" exact={true} component={OverviewUnit} onClick={this.signOut} roles={['ROLE_CS']}  />
					<PrivateRoute path="/overview/komplain" exact={true} component={OverviewKomplain} onClick={this.signOut} roles={['ROLE_CS']}  />
					<PrivateRoute path='/admin' exact={true} component={AdminPage} onClick={this.signOut} roles={['ROLE_ADMIN']} />
					<PrivateRoute path='/dashboard' exact={true} component={Dashboard} roles={['ROLE_TOP_MANAGER', 'ROLE_EXECUTIVE']} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		);
	}
}