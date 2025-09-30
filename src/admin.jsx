import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]); // ✅ Cart state
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get("https://fsd-python-eemr.onrender.com/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching products!", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

    axios
      .post("https://fsd-python-eemr.onrender.com/api/add/", newProduct)
      .then(() => {
        fetchProducts();
        setProductName("");
        setProductPrice("");
        setProductDescription("");
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
      });
  };

  // ✅ Search filter
  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.product_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // ✅ Remove from cart
  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <a className="navbar-brand fw-bold" href="#">
          Ecommerce-site
        </a>

        {/* Center Search Bar */}
        <form
          className="d-flex mx-auto"
          style={{ width: "40%" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search products..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Right Side Buttons */}
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => alert("Cart feature under development!")}
          >
            🛒 Cart ({cart.length})
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
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
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
          }}
        >
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead className="bg-light">
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Add to Cart</th> {/* ✅ new column */}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7">No products found</td>
                </tr>
              ) : (
                filteredProducts.map((p, index) => (
                  <tr key={p.id || index}>
                    <td>{index + 1}</td>
                    <td>{p.product_name}</td>
                    <td>{p.product_description}</td>
                    <td>{p.price}</td>
                    <td>
                      <button onClick={() => handleEditProduct(p)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteProduct(p.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAddToCart(p)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Show cart items */}
        <div className="mt-4">
          <h2>🛒 Cart Items ({cart.length})</h2>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item.product_name} - ₹{item.price}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
