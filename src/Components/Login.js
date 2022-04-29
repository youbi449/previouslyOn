import React, { Component } from "react";
import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

var md5 = require("md5");

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirection: false
    };
    this.handle = this.handle.bind(this);
    this.submit = this.submit.bind(this);
  }

  handle(e) {
    e.target.name === "email"
      ? this.setState({ email: e.target.value })
      : this.setState({ password: e.target.value });
  }

  submit() {
    axios({
      method: "post",
      url: "https://api.betaseries.com/members/auth",
      data: {
        login: this.state.email,
        password: md5(this.state.password),
        key: "f30975c7add9"
      }
    })
      .then(response => {
        sessionStorage.setItem("id", response.data.user.id);
        sessionStorage.setItem("token", response.data.token);
        this.setState({ redirect: true });
      })
      .catch(err => {
        this.setState({ error: err.response.data.errors[0].text });
      });
  }
  render() {
    if (!this.state.redirect) {
      let error =
        this.state.error != "" ? (
          <div class="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        ) : (
          ""
        );
      return (
        <div className="form">
          <h3>Se connecter</h3>
          {error}
          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Votre Mail"
              onChange={this.handle}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Entrer mot de passe"
              onChange={this.handle}
            />
          </div>

          <button className="btn btn-primary btn-block" onClick={this.submit}>
            Connexion
          </button>
        </div>
      );
    } else {
      return <Redirect to={"/home"} />;
    }
  }
}
