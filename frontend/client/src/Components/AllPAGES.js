
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Layoute from "./Layoute";
import Classifications from "./Pages/Classifications/Classifications";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Products from "./Pages/Products/Products"



function AllPAGES() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layoute />} >
        <Route path="/" element={<Home />}/>
        <Route path="Classifications" element={<Classifications />}/>
        <Route path="ContactUs" element={<ContactUs />}/>
        <Route path="Products" element={<Products />}/>



         
        </Route>
      </Routes>
    </Router>
  );
}

export default AllPAGES;
