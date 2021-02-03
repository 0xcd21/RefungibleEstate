import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './style.css';
import logo from '../../assets/images/logo.png';


const NavigationBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar navbar-colors" expand="md">
        <NavbarBrand className="navbar-colors" href="/">
          <img src={logo} className="logo-app" alt="logo" />
        </NavbarBrand>
        <NavbarToggler className="navbar-toggler-colors" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="navbar-colors" href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              {/* <NavLink className="navbar-colors" href="/create/land">Create land</NavLink> */}
              <NavLink className="navbar-colors" href="/renderLand">Create land</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default NavigationBar;
