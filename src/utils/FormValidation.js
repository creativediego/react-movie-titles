const moment = require("moment");

export const formatDate = date => {
  return moment(date)
    .format("MMMM D, YYYY")
    .isValid();
};

const isDateValid = date => moment(date, "MMMM D, YYYY", true).isValid();

export const validateForm = movie => {
  let errors = [];
  if (!movie.title) {
    errors = [...errors, "Please enter a movie title."];
  }

  if (!movie.director) {
    errors = [...errors, "Please enter a director."];
  }

  if (!isDateValid(movie.releaseDate)) {
    errors = [
      ...errors,
      "Enter date in the following format: Month Day, Year."
    ];
  }

  return errors;
};
