import React from "react";

const Alert = props => (
  <div class={`alert alert-${props.type}`} role="alert">
    {props.messages.map((message, i) => (
      <p key={i}>{message}</p>
    ))}
  </div>
);

export default Alert;
