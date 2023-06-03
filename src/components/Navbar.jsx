import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import { useState } from "react";
import classes from "../styles/Nav.module.css";

export default function Mynav({ game, handleShow, setGame, setSideBar }) {
  const [showNav, setShowNav] = useState(false);
  const handleGameChange = (e) => {
    setGame(e.target.innerText);
  };

  const handleSidebar = () => {
    setSideBar(true);
  };

  return (
    <>
      <MDBNavbar expand="lg" dark className={classes.nav}>
        <MDBContainer>
          <MDBNavbarBrand>Combinatorial Game Visualizer</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="true"
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNav} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink onClick={() => handleShow()}>
                  Instructions
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#link">Rules</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    {game}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link onClick={handleGameChange}>
                      Nim
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={handleGameChange}>
                      Misere Nim
                    </MDBDropdownItem>
                    <MDBDropdownItem link onClick={handleGameChange}>
                      StairCase Nim
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav>
              <button
                disabled={game == "Games"}
                className={`btn ${classes.btn}`}
                onClick={handleSidebar}
              >
                Configure
              </button>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
