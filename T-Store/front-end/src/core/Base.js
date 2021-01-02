import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you have any queries, feel free to reach out!</h4>
        <button className="btn btn_contactus btn-warning btn-lg">
          Contact Us
        </button>
      </div>
      <div className="container text-center">
        <span className="text-muted">
          <span className="text-white">T-Store</span> An Amazing store for
          online t-shirt shoping
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
