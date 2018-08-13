import React from "react";

const addButton = props => (
  <div class="row justify-content-end">
    <div class="col-1">
      <span class="btn-add" onClick={() => props.handleAddMovie()}>
        +
      </span>
    </div>
  </div>
);

export default addButton;
