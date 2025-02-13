import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Post } from './post/post';
import { Feed } from './feed/feed';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="container-fluid">
                    <nav className="navbar navbar-dark">
                        <NavLink className='nav-link' to='/'>
                            <h1>Scatter Sunshine</h1>
                        </NavLink>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='post'>Post</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='feed'>Feed</NavLink>
                            </li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/post' element={<Post />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer className="text-white">
                    <div className="container-fluid">
                        <span className="text-reset">Bethany Edwards</span>
                        <a className="text-reset" href="https://github.com/eddieblu/startup">GitHub Source</a>
                    </div>
                </footer>

            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }