import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    success: false,
  });

  const { name, email, password, confirmPassword, success, error } = values;

  //form field change
  const handleOnChange = (field) => (e) => {
    setValues({ ...values, error: false, [field]: e.target.value });
  };

  //form submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    if (password !== confirmPassword) {
      return setValues({
        ...values,
        error: "Passord doesn't match",
        success: false,
      });
    }
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log("Error in signup handleOnSubmit", err);
      });
  };

  //signUp jsx
  const SignupForm = () => {
    return (
      <form className="authform_form-width">
        <div className="form-group ">
          <label>Name</label>
          <input
            type="text"
            onChange={handleOnChange("name")}
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group ">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleOnChange("email")}
            value={email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleOnChange("password")}
            placeholder="Password"
            value={password}
          />
        </div>
        <div className="form-group signup_confirmpassword-margin">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            onChange={handleOnChange("confirmPassword")}
            placeholder="Password"
            value={confirmPassword}
          />
        </div>
        <div className="authform_btn-div">
          <button
            type="submit"
            className="authform_btn signup_btn"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
          >
            Create
          </button>
        </div>
      </form>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        Signup Successfull, Click here to Login <Link to="/signin">Login</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  return (
    <Base
      title="SignUp"
      description="Create your account to grab the amazing T-Shirts"
    >
      <div className="authform_form-width text-center">
        {successMessage()}
        {errorMessage()}
      </div>
      {SignupForm()}
      <p>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
