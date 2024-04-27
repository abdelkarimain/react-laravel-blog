import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Header from './components/Header';
import FooterCompo from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import CreatePost from './pages/CreatePost';
import AdminRoute from './components/AdminRoute';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';






const App = () => {
  return (
    <>
      <Toaster
        className="text-sm"
        position="top-center"
        reverseOrder={false}
      />
      <BrowserRouter>
      <ScrollToTop />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />
          <Route path='/post/:postslug' element={<PostPage />} />

          {/* private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
          </Route>


        </Routes>

        <FooterCompo />
      </BrowserRouter>
    </>
  );
}

export default App;