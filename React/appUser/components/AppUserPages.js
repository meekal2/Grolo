import React from "react";

export default function Pages(props) {
  return (
    <React.Fragment>
      <img
        alt="logo"
        src="http://i67.tinypic.com/vyy1eh.png"
        style={{ marginLeft: "auto", marginRight: "auto", width: "50%", display: "block" }}
      />
      <h4 className="text-center" style={{ marginTop: "80px" }}>
        <strong>
          Thank you for registering, you will be receiving a confirmation email shortly.
        </strong>
      </h4>
    </React.Fragment>
  );
}
