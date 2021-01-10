import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicalls";

const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);
  let [numbOfProducts, setNumbOfProducts] = useState(0);

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          console.log("Error in fetching all products ", data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => {
        console.log("Catch Error in getting all Products", error);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          console.log("Error in Deleting Product", data.error);
        } else {
          preload();
        }
      })
      .catch((error) => {
        console.log("Catch Error in deleting product", error);
      });
  };

  return (
    <Base
      title="Welcome Back Admin"
      description="Manage your all products here!"
    >
      <div className="mb-5">
        <Link className="btn btn-success mb-3 rounded" to="/admin/dashboard">
          <span>
            <IoMdArrowBack className="align-self-center" />
          </span>{" "}
          Back
        </Link>
      </div>
      <h1 className="mb-4">All products:</h1>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white mb-5">
            Total {products.length} products
          </h2>
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-4 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success rounded"
                    to={`/admin/product/update/productId`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
