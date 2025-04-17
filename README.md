# Scatter Sunshine: A Community for Daily Positivity

[My Notes](notes.md)

Scatter Sunshine is a daily reflection platform inspired by the beloved hymn “There Is Sunshine in My Soul Today,” encouraging short, uplifting posts in a warm, faith-centered atmosphere. Each new post unlocks a real-time community feed with a sun icon to track your streak. Entries automatically expire at the day’s end for a fresh start every morning. 


## 🚀 Specification Deliverable

For this deliverable, I did the following:

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Scatter Sunshine is an innovative twist on daily positivity, blending spiritual well-being into an optimistic social network. One post each day unlocks a feed of cheerful entries with a sunny streak-driven consistency. Whether you’re looking to cultivate an empowering routine of looking on the bright side or find uplifting support from a like-minded community, Scatter Sunshine is here to guide you toward a brighter life—one day at a time.


### Design
![Design image](positivityMockUI.jpg)


### Key features

- Secure login over HTTPS
- Daily 150-character positivity posts
- Sun icon for streak tracking
- Automatic expiry of daily entries

  
### Technologies

I am going to use the required technologies in the following ways:

- **HTML** - Three different views: login/register controls, positivity posting, and positivity feed.
- **CSS** - Complementary colour scheme and responsive design for different screen sizes.
- **JavaScript** – Handles user interactions (making posts). Updates the UI in real-time through state changes.
- **React** - Single page application with routing between views and reactive user controls. 
- **Web Services** - Backend service with endpoints for authentication, and submitting and retrieving posts. Third party call to get Zen quotes.
- **Authentication** – Register and login users. Users must be authenticated to post, view posts or react.
- **Database** - Stores authentication and post data. Automatically removes posts at midnight MST. 
- **WebSocket** - Broadcasts new posts.
  

## 🚀 AWS deliverable

For this deliverable, I did the following:

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://edwardscs.click).

## 🚀 HTML deliverable

For this deliverable I did the following: 

- [x] **HTML pages** - Three different pages. One for each view. `index.html` (Login/Register), `post.html`, and `feed.html`.
- [x] **Proper HTML element usage** - I researched for relevant elements that I could use. I used header, footer, main, nav, a, input, button, form, textarea, i, and img.
- [x] **Links** - Link in header called "Home" leads to login/register page. The login page automatically links to the post page and the post page automatically links to the feed page. 
- [x] **Text** - Each view has text instructions about the page. User name is displayed on post and feed page. 
- [x] **3rd party API placeholder** - Login/Register page has a place to display a ZEN quote.
- [x] **Images** - Image is displayed on the Login page.
- [x] **Login placeholder** - Placeholder for auth on the login page.
- [x] **DB data placeholder** - Gratitude posts displayed on feed page showing content stored in database.  
- [x] **WebSocket placeholder** - The feed page has placeholders for posts that will update in real-time. 

## 🚀 CSS deliverable

For this deliverable I did the following: 

- [x] **Header, footer, and main content body** - Each component is styled on all pages.
- [x] **Navigation elements** - I dropped the underline and changed the colour for which page is active.
- [x] **Responsive to window resizing** - My app looks great on almost all window sizes and devices.
- [x] **Application elements** - I used good contrast and whitespace.
- [x] **Application text content** - I used consistent font and sizes.
- [x] **Application images** - I styled an image on the Login/Register page. 

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following:

- [x] **Bundled using Vite** - React .jsx code is bundled into .js code in the dist directory using Vite.
- [x] **Components** - Login, Feed, and Post are all reactive components in the App component.
- [x] **Router** - Routing between login, feed and post components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following:

- [x] **All functionality implemented or mocked out** - I implemented all the functionality of logging in/registering, making a post, and viewing the feed. You can make a post and update it, and your streak increases automatically when you post. The localStorage (mocked database) holds post content and streak counts. Posts are automatically generated and loaded onto the screen to mock the websockets. The 3rd party call for a Zen Quote (see login page) is also mocked out. 
- [x] **Hooks** - I used useState and useEffect on the feed and post views for the streak counter, logged in user's post and feed posts.

## 🚀 Service deliverable

For this deliverable I did the following:

- [x] **Node.js/Express HTTP service** - Installed Express with NPM. Default port on 4000.js`
- [x] **Static middleware for frontend** - Simple endpoints in service/index
- [x] **Calls to third party endpoints** - Login/Register page calls [quote.cs260.click](https://quote.cs260.click) and renders the resulting JSON with React. I had a different API that I wanted to use but I had issues with it being unsecure. This was the previous API that did not work: [api.quotable.io](https://api.quotable.io/random)
- [x] **Backend service endpoints** - Simple endpoints in service/index for auth, posting and viewing posts
- [x] **Frontend calls service endpoints** - Fully support authentication and restrict access to website

## 🚀 DB/Login deliverable

For this deliverable I did the following:

- [x] **User registration** - Users can be registered.
- [x] **User login and logout** - Once registered, users can login and logout.
- [x] **Stores data in MongoDB** - Users and posts are stored in MongoDB from `service/database.js`.
- [x] **Stores credentials in MongoDB** - User accounts and auth information stored in MongoDB from `service/database.js`.
- [x] **Restricts functionality based on authentication** - User cannot perform any functionality without authentication.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - done!
- [x] **Frontend makes WebSocket connection** - done!
- [x] **Data sent over WebSocket connection** - done!
- [x] **WebSocket data displayed** - done!
- [x] **Application is fully functional** - Users' new posts, heart reacts, and post updates are all communicated usign WebSocket connections :)
