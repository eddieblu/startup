# CS 260 Notes

[My startup](https://simon.cs260.click)


> [!NOTE]
> (copied from startup so I don't forget) This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.


## To Be Resolved
1. Do I need to include a <mark>Deployment Instructions section?</mark>

## Working in CMD Notes
How to shell into a production environment server:
- Use the ssh console program to shell into your production environment server.
➜  ssh -i [key pair file] ubuntu@[yourdomainnamehere]
for example,
➜  ssh -i ~/keys/production.pem ubuntu@myfunkychickens.click




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

## AWS Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## HTML Notes

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
