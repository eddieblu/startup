# CS 260 Notes

[My startup](https://simon.cs260.click)




## To Be Resolved
1. Do I need to include a <mark>Deployment Instructions section?</mark>
2. How can I configure the startup link from my root [Web Programming 260](https://edwardscs.click/) page to lead to my own [startup](https://startup.edwardscs.click/)?




## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [W3 Schools - HTML Element Tags Reference](https://www.w3schools.com/tags/)
- [Change VS Code Workspace Themes](https://medium.com/@juris.savos/setting-a-per-project-colour-scheme-in-vscode-89cc5836b1de)
- [Font Awesome Icons](https://fontawesome.com/icons/)





## Working in the Production Environment Server

**How to shell into server:**
1. Use the ssh console program to shell into your production environment server.

```
ssh -i <yourpemkey> ubuntu@<yourdomain>
```

**How to open the Caddy file**

```
cd ~
vi Caddyfile
```

**How to save the Caddy file**
1. Press Esc, then type :wq to save and exit.




## Deploy Files
Template command to deploy -- <mark>RUN FROM GIT BASH</mark>
```
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup
```

**What does this command do?**

The command ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup is executing a shell script named deployFiles.sh with three command-line options (-k, -h, and -s) and their respective arguments. Here's what each part likely represents:

./deployFiles.sh:
  * This runs the script named deployFiles.sh located in the current directory (./).
  * The script is likely responsible for deploying files to a server or environment.

-k <yourpemkey>:
 * The -k option is likely used to specify the path to a private key file (e.g., a .pem file), which is commonly used for authentication when connecting to a remote server via SSH.
 * <yourpemkey> should be replaced with the path to the private key file.

-h <yourdomain>:
 * The -h option is likely used to specify the hostname or domain name of the remote server where the deployment is happening.
 * <yourdomain> should be replaced with the actual domain name or IP address of the server.

-s startup:
 * The -s option might specify a mode, operation, or configuration related to the script. In this case, startup is likely a specific mode or set of instructions (e.g., running startup-related commands or preparing the server environment for deployment).


## VS CODE

**Live Server**

* Auto reload does not work without < head > and < body >





## AWS Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## HTML Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
