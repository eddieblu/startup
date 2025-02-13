import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return <div className="body bg-dark text-light">
        <header className="container-fluid">
            <nav className="navbar navbar-dark">
                <a className="navbar-brand" href="/">
                    <h1>Scatter Sunshine</h1>
                </a>
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="post.html">Post</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="feed.html">Feed</a>
                    </li>
                </menu>
            </nav>
        </header>

        <main>App components go here</main>

        <footer className="text-white">
            <div className="container-fluid">
                <span className="text-reset">Bethany Edwards</span>
                <a className="text-reset" href="https://github.com/eddieblu/startup">GitHub Source</a>
            </div>
        </footer>

    </div>;
}