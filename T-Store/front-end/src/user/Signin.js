import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setvalues] = useState({
    email: "g@g.com",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleOnChange = (field) => (e) => {
    setvalues({ ...values, error: false, [field]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setvalues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setvalues({
            ...values,
            loading: false,
            error: data.error,
          });
          console.log(error);
        } else {
          authenticate(data, () => {
            setvalues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role !== 0) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const SigninForm = () => {
    return (
      <form className="authform_form-width">
        <div className="form-group ">
          <label>Email address</label>
          <input
            type="email"
            className="form-control signinform_email"
            placeholder="Enter email"
            onChange={handleOnChange("email")}
            value={email}
          />

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleOnChange("password")}
              value={password}
            />
          </div>
        </div>
        <div className="authform_btn-div">
          <button
            type="submit"
            className="authform_btn"
            onClick={handleOnSubmit}
          >
            Get in
          </button>
        </div>
      </form>
    );
  };
  return (
    <Base title="Login" description="Here you go to collect amazing T-Shirts">
      <div className="authform_form-width text-center">
        {loadingMessage()}
        {errorMessage()}
      </div>
      {SigninForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
