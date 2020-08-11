import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, cart}) => (
  <div>
    <div className="navContainer">
      <a href="/" className="siteHeader">
        SCOOBYASSO
      </a>
      <nav>
        {isLoggedIn ? (
          <div className="linksNavbar">
            {/* The navbar will show these links after you log in */}
            <Link className="linkLogin" to="/">
              Home
            </Link>
            <a className="linkLogin" href="#" onClick={handleClick}>
              Logout
            </a>
            <div>
              <Link className="linkLogin" to="/cart">
                <span className="nav-cart-count">{cart.length} </span>
                Cart
              </Link>
            </div>
          </div>
        ) : (
          <div className="linksNavbar">
            <div>
              {/* The navbar will show these links before you log in */}
              <Link className="linkLogin" to="/">
                Home
              </Link>
              <Link className="linkLogin" to="/signup">
                Sign Up
              </Link>
              <Link className="linkLogin" to="/login">
                Login
              </Link>
            </div>
            <Link className="linkLogin" to="/cart">
              <span className="nav-cart-count">{cart.length} </span>
              Cart
            </Link>
          </div>
        )}
        <div>
          <hr />
        </div>
        <h3 className="tagline">Where art lives.</h3>
        <div className="usefulLinks">
          <Link to="/" className="smallLinks">
            {' '}
            Painting{' '}
          </Link>
          |
          <Link to="/" className="smallLinks">
            {' '}
            Sculpture{' '}
          </Link>{' '}
          |
          <Link to="/" className="smallLinks">
            {' '}
            Photography{' '}
          </Link>{' '}
          |
          <Link to="/" className="smallLinks">
            {' '}
            Illustration{' '}
          </Link>
        </div>
      </nav>
    </div>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired
}
