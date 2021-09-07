import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
class FilterBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        search: '',
        sort: 'desc'
      };
      this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter() {
      this.props.handleFilter(this.state);
  }

  handleSortChange = (e) => {
    this.setState({ sort: e.target.value });
  }

  handleFilterChange = (e) => {
    this.setState({ search: e.target.value });
  }

  render() {
    const aStyle = {
      cursor: 'pointer'
    };
    
    return (
        <form className="form-inline">
            <div className="form-group mb-2">
                <label htmlFor="inputState">Sort by price</label>
                <select id="inputState" className="form-control" onChange={this.handleSortChange}>
                    <option value="asc" selected={this.state.sort === 'asc'} >Asc</option>
                    <option value="desc" selected={this.state.sort === 'desc'} >Desc</option>
                </select>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <input type="text" className="form-control" value={this.state.search} onChange={this.handleFilterChange}></input>
            </div>
            <a href="#" className="btn btn-primary mb-2" onClick={this.handleFilter}>Search</a>
        </form>
    )
  }
}
export default FilterBar