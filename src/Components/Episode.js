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
      comment: ""
    };
    this.comment = this.comment.bind(this);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.betaseries.com/episodes/display?key=f30975c7add9&id=${this.props.match.params.id_episode}`
    }).then(response => {
      console.log(response.data);
      this.setState({
        info: response.data.episode
      });
    });
    axios({
      method: "get",
      url: `https://api.betaseries.com/shows/display?key=f30975c7add9&id=${this.props.match.params.id}`
    }).then(response => {
      console.log(response.data);
      this.setState({
        images: Object.values(response.data.show.images),
        loading: false
      });
    });
  }

  comment(e) {
    console.log(this.state.comment);
    axios({
      method: "post",
      url: `https://api.betaseries.com/comments/comment`,
      data: {
        token: sessionStorage.getItem("token"),
        key: "f30975c7add9",
        id: this.state.info.id,
        type: "episode",
        text: this.state.comment
      }
    }).then(response => {
      console.log(response.data);
      this.setState({ comment_sent: true });
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
      let images = this.state.images;
      return (
        <div className="details">
          {this.state.comment_sent ? (
            <div
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Votre commentaire à bien été envoyer !
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
          <img src={images[0]} alt={data.title} />
          <ul class="list-group list-group-horizontal info-series">
            <li class="list-group-item">
              Note: {data.note.mean.toFixed(2)} ({data.note.total} vote)
            </li>
            <li class="list-group-item">Date de diffusion : {data.date}</li>
          </ul>
          <p class="lead">{data.description}</p>

          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea
              class="form-control"
              placeholder="Merci de bien vouloir respectez les règles"
              rows="5"
              id="comment"
              onChange={e => this.setState({ comment: e.target.value })}
            ></textarea>
            <button
              type="button"
              class="btn btn-primary"
              onClick={this.comment}
            >
              Envoyer{" "}
            </button>
          </div>
        </div>
      );
    }
  }
}
