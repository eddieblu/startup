import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    function getUsers() {
        let stored = localStorage.getItem('users');
        if (!stored) {
            // If no "users" key, means no users are stored --> create an empty array
            return [];
        }
        return JSON.parse(stored);
    }

    function saveUsers(usersArray) {
        localStorage.setItem('users', JSON.stringify(usersArray));
    }

    async function loginUser() {
        const users = getUsers();

        const foundUser = users.find((u) => u.username === userName);
        if (!foundUser) {
            setDisplayError('Invalid username or password');
            return;
        }

        if (foundUser.password !== password) {
            setDisplayError('Invalid username or password');
            return;
        }

        localStorage.setItem('userName', userName);

        props.onLogin(userName);
    }

    async function createUser() {
        const users = getUsers();

        const existingUser = users.find((u) => u.username === userName);
        if (existingUser) {
            setDisplayError('Username already exists. Please pick a new one.');
            return;
        }

        const newUser = {
            username: userName,
            password: password,
        };
        users.push(newUser);

        saveUsers(users);

        localStorage.setItem('userName', userName);

        props.onLogin(userName);
    }

    return (
        <>
            <div>
                <p id="instruction">
                    Login to a pre-existing account or register a new account.
                </p>
                <div className='input-group mb-3'>
                    <input
                        className='form-control'
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='username'
                    />
                </div>
                <div className='input-group mb-3'>
                    <input
                        className='form-control'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='password'
                    />
                </div>
                <Button
                    variant='primary'
                    onClick={() => loginUser()}
                    disabled={!userName || !password}
                >
                    Login
                </Button>
                <Button
                    variant='secondary'
                    onClick={() => createUser()}
                    disabled={!userName || !password}
                >
                    Register
                </Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}