import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
    const [quote, setQuote] = React.useState('Loading...');
    const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

    React.useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.content);
                setQuoteAuthor(data.author);
            })
            .catch((error) => {
                console.error('Error fetching quote:', error);
                // Optionally set fallback quote if fetch fails
                setQuote('Oops! Something went wrong.');
                setQuoteAuthor('Unknown');
            });
    }, []);

    return (
        <main className='container-fluid text-center'>
            <div id="picture">
                <img width="400px" src="sunshine.jpg" alt="random" />
            </div>
            <div>
                {authState !== AuthState.Unknown && <h1>Welcome to Scatter Sunshine</h1>}
                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                )}
            </div>
            <div id="zen-quote">
                <p id="quote">{quote}</p>
                <p id="quote-author">{quoteAuthor}</p>
            </div>
        </main>
    );
}