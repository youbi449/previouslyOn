import React, { Component } from "react";
import axios from "axios";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class Serie extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
      images: [],
      loading: true,
      episodes: []
    };
    this.archive = this.archive.bind(this);
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
        archive: false,
        loading: false
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
      let genres = Object.keys(data.genres);
      return (
        <div className="details">
          {this.state.archive ? "Votre série à bien été archiver" : ""}
          <button type="button" class="btn btn-danger" onClick={this.archive}>
            Archiver
          </button>
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

          <ul class="list-group list-group-horizontal info-series">
            {genres.map((e, idx) => {
              return (
                <li class="list-group-item" id={idx}>
                  {e}
                </li>
              );
            })}
          </ul>
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Saisons
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  {data.seasons_details.map((e, idx) => {
                    return (
                      <a
                        class="btn btn-primary"
                        href={`/serie/${this.props.match.params.id}/saison/${e.number}`}
                        role="button"
                      >
                        Saison {e.number}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
