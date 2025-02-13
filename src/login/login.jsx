import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="body container-fluid text-center">
        <div>
            <div id="picture" className="picture-box">
                <img width="400px" src="sunshine.jpg" alt="random" />
            </div>
            <p id="zen-quote">
                Zen Quote placeholder (public API)
            </p>
            <h1>Welcome to Scatter Sunshine</h1>
            <p id="instruction">
                Login to a pre-existing account or register a new account to scatter your sunshine.
            </p>
        </div>

        <form method="get" action="post">
            <div className="input-group mb-3">
                <input className="form-control" type="text" placeholder="username" />
            </div>
            <div className="input-group mb-3">
                <input className="form-control" type="password" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn">Register</button>
        </form>
    </main>
  );
}