import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Layoute from "./Layoute";
import Classifications from "./Pages/Classifications/Classifications";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Home/ProductDetails"; 


function AllPAGES() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layoute />}>
          <Route index element={<Home />} /> 
          <Route path="Classifications" element={<Classifications />} />
          <Route path="ContactUs" element={<ContactUs />} />
          <Route path="Products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AllPAGES;
