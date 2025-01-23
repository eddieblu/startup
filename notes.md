# CS 260 Notes

[My startup](https://simon.cs260.click)


## To Be Resolved
1. Do I need to include a <mark>Deployment Instructions section?</mark>

## Working in the Production Environment Server
**How to shell into server:**
1. Use the ssh console program to shell into your production environment server.

```
ssh -i C:\Users\betha\byu\keys\cs260_keypair.pem ubuntu@edwardscs.click
```

**How to open the Caddy file**

```
cd ~
vi Caddyfile
```

**How to save the Caddy file**
1. Press Esc, then type :wq to save and exit.

## Deploy Files
Template
```
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup
```
**What does this command do?**
The command ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup is executing a shell script named deployFiles.sh with three command-line options (-k, -h, and -s) and their respective arguments. Here's what each part likely represents:

1. ./deployFiles.sh:
  * This runs the script named deployFiles.sh located in the current directory (./).
  * The script is likely responsible for deploying files to a server or environment.
2. -k <yourpemkey>:

The -k option is likely used to specify the path to a private key file (e.g., a .pem file), which is commonly used for authentication when connecting to a remote server via SSH.
<yourpemkey> should be replaced with the path to the private key file.
-h <yourdomain>:

The -h option is likely used to specify the hostname or domain name of the remote server where the deployment is happening.
<yourdomain> should be replaced with the actual domain name or IP address of the server.
-s startup:

The -s option might specify a mode, operation, or configuration related to the script. In this case, startup is likely a specific mode or set of instructions (e.g., running startup-related commands or preparing the server environment for deployment).


## Public API Notes
How It Works
Enable “Requires Username”

In Auth0 Dashboard > Connections > Database, create or edit a Database Connection.
Check Requires Username so that both email and username are requested at sign-up.
Login Behavior

Username-Only Login: Users enter their username and password.
Email-Only Login: They enter their email and password.
Username or Email Login: You can allow both by customizing your Lock widget or Universal Login to accept either value in the same input.
Hosted Login Page / Lock Widget

If you’re using Auth0’s Lock or Universal Login, you may need to enable an option like allowLoginWithEmail and allowLoginWithUsername.
This ensures the form displays fields for both username and email at registration, and recognizes either one at login (if desired).
Password Recovery

Auth0 still relies on email to send password reset links.
Even if you enable usernames, users need a valid email for recovery flows.
Rules & Customization

If you want additional logic (e.g., checking that usernames aren’t offensive), you can write a Rule in Auth0.
You can also decide if you want to require email verification before the user can post.

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [W3 Schools - HTML Element Tags Reference](https://www.w3schools.com/tags/)

## AWS Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## HTML Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
