import React from "react";

const ModalForm = props => (
  <form>
    <div class="form-group">
      <label for="movieTitle">Movie Title</label>
      <input
        required
        type="text"
        class="form-control"
        name="title"
        placeholder={props.modalMovie.title || "Enter movie title"}
        value={props.modalMovie.title}
        onChange={event => props.handleInputChange(event)}
      />
    </div>
    <div class="form-group">
      <label for="movieDirector">Director</label>
      <input
        required
        type="text"
        class="form-control"
        name="director"
        placeholder={props.modalMovie.director || "Enter director"}
        value={props.modalMovie.director}
        onChange={event => props.handleInputChange(event)}
      />
    </div>
    <div class="form-group">
      <label for="releaseDate">Release Date</label>
      <input
        required
        type="text"
        class="form-control"
        name="releaseDate"
        placeholder={props.modalMovie.releaseDate || "Enter release date"}
        value={props.modalMovie.releaseDate}
        onChange={event => props.handleInputChange(event)}
      />
    </div>
  </form>
);

export default ModalForm;
