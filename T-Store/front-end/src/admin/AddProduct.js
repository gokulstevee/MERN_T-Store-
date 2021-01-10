import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createProduct, getCategories } from "./helper/adminapicalls";

const AddProduct = ({ history }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: false,
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    // console.log("preload");
    getCategories().then((data) => {
      // console.log(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          createdProduct: "",
          getRedirect: false,
        });
      } else {
        setValues({
          ...values,
          categories: [...data],
          formData: new FormData(),
        });
        // console.log(categories);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const handleChange = (field) => (e) => {
    const value = field === "photo" ? e.target.files[0] : e.target.value;
    formData.set(field, value);
    setValues({ ...values, [field]: value });
  };

  useEffect(() => {
    if (getRedirect) {
      console.log(getRedirect);
      setTimeout(() => {
        history.push("/admin/dashboard");
      }, 2000);
    }
  }, [getRedirect]);

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          formData.delete("name");
          formData.delete("description");
          formData.delete("price");
          formData.delete("photo");
          formData.delete("category");
          formData.delete("stock");
          setValues({
            ...values,
            loading: false,
            error: false,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            createdProduct: data.name,
            getRedirect: true,
          });
          console.log("Log " + getRedirect);
        }
      })
      .catch((error) => {
        console.log("Error in CreateProduct", error);
      });
  };

  const Message = () => {
    return (
      <>
        {error ? (
          <div
            // style={{ display: createdProduct ? "" : "none" }}
            className="alert alert-warning mt-3"
          >
            <h4>Please refresh the page and try</h4>
          </div>
        ) : (
          <div
            style={{ display: createdProduct ? "" : "none" }}
            className="alert alert-success mt-3"
          >
            <h4>{createdProduct} created successfully</h4>
          </div>
        )}
      </>
    );
  };

  const createProductForm = () => (
    <form className="mt-3">
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a photo"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((category, index) => (
              // console.log(category.name)
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-4"
      >
        Create Product
      </button>
    </form>
  );

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
      title="Welcome to Product Section"
      description="Create Your Product Here!"
      className="container bg-info p-4"
    >
      {backToDashboard()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {Message()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
