import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// components
import Signup from './components/sign-up.js';
import LoginForm from './components/login-form.js';
import Navbar from './components/navbar.js';
// import Home from './components/home.js';

import Home from './components/pages/Home';
import Books from './components/pages/Books';
import NoMatch from './components/pages/NoMatch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      userid: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ');
        console.log(response.data.user._id);

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userid: response.data.user._id
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null,
          userid: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
        {/* Routes to different components */}
<<<<<<< HEAD
        <Route exact path="/" component={Home} />
        <Route
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
=======
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" render={() => <Home userid={this.state.userid} />} />
        <Route path="/login" render={() => <LoginForm updateUser={this.updateUser} />} />
>>>>>>> 6dac14d33bb5dc1dfd151f3603a538a407b7a573
        <Route path="/signup" render={() => <Signup />} />

        <Router>
          <div>
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
<<<<<<< HEAD
              <Route exact path="/api/books" component={Books} />
=======
              {/* <Route exact path="/api/books" component={Books} /> */}
              <Route exact path="/api/books" render={() => <Books userid={this.state.userid} />} />
              {/* <Route path="/recipes" exact component={Recipes} />
              <Route path="/recipes/:id" component={SingleRecipe} /> */}
>>>>>>> 6dac14d33bb5dc1dfd151f3603a538a407b7a573
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
