import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
class Header extends Component {
  // 1.1
  constructor(props) {
    super(props);
      this.state = {
        user: props.userData,
        isLoggedIn: props.userIsLoggedIn
      };
      this.logOut = this.logOut.bind(this);
  }
  // 1.2
  logOut() {
    let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);
    this.props.history.push('/login');
  }
  // 1.3
  render() {
    const aStyle = {
      cursor: 'pointer'
    };
    
    return (
        <nav className="navbar navbar-expand-md navbar-light navbar-laravel'">
          <div className="container">
            <Link className="navbar-brand" to="/">Auctions</Link>
            {this.state.isLoggedIn ? 
            <Link className="nav-link" to="/dashboard">Dashboard</Link> : ""}
            {!this.state.isLoggedIn ?
            <Link className="nav-link" to="/login">Login</Link>: ""}
        </div>
        </nav>
    )
  }
}
export default withRouter(Header)