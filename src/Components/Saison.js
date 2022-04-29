import React, { Component } from "react";
import axios from "axios";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Saison extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
      images: [],
      loading: true,
      episodes: [],
      viewed: false,
      viewed_msg: ""
    };
    this.archive = this.archive.bind(this);
    this.view = this.view.bind(this);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.betaseries.com/shows/display?key=f30975c7add9&id=${this.props.match.params.id}`
    }).then(response => {
      console.log(response.data);
      this.setState({
        info: response.data.show,
        images: Object.values(response.data.show.images),
        loading: false
      });
    });

    axios({
      method: "get",
      url: `https://api.betaseries.com/shows/episodes?key=f30975c7add9&id=${this.props.match.params.id}&season=${this.props.match.params.saison}`
    }).then(response => {
      console.log(response.data);
      this.setState({ episodes: response.data.episodes });
    });
  }

  view(bulk, id) {
    axios({
      method: "post",
      url: `https://api.betaseries.com/episodes/watched`,
      data: {
        id: id,
        bulk: bulk,
        key: "f30975c7add9",
        token: sessionStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({
          viewed_msg: "L'épisode a bien été enregistrer comme vu",
          viewed: true
        });
      })
      .catch(err => {
        console.log();
        this.setState({
          viewed_msg: err.response.data.errors[0].text,
          viewed: true
        });
      });
  }

  archive() {
    axios({
      method: "post",
      url: `https://api.betaseries.com/shows/archive`,
      data: {
        id: this.props.match.params.id,
        key: "f30975c7add9",
        token: sessionStorage.getItem("token")
      }
    }).then(response => {
      this.setState({ archive: true });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={this.state.loading}
        />
      );
    } else {
      let data = this.state.info;
      let image = this.state.images;
      return (
        <div className="details">
          {this.state.viewed ? (
            <div
              class="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              {this.state.viewed_msg}
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <h1>{data.title}</h1>
          <img src={image[3]} alt={data.title} />

          <ul class="list-group list-group-horizontal info-series">
            <li class="list-group-item">{data.seasons} saisons au total</li>
            <li class="list-group-item">{data.episodes} épisodes au total</li>
            <li class="list-group-item">
              La durée d'un épisode est d'en moyenne {data.length} minutes{" "}
            </li>
            <li class="list-group-item">
              Note: {data.notes.mean.toFixed(2)} ({data.notes.total} vote)
            </li>
          </ul>
          <p class="lead">{data.description}</p>
          <ul class="list-group list-group-horizontal">
            {this.state.episodes.map((e, idx) => {
              return (
                <div class="dropdown">
                  <li class="list-group-item">
                    <a
                      href={`/serie/${this.props.match.params.id}/saison/${this.props.match.params.saison}/episode/${e.id}`}
                    >
                      Episode {e.episode}{" "}
                    </a>
                    <i
                      class="fas fa-ellipsis-h"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    ></i>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => this.view(false, e.id)}
                      >
                        Marquer comme vu
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => this.view(true, e.id)}
                      >
                        Tout les épisodes vu jusque celui ci
                      </a>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
