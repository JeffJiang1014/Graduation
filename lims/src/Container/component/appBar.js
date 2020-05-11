// rcc: react class compnent
import React, { Component } from 'react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
  constructor(props){
    super(props);
    //console.log(this.props.isEdit)
  }

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
                {this.props.isEdit?<span style={{"color": "grey"}}>国际服务与工程学院研究所</span>:<Link className="nav-link" to="/">国际服务与工程学院研究所</Link>}
                </li>
              </ul>
              <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        {this.props.isEdit?<Link className="nav-link" to="/user_index">返回</Link>:<Link className="nav-link" to="/login">登录</Link>}
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
