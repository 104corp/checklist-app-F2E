import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse
} from "mdbreact";
import "../css/Navbar.sass";

class Navbar extends Component {
  render() {
    return (
      <div>
        <MDBNavbar color="black" dark expand="md">
          {/* 標首 */}
          <MDBNavbarBrand>
            <Link to="/">
              <strong className="white-text">系統測試</strong>
            </Link>
          </MDBNavbarBrand>

          <MDBNavbarToggler onClick={this.toggleCollapse} />

        </MDBNavbar>
      </div>
    );
  }
}

export default Navbar;