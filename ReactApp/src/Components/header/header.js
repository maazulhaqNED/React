import React from 'react';
import './header.css'
import Logo from '../../assets/images/OLX.gif'
import { connect } from 'react-redux'
import SearchIcon from '../icons/searchIcon'
import ArrowIcon from '../icons/arrowIcon'
import PersonIcon from '../icons/personIcon'
import {
  facebook_login,
  facebook_logout,
  setSearchedItem,
  setSelectedLoc,
  setSelectedCategory,
  setMinPrice,
  setMaxPrice,
} from '../../Store/action';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      itemSearched: '',
      priceMin: '',
      priceMax: '',
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar sticky-top navbar-light bg-light">

          <a className="navbar-brand" href="#">
            <img src={Logo} alt="" loading="lazy" />
          </a>

          <div className='searchForm'>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Find Cars, Mobile Phones and more..." aria-label="Search"
                onChange={(e) => { this.setState({ itemSearched: e.target.value }) }}></input>
            </form>
            <button onClick={() => { this.props.setSearchedItem(this.state.itemSearched) }}
              className="btn btn-info"><b><SearchIcon /></b></button>

          </div>

          {/* login & sell buttons */}
          {
            this.props.loginStatus === true
              ?
              <div className="leftBtns">
                <Link className='person' to={'/profile'}>
                  <img src={this.props.photoURL + '?type=square'}></img>
                </Link>
                <button onClick={() => this.props.facebook_logout()}
                  type="button" className="btn btn-info">
                  <b>Logout</b>
                </button>
                <button type="button" className="btn btn-info">
                  <Link to={'/placeAd'}>
                    <b style={{color: 'white'}}>+ Sell</b>
                  </Link>
                </button>
              </div>
              :
              <div className="leftBtns">
                <button onClick={() => this.props.facebook_login()}
                  type="button" className="btn btn-info">
                  <b>Login</b>
                </button>
                <button onClick={() => this.props.facebook_login()}
                  type="button" className="btn btn-info">
                  <b>+ Sell</b>
                </button>
              </div>
          }

        </nav>
        <p className="divider"></p>

        {/* -----------------------2nd Navbar-------------------------- */}

        <nav className="navbar navbar-white bg-white">

          <div>
            <h6 style={{ display: 'inline' }}>Location</h6>
            <div className="dropdown">
              <a className="btn btn-dark dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <SearchIcon />
                {this.props.selectedLoc === '' ? 'Search Location' : this.props.selectedLoc}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                  this.props.locations.map((v, i) => {
                    return (
                      <a className="dropdown-item" onClick={() => { this.props.setSelectedLoc(v.location) }} key={i}>{v.location}</a>
                    );
                  })
                }
              </div>
            </div>
          </div>

          <div>
            <h6 style={{ display: 'inline' }}>Category</h6>
            <div className="dropdown">
              <a className="btn btn-dark dropdown-toggle " href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.props.selectedCategory === "" ? 'Select Category' : this.props.selectedCategory}
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {
                  this.props.allCategories.map((v, i) => {
                    return (
                      <a className="dropdown-item" onClick={() => { this.props.setSelectedCategory(v) }} key={i}>{v}</a>
                    );
                  })
                }
              </div>
            </div>
          </div>

          <form className="price form-inline my-2 my-lg-0">
            <h6 style={{ display: 'inline' }}>Price</h6>
            <div className='row'>
              <div className='col'>
                <input type="number" className="form-control" placeholder="Min"
                  onChange={(e) => { this.setState({ priceMin: e.target.value }) }} />
              </div>
              <div className='col'>
                <input type="number" className="form-control" placeholder="Max"
                  onChange={(e) => { this.setState({ priceMax: e.target.value }) }} />
              </div>
              <button onClick={() => {
                this.props.setMinPrice(this.state.priceMin);
                this.props.setMaxPrice(this.state.priceMax)
              }} type="button" className="btn btn-dark">
                <b><ArrowIcon /></b>
              </button>
            </div>
          </form>

        </nav>
        <hr />
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return ({
    locations: state.app.locations,
    allCategories: state.app.allCategories,
    searchedItem: state.app.searchedItem,
    selectedLoc: state.app.selectedLoc,
    selectedCategory: state.app.selectedCategory,
    minPrice: state.app.minPrice,
    maxPrice: state.app.maxPrice,
    loginStatus: state.app.loginStatus,
    photoURL: state.app.photoURL,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setSearchedItem: (data) => dispatch(setSearchedItem(data)),
    setSelectedLoc: (data) => dispatch(setSelectedLoc(data)),
    setSelectedCategory: (data) => dispatch(setSelectedCategory(data)),
    setMinPrice: (data) => dispatch(setMinPrice(data)),
    setMaxPrice: (data) => dispatch(setMaxPrice(data)),
    facebook_login: () => dispatch(facebook_login()),
    facebook_logout: () => dispatch(facebook_logout()),
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);