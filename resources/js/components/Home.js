import React, {Component} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  // check if user is authenticated and storing authentication data as states if true
  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
    }
  }

  componentDidMount() {
    if (!this.state.isLoggedIn) {
      return this.props.history.push('/login');
    }
  }

  render() {
      return (
        <div>
          <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
            <div className="container">
              <span>Whatever normally goes into the home/index page; A Plea To Heal The World for instance</span>
            </div>
          <Footer/>
        </div>
        )
      }
    }
export default Home