import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManageCategories}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/products" component={ManageProducts} />
      </Switch>
    </Router>
  );
};

export default Routes;
