import React, {Component} from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      error: '',
      formSubmitting: false,
      user: {
        email: '',
        password: '',
      },
      redirect: props.redirect,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  componentWillMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState});
    }
  }

  componentDidMount() {
    const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/' } };
    if (prevLocation && this.state.isLoggedIn) {
      return this.props.history.push(prevLocation);
    }
  }

  handleSubmit(e) {
      e.preventDefault();
      this.setState({formSubmitting: true});
      // Dummy login credentials
      if (this.state.user.email == "user1" && this.state.user.password == "pass1" 
      || this.state.user.email == "user2" && this.state.user.password == "pass2") {
        let userData = {
          id: this.state.user.email,
          name: this.state.user.email,
          email: this.state.user.email
        };

        let appState = {
          isLoggedIn: true,
          user: userData
        };

        localStorage["appState"] = JSON.stringify(appState);

        this.setState({
           isLoggedIn: appState.isLoggedIn,
           user: appState.user,
           error: ''
        });

        location.reload()
      } else {
        this.setState({
          formSubmitting: false
        })
        alert('Invalid credentials');
      }
      console.log(this.state.user); 
  }

  handleEmail(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user, email: value
      }
    }));
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState(prevState => ({
      user: {
        ...prevState.user, password: value
      }
    }));
  }

  render() {
  const { state = {} } = this.state.redirect;
  const { error } = state;
  return (
    <div className="container">
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
          <h2 className="text-center mb30">Log in to bid in the auctions</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input id="email" type="text" name="email" placeholder="Usernam" className="form-control" required onChange={this.handleEmail}/>
            </div>
            <div className="form-group">
              <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handlePassword}/>
            </div>
           <button disabled={this.state.formSubmitting} type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10"> {this.state.formSubmitting ? "Logging You In..." : "Log In"} </button>
           </form>
        </div>
      </div>
    </div>
    )
  }
}
export default withRouter(LoginForm);