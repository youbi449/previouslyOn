import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

export default class Redirecte extends Component {
  constructor() {
    super();
    this.state = {
      code: window.location.search.substring(6),
      redirection: false
    };
  }

  componentDidMount() {
    axios({
      method: "POST",
      url: "https://api.betaseries.com/oauth/access_token?v=3.0",
      data: {
        client_id: "f652fdad2357",
        client_secret: "505ff1bf7a65c5c1c0dd621636947ec2",
        redirect_uri: "http://localhost:3000/redirect/",
        code: this.state.code
      }
    })
      .then(response => {
        console.log(response);
        sessionStorage.setItem("token", response.data.access_token);
        this.setState({ redirection: true });
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  render() {
    if (!this.state.redirection) {
      return <h1>Vous allez être redirigé(e)</h1>;
    }else{
      return <Redirect to="/home"/>
    }
  }
}
