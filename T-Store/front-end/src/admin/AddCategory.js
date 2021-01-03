import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicalls";
import { IoMdArrowBack } from "react-icons/io";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError(false);
          setSuccess(true);
          setName("");
        }
      })
      .catch((error) => {
        console.log("Error in create Category" + error);
        setError(true);
      });
  };

  const message = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
    if (error) {
      return <h4 className="text-danger">Failed to Create Category</h4>;
    }
  };

  const myCategoryForm = () => {
    return (
      <form onSubmit={handleOnSubmit}>
        <div className="form-group text-center">
          <p className="lead mt-2 mb-1 text-left">Enter the category name</p>
          <input
            type="text"
            autoFocus
            required
            placeholder="Ex. Summer Collections"
            className="form-control"
            value={name}
            onChange={handleOnChange}
          />
          <button className="btn btn-outline-info mt-4 rounded">Create</button>
        </div>
      </form>
    );
  };

  const backToDashboard = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-success mb-3 rounded" to="/admin/dashboard">
          <span>
            <IoMdArrowBack className="align-self-center" />
          </span>{" "}
          Back
        </Link>
      </div>
    );
  };

  return (
    <Base
      title="Create the Category Here"
      description="Add a new Category for the T-Shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {message()}
          {myCategoryForm()}
          {backToDashboard()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
