import React, {Component} from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import ItemContent from '../components/Item';
import FilterBar from '../components/FilterBar';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      user: {},
      items: [],
      pageCount: 1,
			currentPage: 1,
      sort: 'asc',
      search: ''
    }

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
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

    this.loadItems();
  }

  loadItems() {
    fetch("api/items?page=" + this.state.currentPage + '&sort=' + this.state.sort + '&search=' + this.state.search)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.items.data,
          pageCount: result.items.last_page,
          currentPage: result.items.current_page
        });
      },
      (error) => {
   
      }
    )
  }

  handleFilter(data) {
    console.log(data);
    this.setState({ sort: data.sort, search: data.search }, this.loadItems);
  }

  async handlePageChange(data) {
    const page = data.selected >= 0 ? data.selected + 1 : 0;
		await Promise.resolve(this.setState(() => ({ currentPage: page })));
    this.loadItems();
  }

  render() {
      const Items = this.state.items.map(item => (
        <ItemContent key={item.id} item={item} />
      ));

      return (
        <div>
          <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn}/>
            <div className="container">
               <FilterBar handleFilter={this.handleFilter}/>
                <div className="row">
                  {Items.length > 0 && Items}
                </div>
                <nav aria-label="...">
                  <ReactPaginate
                    pageCount={this.state.pageCount}
                    initialPage={this.state.currentPage - 1}
                    forcePage={this.state.currentPage - 1}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    previousLabel="&#x276E;"
                    nextLabel="&#x276F;"
                    containerClassName="pagination"
                    activeClassName="page-item active"
                    disabledClassName="page-item"
                    pageLinkClassName="page-link"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    onPageChange={this.handlePageChange}
                    disableInitialCallback={true}
                  />
                </nav>
          <Footer/>
            </div>
        </div>
        )
      }
    }
export default Home