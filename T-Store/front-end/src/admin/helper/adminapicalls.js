import { API } from "../../backend";

//CATEGORY CALLS

//create category
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

// get category
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in getting Categories" + error);
    });
};

//PRODUCT CALLS

//create product
export const createProduct = (user, token, product) => {
  return fetch(`${API}/product/create/${user}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in creating Product", error);
    });
};

//get all products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in Getting all Products", error);
    });
};

//get product by ID
export const getProductById = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in getting product by ID", error);
    });
};

//update product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/:productId/:userId`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in Updating Product", error);
    });
};

//delete product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error in deleting Product", error);
    });
};
