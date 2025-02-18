import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Sidebar from './Sidebar/Sidebar'; 
import Layoute from "./Layoute";
import Settings from './Pages/Settings'
import Users from './Pages/Users'
import Requests from './Pages/Requests'
import Products from './Pages/Products'

function Allpages() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Layoute />} >
              <Route index element={<Home />} />
              <Route path="Products" element={<Products />} />
              <Route path="Requests" element={<Requests />} />
              <Route path="Users" element={<Users />} />
              <Route path="Settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Allpages;
