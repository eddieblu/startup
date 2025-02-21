import React from 'react';
import './login.css';

export function Login() {
    const [quote, setQuote] = React.useState('Loading...');
    const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

    React.useEffect(() => {
        setQuote('“Treat everyone with politeness and kindness, not because they are nice, but because you are.”');
        setQuoteAuthor('Roy T. Bennett');
    }, []);



    return (
        <main className="body container-fluid text-center">
            <div>
                <div id="picture">
                    <img width="400px" src="sunshine.jpg" alt="random" />
                </div>
                <h1>Welcome to Scatter Sunshine</h1>
            </div>

            <div>
                <p id="instruction">
                    Login to a pre-existing account or register a new account.
                </p>
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
            </div>
            <div id="zen-quote">
                <p id="quote">{quote}</p>
                <p id="quote-author">{quoteAuthor}</p>
            </div>
        </main>
    );
}