# CS 260 Notes

[My startup](https://simon.cs260.click)




## To Be Resolved
1. Do I need to include a <mark>Deployment Instructions section?</mark>
2. How can I configure the startup link from my root [Web Programming 260](https://edwardscs.click/) page to lead to my own [startup](https://startup.edwardscs.click/)?
3. I want to deepen my implementation. Currently, the app is FINE but I'd like to implement 3 more things: heart reacts, the posts expiring and deleting at midnight MST, and the streak resetting if you didn't post the day before. None of these are necessary for full points (I think) but I'd love to figure out how to do them. Not a project for today, the day being 24 Feb 2025.
4. user cannot register account w username that already exists




## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)
- [W3 Schools - HTML Element Tags Reference](https://www.w3schools.com/tags/)
- [Change VS Code Workspace Themes](https://medium.com/@juris.savos/setting-a-per-project-colour-scheme-in-vscode-89cc5836b1de)
- [Font Awesome Icons](https://fontawesome.com/icons/)
- [Steps to clone to dev environment](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [React Hooks](https://react.dev/reference/react/hooks)





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


## VS CODE Notes

**Live Server**

* Auto reload does not work without < head > and < body >

**Run Commit and Sync in one click**

In VS Code, you can combine the Commit and Sync actions into a single step by enabling the setting:

Enable "Commit and Sync" in VS Code
1. Open VS Code.
2. Go to File > Preferences > Settings (or press Ctrl + ,).
3. Search for: 
```
git.postCommitCommand
```
4. Change the setting to sync:
  - Default: none (Only commits)
  - Change to: sync (Commits and syncs automatically)



## JavaScript Notes

**Array functions**

The Array object has several interesting static functions associated with it. Here are some of the interesting ones.

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => i < 1)`          |


## React Notes

You can pass around objects between classes in .jsx files using props or another variable name and access the whole object if you need it all, or you can pass in specific items of the object. I will rewrite this later when I understand it at a deeper level, but I want to keep note of it for now :)

## Public API Notes

I am using the free version of Zen Quotes API. They put restrictions on what I can use. One of them is rather common, it's to do with CORS (Cross-Origin Resource Sharing) and means that I cannot call the API unless the server includes an `Access-Control-Allow-Origin` response header. 

There are a couple of fixes / work arounds. The most common, and the one I will attempt to use, is to have a server-side proxy. Instead of calling the ZenQuotes API directly from the browser, I'll make a request from my server (which is not subject to the browser’s same-origin policy) and then return the response to the frontend.

```js
// On your server (Node example):
app.get('/api/myZenQuote', async (req, res) => {
  const response = await fetch('https://zenquotes.io/api/random');
  const data = await response.json();
  res.json(data);
});

// In your client code:
fetch('/api/myZenQuote')
  .then((r) => r.json())
  .then((data) => {
    // use data
  });

```
