import React from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";

const Home = () => {
  console.log("Api is", API);
  return (
    <Base title="Home Page">
      <div className="className">
        <div className="row">
          <div className="col-4">
            <buttom className="btn btn-success">TEST</buttom>
          </div>
          <div className="col-4">
            <buttom className="btn btn-success">TEST</buttom>
          </div>
          <div className="col-4">
            <buttom className="btn btn-success">TEST</buttom>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
