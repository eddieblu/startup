import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Post } from './post/post';
import { Feed } from './feed/feed';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className="body bg-dark">
                <header className="container-fluid">
                    <nav className="navbar navbar-dark text-light">
                        <NavLink className='nav-link' to='/'>
                            <h1>Scatter Sunshine</h1>
                        </NavLink>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/'>Home</NavLink>
                            </li>
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='post'>
                                        Post
                                    </NavLink>
                                </li>
                            )}
                            {authState === AuthState.Authenticated && (
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='feed'>
                                        Feed
                                    </NavLink>
                                </li>
                            )}
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route
                        path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                        exact
                    />
                    <Route path='/post' element={<Post userName={userName} />} />
                    <Route path='/feed' element={<Feed userName={userName} />} />
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