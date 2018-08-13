import React from "react";

const MoviesTable = props => (
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Director</th>
          <th scope="col">Release Date</th>
        </tr>
      </thead>
      <tbody>
        {/* Map each movie as row */}
        {props.movies.map(movie => (
          <tr>
            <td>
              <a
                key={movie.id}
                id={movie.id}
                href="#"
                // Set the state of the selected movie that appears in the edit modal
                onClick={event => props.handleSetModalMovie(event)}
                data-toggle="modal"
                data-target="#infoModal"
              >
                {movie.title}
              </a>
            </td>
            <td>{movie.director}</td>
            <td>{movie.releaseDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MoviesTable;
