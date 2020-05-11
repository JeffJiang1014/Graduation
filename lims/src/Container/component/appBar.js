// rcc: react class compnent
import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <span className="navbar-brand">
              杭州师范大学
            </span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">研究所管理系统
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            登录
          </Link>
        </li>
      </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
export default Navbar;
