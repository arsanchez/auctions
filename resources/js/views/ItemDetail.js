import React, {Component} from 'react';
import Countdown from '../components/Countdown';
import {withRouter, Link} from 'react-router-dom';
import Header from '../components/Header';

class ItemDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: props.location,
        currentBid: 0,
        autoBid: false,
        isHighestbid: false,
        item: [],
        user: {},
        isLoggedIn: false
      };

      this.handleBid = this.handleBid.bind(this);
    }

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

        this.loadItemDetails();
    }

    loadItemDetails() {
        let id = this.props.match.params.id;
        fetch("/api/item/" + id)
        .then(res => res.json())
        .then(
          (result) => {
            let autoBid = (result.last_bid && result.last_bid.user_id == this.state.user.id) ? result.last_bid.autobid :0;
            let currentBid = result.last_bid ? result.last_bid.bid :0;
            let isHighestbid = (result.last_bid && result.last_bid.user_id == this.state.user.id);
            this.setState({
              item: result,
              autoBid: autoBid,
              currentBid: currentBid,
              isHighestbid: isHighestbid
            });
          },
          (error) => {

          }
        )
    }

    handleBid(e) {
        e.preventDefault();
        if (this.state.item.last_bid &&  this.state.item.last_bid.bid >= this.state.currentBid) {
            alert("Please enter a valid bid amount");
            this.setState({currentBid: this.state.item.last_bid.bid});
        }

        // Placing the bid
        fetch("/api/bid/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.state.item.id,
                   auto_bid: this.state.autoBid,
                   user: this.state.user.id,
                   bid: this.state.currentBid
                })
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.loadItemDetails();
          },
          (error) => {

          }
        )
    }

    handleBidChange = (e) => {
      this.setState({ currentBid: e.target.value });
    }

    handleAutoBidChange = (e) => {
        this.setState({ autoBid: e.target.checked });
      }

    render() {

        return (
            <div className="container">
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <div className="card">
                    <div className="card-header">
                    {this.state.item.name}
                    </div>
                    <div className="card-body">
                        <img className="card-img-top" src={this.state.item.photo_url} alt="Detail image" width="100" height="150"></img>
                        <p className="card-text">{this.state.item.description}</p>
                        <Countdown timeTillDate={this.state.item.ends_at}/>
                        { this.state.isHighestbid && <h4>You're the highest bidder </h4>}

                        <form className="form-inline">
                            <div className="form-group mx-sm-3 mb-2">
                                <label htmlFor="">Item price: ${this.state.item.price}</label>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <label htmlFor="">Current bid: $</label>
                                <input disabled={this.state.isHighestbid} type="number" className="form-control" value={this.state.currentBid} onChange={this.handleBidChange}></input>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <div className="form-check">
                                <input disabled={this.state.isHighestbid} className="form-check-input" type="checkbox" checked={this.state.autoBid}  onChange={this.handleAutoBidChange}/>
                                <label htmlFor="">Auto bid:</label>
                                </div>
                            </div>
                            <button disabled={this.state.isHighestbid} className="btn btn-primary mb-2" onClick={this.handleBid}>Place bid</button>
                            <Link className="nav-link" to="/">Back to auctions</Link>
                        </form>
                    </div>
                </div>
            </div>
          )
    }
  }

export default withRouter(ItemDetail)
