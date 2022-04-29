import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Redirecte from "./Components/Redirect";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Serie from "./Components/Serie";
import Saison from "./Components/Saison";
import Episode from "./Components/Episode";
import "./Components/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    if (!sessionStorage.getItem("id")) {
      return (
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">PreviouslyOn</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar>
          <br />
          <Switch>
            <Route path="/redirect" component={Redirecte} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">PreviouslyOn</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  sessionStorage.clear();
                  window.location.reload(false)
                }}
              >
                Deconnexion
              </button>
            </Nav>
          </Navbar>
          <br />
          <Switch>
            <Route path="/redirect" component={Redirecte} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Home} />
            <Route exact path="/serie/:id" component={Serie} />
            <Route exact path="/serie/:id/saison/:saison" component={Saison} />
            <Route
              exact
              path="/serie/:id/saison/:saison/episode/:id_episode"
              component={Episode}
            />
          </Switch>

          <section id="footer">
            <div class="container">
              <div class="row text-center text-xs-center text-sm-left text-md-left">
                <div class="col-xs-12 col-sm-4 col-md-4">
                  <h5>Quick links</h5>
                  <ul class="list-unstyled quick-links">
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Home
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>About
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>FAQ
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Get Started
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Videos
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4">
                  <h5>Quick links</h5>
                  <ul class="list-unstyled quick-links">
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Home
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>About
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>FAQ
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Get Started
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Videos
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-xs-12 col-sm-4 col-md-4">
                  <h5>Quick links</h5>
                  <ul class="list-unstyled quick-links">
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Home
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>About
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>FAQ
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void();">
                        <i class="fa fa-angle-double-right"></i>Get Started
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wwwe.sunlimetech.com"
                        title="Design and developed by"
                      >
                        <i class="fa fa-angle-double-right"></i>Imprint
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                  <ul class="list-unstyled list-inline social text-center">
                    <li class="list-inline-item">
                      <a href="javascript:void();">
                        <i class="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void();">
                        <i class="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void();">
                        <i class="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void();">
                        <i class="fa fa-google-plus"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void();" target="_blank">
                        <i class="fa fa-envelope"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                  <p>
                    <u>
                      <a href="https://www.nationaltransaction.com/">
                        National Transaction Corporation
                      </a>
                    </u>{" "}
                    is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly
                    owned subsidiary of U.S. Bancorp, Minneapolis, MN]
                  </p>
                  <p class="h6">
                    &copy All right Reversed.
                    <a
                      class="text-green ml-2"
                      href="https://www.sunlimetech.com"
                      target="_blank"
                    >
                      Sunlimetech
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Router>
      );
    }
  }
}
