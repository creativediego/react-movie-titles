import React from "react";
import ModalForm from "../stateless-components/ModalForm";
import Alert from "../stateless-components/Alert";

const Modal = props => (
  <div>
    <div
      class="modal show"
      id="infoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
      style={{ display: "block", paddingLeft: "0px" }}
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="infoModal">
              {props.modalTitle}
            </h5>
            <button
              type="button"
              class="close"
              onClick={() => props.handleModalState()}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ModalForm
              modalMovie={props.modalMovie}
              handleInputChange={props.handleInputChange}
            />
            {/*If there are any validation errors, render the Alert componenets and pass the errors array as properties */}
            {props.validationErrors ? (
              <Alert type="danger" messages={props.validationErrors} />
            ) : null}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => props.handleModalState()}
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={
                //If the title state of the modal is to add a movie,
                //then use the method to save a new movie
                //otherwise, use the method to save editing the movie
                props.modalTitle === "Add Movie"
                  ? () => props.handleSaveNewMovie()
                  : e => props.handleSaveMovieEdit(e)
              }
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" />
  </div>
);

export default Modal;
