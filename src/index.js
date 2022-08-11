import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter,
	Routes,
	Route,
  } from "react-router-dom";
import './styles/index.css';

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Reset from "./pages/Reset"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/account/login" element={<Login />} />
			<Route path="/account/register" element={<Register />} />
			<Route path="/account/reset" element={<Reset />} />
			<Route path="/home" element={<Home />} />
		</Routes>
	</BrowserRouter>
)

