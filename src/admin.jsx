import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [products, setProducts] = useState([]);
  const fetchProducts = () => {
  axios
    .get("http://localhost:8000/api/products/")
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.error("There was an error fetching products!", error);
    });
};
  // ✅ Fetch products from API when component loads
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((response) => {
        setProducts(response.data);
        fetchProducts(); // save data into state
      })
      .catch((error) => {
        console.error("There was an error fetching products!", error);
      });
  }, []);

  // ✅ Add product locally (or also call API if needed)
  const handleAddProduct = () => {
  if (!productName || !productPrice || !productDescription) {
    alert("Please fill all fields");
    return;
  }

  const newProduct = {
    product_name: productName,
    product_description: productDescription,
    price: productPrice,
  };

  // Call API to insert into DB
  axios
    .post("http://localhost:8000/api/add/", newProduct)
    .then((response) => {
      console.log("Product added:", response.data);

      // Refresh product list after adding
      // Refresh product list after adding
        axios
    .get("http://localhost:8000/api/products/")
    .then((response) => {
      setProducts(response.data);
    });

      // Clear input fields
      setProductName("");
      setProductPrice("");
      setProductDescription("");
    })
    .catch((error) => {
      console.error("There was an error adding the product!", error);
    });
};

  return (
    <>
      <h1>Admin Dashboard</h1>

      <h2>Add Product</h2>
      <table border="1" style={{ marginBottom: "10px" }}>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Product Description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </td>
            <td>
              <button onClick={handleAddProduct}>Add Product</button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h1>Added Products</h1>
      <table border="1">
       <thead>
  <tr>
    <th>S.No</th>
    <th>Product Name</th>
    <th>Description</th>
    <th>Price</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
</thead>
<tbody>
  {products.length === 0 ? (
    <tr>
      <td colSpan="6">No products found</td>
    </tr>
  ) : (
    products.map((p, index) => (
      <tr key={p.id || index}>
        <td>{index + 1}</td>
        <td>{p.product_name}</td>
        <td>{p.product_description}</td>
        <td>{p.price}</td>
        <td>
          <button onClick={() => handleEditProduct(p)}>Edit</button>
        </td>
        <td>
          <button onClick={() => handleDeleteProduct(p.id)}>Delete</button>
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </>
  );
}

export default Admin;
