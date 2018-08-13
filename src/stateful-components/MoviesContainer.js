import React, { Component } from "react";
import MoviesTable from "../stateless-components/MoviesTable";
import {
  createMovie,
  addMoviesToLocalStorage,
  getMoviesFromLocalStorage
} from "../utils/MovieFactory";
import Modal from "../stateless-components/Modal";
import AddButton from "../stateless-components/addButton";
import { validateForm } from "../utils/FormValidation";

export default class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Starter movies are loaded from local storage
      movies: getMoviesFromLocalStorage(),
      //Currently selected movie in the modal, either in editing or in adding
      modalMovie: {},
      //Title will be changed based on editing or adding a movie
      modalTitle: "",
      showModal: false,
      validationErrors: ""
    };

    //Bind class methods to this for use in the methods
    this.handleSetModalMovie = this.handleSetModalMovie.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveMovieEdit = this.handleSaveMovieEdit.bind(this);
    this.handleModalState = this.handleModalState.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
    this.handleSaveNewMovie = this.handleSaveNewMovie.bind(this);
  }

  //Adds selected movie to modal for editing
  handleSetModalMovie(event) {
    event.preventDefault();
    //Find the index of the selected movie to later replace it
    const modalMovieId = event.target.id;
    const modalMovie = this.state.movies.find(
      movie => movie.id == modalMovieId
    );
    //Open modal
    this.handleModalState();
    this.setState({
      //Set the state of the movie in modal
      modalMovie: { ...this.state.modalMovie, ...modalMovie }
    });

    this.setState({
      //Set the state of the modal title
      modalTitle: `Edit Movie`
    });
  }

  //When a user clicks to save a movie edit
  handleSaveMovieEdit(event) {
    //Get the selected movie object and the array of all movies
    const modalMovie = { ...this.state.modalMovie };
    const updatedMovies = [...this.state.movies];

    //Find the index of the selected movie, so that when the state is updated,
    //the movie retains the same index in the table.
    const modalMovieIndex = updatedMovies
      .map(movie => movie.id)
      .indexOf(modalMovie.id);
    updatedMovies[modalMovieIndex] = modalMovie;
    //Validate form for errors (via module)
    const formValidationErrors = validateForm(modalMovie);

    //If form has no validation errors,
    if (formValidationErrors.length === 0) {
      //Update the movies array, add movies to local storage, and close the modal
      this.setState({ movies: updatedMovies });
      addMoviesToLocalStorage(updatedMovies);
      this.handleModalState();
    } else {
      //Set the state of the validation errors array
      this.setState({
        validationErrors: [
          ...this.state.validationErrors,
          ...formValidationErrors
        ]
      });
    }
  }
  //Open modal to add a new movie
  handleAddMovie() {
    //Show modal, and set the title of modal
    this.setState({ showModal: true, modalTitle: "Add Movie" });
  }

  //Save movie form
  handleSaveNewMovie() {
    //Validate form for errors (via module)
    const formValidationErrors = validateForm(this.state.modalMovie);
    //Use factory function module to create a newMovie object with a unique Id
    const newMovie = createMovie(
      this.state.modalMovie.title,
      this.state.modalMovie.director,
      this.state.modalMovie.releaseDate
    ).getMovie();
    //If form has no errors
    if (formValidationErrors.length === 0) {
      const updatedMovies = [...this.state.movies, newMovie];
      //Add new movie to state of movies array
      this.setState({ movies: updatedMovies });
      addMoviesToLocalStorage(updatedMovies);
      //Close modal
      this.handleModalState();
    } else {
      //Set state of validation errors
      this.setState({
        validationErrors: formValidationErrors
      });
    }
  }

  //Set form input field state
  //Take the input name and replace a corresponding key value in the movie object
  //with current value
  handleInputChange = event => {
    this.setState({
      modalMovie: {
        ...this.state.modalMovie,
        [event.target.name]: event.target.value
      }
    });
  };

  //Open or close modal based on whether it's open or closed
  handleModalState() {
    const modalState = this.state.showModal ? false : true;
    this.setState({ showModal: modalState });

    if (!modalState) {
      this.setState({ modalMovie: {}, validationErrors: "" });
    }
  }

  render() {
    console.log(this.state.movies);
    return (
      // State passed as properties to stateless components
      // Functions begin with "handle"
      <div>
        <MoviesTable
          movies={this.state.movies}
          handleSetModalMovie={this.handleSetModalMovie}
          handleModalSate={this.modalState}
        />
        {/* If the state of showModal is true, render the modal component; otherwise render null */}
        {this.state.showModal ? (
          <Modal
            modalMovie={this.state.modalMovie}
            modalTitle={this.state.modalTitle}
            showModal={this.state.showModal}
            validationErrors={this.state.validationErrors}
            handleInputChange={this.handleInputChange}
            handleSaveMovieEdit={this.handleSaveMovieEdit}
            handleModalState={this.handleModalState}
            handleAddMovie={this.handleAddMovie}
            handleSaveNewMovie={this.handleSaveNewMovie}
          />
        ) : null}
        <AddButton handleAddMovie={this.handleAddMovie} />
      </div>
    );
  }
}
