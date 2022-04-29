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
import "./style.css";
import Popup from "reactjs-popup";

export default class Redirecte extends Component {
  constructor() {
    super();
    this.state = {
      user_shows: [],
      modal: false,
      info: {}
    };
  }

  componentDidMount() {
    const id = sessionStorage.getItem("id");
    axios({
      method: "GET",
      url: `https://api.betaseries.com/shows/member?key=f652fdad2357&id=${id}&order=alphabetical&status=current`
    }).then(response => {
      this.setState({ user_shows: response.data.shows });
      console.log(this.state.user_shows);
    });
  }

  seen(e) {}
  render() {
    if (!sessionStorage.getItem("token")) {
      return (
        <h1>
          Merci de bien vouloir vous connectez pour profitez pleinement du
          service
        </h1>
      );
    } else {
      return (
        <div className="series-list">
          <p>Vos séries.</p>
          <div id="accordion" role="tablist">
          {this.state.user_shows.map((e, idx) => {
            return (
              <li className="list-group-item">
                <a href={`/serie/${e.id}`} id={idx}>
                  {e.title}
                </a>
              </li>

              
            );
          })}
          


          </div>
        </div>
      );
    }
  }
}
