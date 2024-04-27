import React, { useEffect } from 'react';
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
import ClipboardJS from 'clipboard';


const addCopyButtonToCodeBlocks = () => {
  document.querySelectorAll('pre').forEach(function (codeBlock) {
    var button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    var s = codeBlock.innerText;
    button.setAttribute('data-clipboard-text', s);
    button.innerText = 'Copy';

    codeBlock.classList.add('prettyprint');
    codeBlock.appendChild(button);
  });

  var clipboard = new ClipboardJS('.copy-code-button');

  clipboard.on('success', function (e) {
    e.trigger.textContent = 'Copied';
    window.setTimeout(function () {
      e.trigger.textContent = 'Copy';
    }, 2000);
    e.clearSelection();

  });

  clipboard.on('error', function (e) {
    e.trigger.textContent = 'Error';
    window.setTimeout(function () {
      e.trigger.textContent = 'Copy';
    }, 2000);
    e.clearSelection();
  });
};


const App = () => {
  addCopyButtonToCodeBlocks();
  return (
    <>
      <Toaster
        className="text-sm"
        position="top-center"
        reverseOrder={false}
      />
      <BrowserRouter>
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