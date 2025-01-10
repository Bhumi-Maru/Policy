//App.jsx
import React, { useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Main Content/Dashboard/Dashboard";
import ClientForm from "./components/Main Content/Client/ClientForm";
import ClientTable from "./components/Main Content/Client/ClientTable";
import AgentAdd from "./components/Main Content/Agent Add/AgentForm";
import AgentTable from "./components/Main Content/Agent Add/AgentTable";
import UserCreationTable from "./components/Main Content/User Creation/UserCreationTable";
import UserCreationForm from "./components/Main Content/User Creation/UserCreationForm";
import PolicyForm from "./components/Main Content/Policy Add/PolicyForm";
import PolicyTable from "./components/Main Content/Policy Add/PolicyTable";
import PolicyCategory from "./components/Main Content/Policy Category/PolicyCategoryForm";
import PolicyCategoryTable from "./components/Main Content/Policy Category/PolicyCategoryTable";
import Signup from "./components/Authentication/Signup/Signup";
import Signin from "./components/Authentication/SignIn/Signin";
import ForgotPassword from "./components/Authentication/Forgot Password/ForgotPassword";
import CompanyTable from "./components/Main Content/Company/CompanyTable";
import ClientUpdate from "./components/Main Content/Client/ClientUpdate";
import UserUpdate from "./components/Main Content/User Creation/UserUpdate";
import UpdateAgent from "./components/Main Content/Agent Add/UpdateAgent";
import MainCategoryTable from "./components/Main Content/Policy Category/Main Category/MainCategoryTable";
import SubCategoryTable from "./components/Main Content/Policy Category/Sub Category/SubCategoryTable";
import UpdatePolicy from "./components/Main Content/Policy Add/UpdatePolicy";

export default function App() {
  const [activeItem, setActiveItem] = useState("");
  const [clients, setClients] = useState([]);

  const handleAddClient = (clientData) => {
    setClients((prevClients) => [...prevClients, clientData]);
  };

  const handleMenuClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <>
      <Router>
        <Navbar activeItem={activeItem} handleMenuClick={handleMenuClick} />
        <SideBar handleMenuClick={handleMenuClick} activeItem={activeItem} />

        <div
          style={{
            backgroundColor: "#eff2f7",
            overflowY: "scroll",
            height: "100vh",
            // zIndex: "-1",
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* client */}
            <Route path="/client-add" element={<ClientForm />} />
            <Route path="/client-update-form/:id" element={<ClientUpdate />} />
            <Route
              path="/client"
              element={
                <ClientTable
                  activeItem={activeItem}
                  handleMenuClick={handleMenuClick}
                  clients={clients}
                />
              }
            />
            {/* company */}
            <Route
              path="/company"
              element={<CompanyTable handleMenuClick={handleMenuClick} />}
            />
            {/* policy category */}
            <Route path="/policy-category" element={<PolicyCategoryTable />} />
            <Route
              path="/policy-category/main-category"
              element={<MainCategoryTable handleMenuClick={handleMenuClick} />}
            />
            <Route
              path="/policy-category/sub-category"
              element={<SubCategoryTable handleMenuClick={handleMenuClick} />}
            />
            <Route path="/policy-category-form" element={<PolicyCategory />} />
            <Route path="/policy-add" element={<PolicyForm />} />
            <Route path="/policy-update-form/:id" element={<UpdatePolicy />} />
            <Route
              path="/policy"
              element={<PolicyTable handleMenuClick={handleMenuClick} />}
            />
            <Route
              path="/user-creation"
              element={<UserCreationTable handleMenuClick={handleMenuClick} />}
            />
            <Route path="/user-creation-form" element={<UserCreationForm />} />
            <Route path="/user-update-form/:id" element={<UserUpdate />} />
            <Route
              path="/agent"
              element={<AgentTable handleMenuClick={handleMenuClick} />}
            />
            <Route path="/agent-add" element={<AgentAdd />} />
            <Route path="/agent-update-form/:id" element={<UpdateAgent />} />
            {/* Authentication */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
