import React from "react";
import { Outlet } from "react-router-dom";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { capitalize, delay } from "lodash";
import { useDispatch } from "react-redux";
import { clearAlert } from "./uiSlice";

export default function Layout() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.ui.alert);
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Code Sass POS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Products" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/products">
                  All Product
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/products/new">
                  Create Product
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>
              <Nav.Link as={Link} to="/Orders">
                Orders
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Outlet />
      </Container>

      <ToastContainer
        position="bottom-end"
        containerPosition="fixed"
        className="p-3"
      >
        <Toast
          show={!!alert}
          delay={3000}
          autohide
          bg={alert?.type}
          onClose={() => dispatch(clearAlert())}
        >
          <Toast.Header>
            <strong className="me-auto">{capitalize(alert?.type)}</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>{alert?.message}.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
