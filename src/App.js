import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import AddShoppingListItem from "./components/AddShoppingListItem";
import Register from "./components/Register";
import Login from "./components/Login";
import { loadUsersFromStorage, loadCurrentUserFromStorage } from "./redux/UserAuthenticationReducer";
import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersFromStorage());
    dispatch(loadCurrentUserFromStorage());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddShoppingListItem />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;